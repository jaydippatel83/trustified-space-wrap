import { Outlet } from "react-router-dom"; 
import { styled } from "@mui/material/styles"; 
import LendingHeader from "./LendingHeader";
import Footer from "./Footer";
 
const HeaderStyle = styled("header")(({ theme }) => ({
  top: 0,
  left: 0,
  lineHeight: 0,
  width: "100%",
  position: "absolute", 
})); 

export default function LendingPageLayout() {
  return (
    <>
      <LendingHeader />
      <HeaderStyle>{/* <Logo /> */}</HeaderStyle>
      <Outlet />
      <Footer/>
    </>
  );
}
