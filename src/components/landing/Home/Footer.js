import React, { useEffect, useState } from "react";

const Footer = () => {
  const [scrollBtn, setScrollBtn] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, [])


  const handleScroll = () => {
    if (window.scrollY > 70) {
      setScrollBtn(true)
    } else if (window.scrollY < 70) {
      setScrollBtn(false)
    }
  }

const  scrollTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div>
      <footer className="site-footer"> 
        <div className="site-footer__bottom">
          <div className="container">
            <div className="inner-container text-center">
              <p className="site-footer__copy" style={{fontWeight:'500'}}> 
              Built with not just love but, hard work, last minute changes, lots of brainstorming, and teamwork!
                <a href="#none"> 😍</a>
              </p>
            </div>
          </div>
        </div>
      </footer> 
      <div
        onClick={ scrollTop}
        onKeyDown={scrollTop}
        role="button"
        tabIndex="0"
        className="scroll-to-target scroll-to-top"
        style={{ display:  scrollBtn ? "block" : "none" }}
      >
        <i className="fa fa-angle-up"></i>
      </div>
    </div>
  );
}

export default Footer;
