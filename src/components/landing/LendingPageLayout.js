import { Outlet } from "react-router-dom"; 
import NavOne from "./Home/NavOne";
import Footer from "./Home/Footer";

export default function LendingPageLayout() {
  return (
    <>
      <NavOne /> 
      <Outlet />
      <Footer />
    </>
  );
}
