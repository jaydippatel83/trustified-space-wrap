import html2canvas from "html2canvas";
import React, { useState, createContext, useEffect } from "react";
import { NFTStorage, File } from "nft.storage";
import jsPDF from "jspdf";
import { Web3Context } from "./Web3Context";
export const BadgeContext = createContext(undefined);
export const BadgeContextProvider = (props) => {
  const [open, setOpen] = React.useState(false);
  const [uploadLogo, setLogo] = useState("");
  const [csvData, setCsvData] = React.useState([]);
  const [loading, setLoading] = useState(false);
  const web3Context = React.useContext(Web3Context);
  const { createNFTCollecion } = web3Context;
  const NFT_STORAGE_TOKEN = process.env.REACT_APP_NFT_STORAGE_TOKEN;
  const client = new NFTStorage({ token: NFT_STORAGE_TOKEN });
  const [labelInfo, setlabelInfo] = useState({
    formData: {
      title: "",
      description: "",
      template: "",
      name: "",
      chain: "fevm",
      badgeName: "",
      transferable: "off",
    },
  });
  const handleChangeLogo = (e) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setLogo(url);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const setFormdata = (prop) => (event) => {
    setlabelInfo({
      ...labelInfo,
      formData: { ...labelInfo.formData, [prop]: event.target.value },
    });
  };
  const createBadge = async () => {
    try {
      setLoading(true);
      const idd = `badgeToprint${labelInfo.formData.template}`;
      console.log(idd,"idd");
      const input = document.getElementById(idd);
      console.log(input,"input");
      var results = await Promise.all(
        csvData.map(async (data) => {
          var pdfBlob = await html2canvas(input).then(async (canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const img = new Image(); // create a new image element
            img.src = imgData; // set the source of the image to the data URL
            const imageData = await fetch(imgData).then((r) => r.blob()); //
            var pdf;
            if (canvas.width > canvas.height) {
              pdf = new jsPDF("l", "mm", [canvas.width, canvas.height]);
            } else {
              pdf = new jsPDF("p", "mm", [canvas.height, canvas.width]);
            }
            pdf.addImage(imgData, "JPEG", 10, 30, canvas.width, canvas.height);
            const pdfBlob = pdf.output("blob");
            return { imageData, pdfBlob };
          });
          const imageFile = new File(
            [pdfBlob.imageData],
            `${data.name.replace(/ +/g, "")}.png`,
            {
              type: "image/png",
            }
          );
          const pdfFile = new File(
            [pdfBlob.pdfBlob],
            `${data.name.replace(/ +/g, "")}.pdf`,
            {
              type: "application/pdf",
            }
          );
          const metadata = await client.store({
            name: labelInfo.formData.title,
            description: labelInfo.formData.description,
            image: imageFile,
            pdf: pdfFile,
            claimer: data.name,
          });
          return metadata.ipnft;
        })
      );
      if (results.length > 0) {
        await createNFTCollecion(
          {
            tokenUris: results,
          },
          labelInfo.formData,
          "badge"
        );
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <BadgeContext.Provider
      value={{
        labelInfo,
        setFormdata,
        handleClickOpen,
        handleClose,
        open,
        handleChangeLogo,
        uploadLogo,
        csvData,
        setCsvData,
        loading,
        createBadge,
      }}
      {...props}
    >
      {" "}
      {props.children}
    </BadgeContext.Provider>
  );
};
