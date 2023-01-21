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
  padding: theme.spacing(3, 3, 0),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(5, 5, 0),
  },
})); 
export default function ClaimPageLayout() {
  return (
    <>
      <LendingHeader />
      <HeaderStyle>{/* <Logo /> */}</HeaderStyle>
      <Outlet />
      <Footer/>
    </>
  );
}
