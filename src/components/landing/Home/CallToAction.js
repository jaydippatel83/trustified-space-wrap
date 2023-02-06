import React from "react";
import Testimonial from "./Testimonial";

const CallToAction = () => {
  return (
    <section className="cta-one pt-5 pb-5">
      <div className="block-title text-center mb-5">
        <h2 className="block-title__title">
          Why <span>Trustified?</span>
        </h2>
      </div>
      <img src="/assets/images/background/cta-one-bg.png" className="cta-one__bg" alt="alter text" />
      <div className="container">
      
        {/* <img src="/assets/images/mocs/cta-moc-1-1.png" className="cta-one__moc" alt="alter text" /> */}
        <div className="row justify-content-lg-end">
          <div className="col-lg-5">
          <Testimonial />
          </div>
          <div className="col-lg-7">
            <div className="cta-one__content"> 
 
              <div className="cta-one__text">
                <p>
                The traditional way of issuing Physical and Digital Certificates consists of the risk of permanent availability and document forgery issues.
                </p>
              </div>  
              <ul className="list-unstyled">
                <li style={{fontWeight:'bold', fontSize:'24px', color:'#000'}} >
                  Trustified provides:
                </li>
                <li>
                  <i className="fa fa-check"></i>Availability: All the data will be stored on decentralised storage of the Filecoin network.
                </li>
                <li>
                  <i className="fa fa-check"></i>Forgery Proof: Each certificate and badge will be an NFT on the FVM blockchain.
                </li>
                <li>
                  <i className="fa fa-check"></i>Ownership: Ensures true ownership of digital badges and certificates.
                </li>
              </ul>
              {/* <a href="#none" className="thm-btn">
                <span>Get Started</span>
              </a> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default CallToAction;
