import React from "react";

const Banner = () => {
  return (
    <section className="banner-one" id="banner">
      <span className="banner-one__shape-1"></span>
      <span className="banner-one__shape-2"></span>
      <span className="banner-one__shape-3"></span>
      <span className="banner-one__shape-4"></span>
      <div className="container">
        <div className="banner-one__moc">
          <img src="/images/banner.png" alt="alter text" /> 
        </div>
        <div className="row">
          <div className="col-xl-6 col-lg-8">
            <div className="banner-one__content">
              <h3 className="banner-one__title">
                Truly Certified on <br />
                <span>Blockchain</span>   <br />
              </h3>
              <p className="banner-one__text">
                Trustified is a platform to issue forgery proof digital certificates and badges on Blockchain. 
              </p>
               
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Banner;
