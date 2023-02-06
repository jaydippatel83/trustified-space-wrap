import React, { createContext, useEffect, useState } from "react";
import { collection, db, getDocs, query, where } from "../firebase";
import { ethers } from "ethers";

import {
  collectionContractEthAddress,
  collectionContractMumbai,
} from "../config";
import collectionContractAbi from "../abi/Collection.json";
import nftContractAbi from "../abi/NFT.json";
import { async } from "@firebase/util";

import { toast } from "react-toastify";

import { firebaseDataContext } from "./FirebaseDataContext";
import axios from "axios";

import * as PushAPI from "@pushprotocol/restapi";

export const Web3Context = createContext(undefined);

export const Web3ContextProvider = (props) => {
  const [address, setAddress] = useState();
  const [update, setUpdate] = useState(false);
  const [data, setData] = useState();
  const [userId, setUserId] = useState();
  const [claimLoading, setClaimLoading] = useState(false);
  const [claimer, setClaimer] = useState({});
  const [loadingMsg, setLoadingMsg] = useState(false);

  const [provider, setProvider] = useState();
  const [signer, setSigner] = useState();

  const [csvData, setCsvData] = useState([]);

  const firebasedatacontext = React.useContext(firebaseDataContext);
  const { addCollection, addCollectors, updateCollectors, getCollectors } =
    firebasedatacontext;

  useEffect(() => {
    getFirestoreData();
  }, [update]);

  useEffect(() => {
    const initialize = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      setProvider(provider);
      setSigner(signer);

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setAddress(accounts[0]);
    };
    initialize();
  }, []);

  const connectWallet = async () => {
    console.log("call");
    const { ethereum } = window;
    if (!ethereum) {
      alert("Please install the Metamask Extension!");
    }
    try {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setAddress(accounts[0]);
      window.localStorage.setItem("address", accounts[0]);
      setUpdate(!update);
    } catch (err) {
      if (err.code === 4902) {
        try {
          const accounts = await ethereum.request({
            method: "eth_requestAccounts",
          });
          setAddress(accounts[0]);
          window.localStorage.setItem("address", accounts[0]);
          setUpdate(!update);
        } catch (err) {
          alert(err.message);
        }
      }
    }
  };
  const disconnectWallet = () => {
    window.localStorage.removeItem("address");
    setUpdate(!update);
    window.location.reload();
  };
  const shortAddress = (addr) =>
    addr.length > 10 && addr.startsWith("0x")
      ? `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`
      : addr;

  const getFirestoreData = async () => {
    const add = window.localStorage.getItem("address");
    console.log(add);
    const q = query(collection(db, "UserProfile"), where("Address", "==", add));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((fire) => {
      setData(fire.data());
      setUserId(fire.id);
    });
  };

  function generateClaimToken(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz012345678910";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const createNFTCollecion = async (data, firebasedata) => {
    try {
      let transferable = firebasedata.transferable == "on" ? true : false;
      const collectionContract = new ethers.Contract(
        firebasedata.chain == "fevm"
          ? collectionContractEthAddress
          : collectionContractMumbai,
        collectionContractAbi.abi,
        signer
      );

      let createCollectionTransaction =
        await collectionContract.createCollection(
          data.tName,
          data.tSymbol,
          transferable
        ); // Create NFT collection.

      let tx = await createCollectionTransaction.wait();

      if (tx) {
        let event = await tx.events[0];

        var tokenContractAddress = event?.args[1];
        let transactionMint = await collectionContract.bulkMintERC721(
          tokenContractAddress,
          data.tokenUris
        ); // Bulk Mint NFT collection.

        let txm = await transactionMint.wait();

        if (txm) {
          firebasedata.contract = tokenContractAddress;
          firebasedata.userId = userId;
          await addCollection(firebasedata);

          let tokenIds = await collectionContract.getTokenIds(
            tokenContractAddress
          );

          var array = [];

          const tokenContract = new ethers.Contract(
            tokenContractAddress,
            nftContractAbi.abi,
            signer
          );
          // array[0] = ["Name", "ClaimUrl"];
          for (let i = 0; i < tokenIds.length; i++) {
            let obj = {};
            let claimToken = generateClaimToken(5);
            const tokenCID = await tokenContract.tokenURI(Number(tokenIds[i]));

            let d = await axios.get(
              `https://nftstorage.link/ipfs/${tokenCID}/metadata.json`
            );

            array.push([
              d.data.claimer,
              `http://localhost:3000/claim/${claimToken}`,
            ]);

            obj.token = claimToken;
            obj.tokenContract = tokenContractAddress;
            obj.tokenId = Number(tokenIds[i]);
            obj.claimerAddress = "";
            obj.ipfsurl = d.data.image;
            obj.chain = firebasedata.chain;

            await addCollectors(obj);
          } // Generating CSV file with unique link and storing data in firebase.
          setCsvData(array);

          //define the heading for each row of the data
          var csv = "Name,ClaimUrl\n";

          //merge the data with CSV
          array.forEach(function (row) {
            csv += row.join(",");
            csv += "\n";
          });

          var hiddenElement = document.createElement("a");
          hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(csv);
          hiddenElement.target = "_blank";

          //provide the name for the CSV file to be downloaded
          hiddenElement.download = `${firebasedata.title}.csv`;
          hiddenElement.click();

          toast.success("Successfully created NFT collection!!");
        }
      }
    } catch (err) {
      console.log(err);
      toast.error("Something want wrong!!", err);
    }
  };

  const claimCertificate = async (claimToken, claimerAddress) => {
    setClaimLoading(true);
    const q = query(
      collection(db, "Collectors"),
      where("claimToken", "==", claimToken)
    );

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (fire) => {
      try {
        console.log(fire.data());
        if (fire.data().claimerAddress == "") {
          const collectionContract = new ethers.Contract(
            fire.data().chain == "fevm"
              ? collectionContractEthAddress
              : collectionContractMumbai,
            collectionContractAbi.abi,
            signer
          );

          let transferTokenTransaction = await collectionContract.transferToken(
            claimerAddress,
            fire.data().tokenContract,
            fire.data().tokenId
          );

          let txt = await transferTokenTransaction.wait();

          if (txt) {
            setClaimer(fire.data());
            await updateCollectors({
              id: fire.id,
              claimerAddress: claimerAddress,
            });
            toast.success("Claimed Certificate Successfully!");
            setClaimLoading(false);
          }
        } else {
          toast.error("This certificate is already claimed!");
          setClaimLoading(false);
        }
      } catch (error) {
        toast.error("Something went wrong!");
        setClaimLoading(false);
        console.log(error);
      }
    });
  };

  const notifyHolders = async (nftContract, message) => {
    setLoadingMsg(true);
    let collectors = await getCollectors(nftContract);
    console.log(collectors);

    const PK = process.env.REACT_APP_PUSH_PRIVATE_KEY;

    const Pkey = `0x${PK}`;

    const signer = new ethers.Wallet(Pkey);

    try {
      console.log(PK);
      const apiResponse = await PushAPI.payloads.sendNotification({
        signer,
        type: 4, // target
        identityType: 2, // direct payload
        notification: {
          title: `Trustified`,
          body: `Trustified" - Truely Certified`,
        },
        payload: {
          title: `Trustified`,
          body: message,
          cta: "",
          img: "",
        },
        recipients: ["eip155:80001:0x0a4349A6b51c8454fcff20af639dA1FbEF8A2501"], // recipient address
        channel: "eip155:80001:0x54bFfe5482759f49e24601AbD4cF833AA94e3787", // your channel address
        env: "staging",
      });
      setLoadingMsg(false);
      // apiResponse?.status === 204, if sent successfully!
      console.log("API repsonse: ", apiResponse);
    } catch (err) {
      setLoadingMsg(false);
      console.log(err);
    }
  };

  return (
    <Web3Context.Provider
      value={{
        connectWallet,
        createNFTCollecion,
        shortAddress,
        disconnectWallet,
        claimCertificate,
        notifyHolders,
        claimLoading,
        setUpdate,
        csvData,
        address,
        update,
        data,
        claimer,
        userId,
        loadingMsg,
      }}
      {...props}
    >
      {props.children}
    </Web3Context.Provider>
  );
};