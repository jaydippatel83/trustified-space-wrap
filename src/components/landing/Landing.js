import React from 'react'
import NavOne from "./Home/NavOne";
import Banner from "./Home/Banner";
import Features from "./Home/Features";
import Video from "./Home/Video";
import CallToAction from "./Home/CallToAction";
import CallToActionTwo from "./Home/CallToActionTwo";
import Pricing from "./Home/Pricing"; 
import Brands from "./Home/Brands";
import Testimonial from "./Home/Testimonial"; 
import Counter from "./Home/Counter";
import Screenshots from "./Home/Screenshots";
import Faq from "./Home/Faq";
import NewsHome from "./Home/NewsHome";
import Subscribe from "./Home/Subscribe";
import Footer from "./Home/Footer";


function Landing() {
  return (
    < div className="page-wrapper"> 
      <Banner />
      <CallToAction />
      <Features /> 
      <Pricing />  
      <Counter /> 
      <Subscribe /> 
    </div>
  )
}

export default Landing