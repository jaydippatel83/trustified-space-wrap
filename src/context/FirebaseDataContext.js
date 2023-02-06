import { getDoc } from "firebase/firestore";
import React, { useState, createContext, useEffect } from "react";

import {
  collection,
  addDoc,
  db,
  updateDoc,
  doc,
  query,
  where,
  getDocs,
} from "../firebase";

export const firebaseDataContext = createContext(undefined);

export const FirebaseDataContextProvider = (props) => {
  const [updated, setUpdated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [collections, setCollections] = useState([]);
  const [rowsIssuer, setRowsIssuer] = useState([]);
  const [rowsCollection, setRowsCollection] = useState([]);
  const [claim, setClaim] = useState([]);

  function createDataIssuer(Name, UserName, Address, Bio) {
    return { Name, UserName, Address, Bio };
  }
  function createDataCollection(id, name, description, issueDate, expireDate) {
    return {
      id,
      name,
      description,
      issueDate,
      expireDate,
    };
  }

  useEffect(() => {
    getIssuers();
    getNFTCollections();
  }, []);

  async function addCollection(data) {
    setLoading(true);
    if(data.type === "badge"){
      await addDoc(collection(db, "Collections"), {
        userId: data.userId,
        name: data.title,
        description: data.description,
        collectionContract: data.contract,
        chain: data.chain,
        issueDate: new Date(), 
        eventId: data.eventId,
        type: data.type,
      });
    } else{
      await addDoc(collection(db, "Collections"), {
        userId: data.userId,
        name: data.title,
        description: data.description,
        collectionContract: data.contract,
        chain: data.chain,
        issueDate: new Date(),
        expireDate: data.expireDate,
        eventId: data.eventId,
        type: data.type,
      });
    }
    
    setLoading(false);
    setUpdated(!updated);
  }

  
   
 

  async function addCollectors(data) { 
    console.log(data,"data");
    setLoading(true); 
    await addDoc(collection(db, "Collectors"), {
      claimToken: data.token,
      tokenContract: data.tokenContract,
      tokenId: data.tokenId,
      claimerAddress: data.claimerAddress,
      ipfsurl: data.ipfsurl,
      chain: data.chain,
      name: data.name,
      claimed: data.claimed,
      type: data.type, 
      transferable: data.transferable,
    });
    setLoading(false);
    setUpdated(!updated);
  }

  async function updateCollectors(data) {
    const collectorRef = doc(db, "Collectors", data.id);
    await updateDoc(collectorRef, {
      claimerAddress: data.claimerAddress,
      claimed: data.claimed,
    });
  }

  async function getCollections(userId) {
    try {
      const collections = query(
        collection(db, "Collections"),
        where("userId", "==", userId)
      );

      const collectionSnapshot = await getDocs(collections);

      const collectionList = collectionSnapshot.docs.map((doc) => doc.data());
      setCollections(collectionList);
    } catch (error) {
      console.log(error);
    }
  }

  async function getClaimer(collectionContract) {
    try {
      setLoading(true);
      const collectors = query(
        collection(db, "Collectors"),
        where("tokenContract", "==", collectionContract)
      );
      const collectorsSnapshot = await getDocs(collectors);
      const collectorsList = collectorsSnapshot.docs.map((doc) => doc.data());
      setClaim(collectorsList);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  // async function getClaimer(collectionContract) {
  //   try {
  //     const collectors = query(
  //       collection(db, "Collectors"),
  //       where("tokenContract", "==", collectionContract)
  //     );

  //     const collectorsSnapshot = await getDocs(collectors);

  //     const collectorsList = collectorsSnapshot.docs.map((doc) => doc.data());
  //     let collectorsArr = [];
  //     collectorsList.map((collector) => {
  //       if (collector.claimerAddress != "") {
  //         collectorsArr.push(`eip155:80001:${collector.claimerAddress}`);
  //       }
  //     });
  //     return collectorsArr;
  //   } catch (error) {
  //     setLoading(false);
  //     console.log(error);
  //   }
  // }

  async function getIssuers(id) {
    // const arry = [];
    // const q = query(collection(db, "Collectors"),where("collectionContract", "==", id));
    // const querySnapshot = await getDocs(q);
    // querySnapshot.forEach(async (fire) => {
    //   arry.push(
    //     createDataIssuer(
    //       fire.data().Name,
    //       fire.data().UserName,
    //       fire.data().Address,
    //       fire.data().Bio
    //     )
    //   );
    //   setRowsIssuer(arry);
    // });
  }

  async function getNFTCollections() {
    const arry = [];
    const add = window.localStorage.getItem("address");
    const q = query(collection(db, "UserProfile"), where("Address", "==", add));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (fire) => {
      const qr = query(
        collection(db, "Collections"),
        where("userId", "==", fire.id)
      );
      const snap = await getDocs(qr);
      snap.forEach((e) => {
        arry.push(
          createDataCollection(
            e.data().collectionContract,
            e.data().name,
            e.data().description,
            e.data().issueDate,
            e.data().expireDate
          )
        );
      });
      setRowsCollection(arry);
    });
  }

  return (
    <firebaseDataContext.Provider
      value={{
        addCollection,
        getCollections,
        addCollectors,
        updateCollectors,
        updated,
        loading,
        collections,
        rowsIssuer,
        rowsCollection,
        claim,
        getClaimer,
      }}
      {...props}
    >
      {props.children}
    </firebaseDataContext.Provider>
  );
};
