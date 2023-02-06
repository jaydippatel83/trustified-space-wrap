import React from "react";

const Features = () => {
  return (
    <section className="service-one" id="features">
      <div className="container">
        <div className="block-title text-center">
          <h2 className="block-title__title"> 
             <span>Built for</span> <br />
          </h2>
        </div>
        <div className="row">
          <div
            className="col-lg-3 col-md-6 col-sm-12 wow fadeInUp"
            data-wow-duration="1500ms"
          >
            <div className="service-one__single text-center">
              <div className="service-one__inner">
                <i className="service-one__icon dimon-icon-laptop"></i>
                <h3>
                  <a href="#none">
                    Individuals
                  </a>
                </h3>
                <p>
                Any individual from course creator to influencer can issue NFT Certificates and badges to community members.
                </p>
                <a href="#none" className="service-one__link">
                  <i className="dimon-icon-right-arrow"></i>
                </a>
              </div>
            </div>
          </div>
          <div
            className="col-lg-3 col-md-6 col-sm-12 wow fadeInDown"
            data-wow-duration="1500ms"
          >
            <div className="service-one__single text-center">
              <div className="service-one__inner">
                <i className="service-one__icon dimon-icon-presentation"></i>
                <h3>
                  <a href="#none">
                   Organisations
                  </a>
                </h3>
                <p>
                Educational institutes and companies can issue degree certificates and performance reward badges to the members
                </p>
                <a href="#none" className="service-one__link">
                  <i className="dimon-icon-right-arrow"></i>
                </a>
              </div>
            </div>
          </div>
          <div
            className="col-lg-3 col-md-6 col-sm-12 wow fadeInUp"
            data-wow-duration="1500ms"
          >
            <div className="service-one__single text-center">
              <div className="service-one__inner">
                <i className="service-one__icon dimon-icon-target"></i>
                <h3>
                  <a href="#none">
                   DAOs
                  </a>
                </h3>
                <p>
                DAOs can issue role based membership badges/certificates to performance based reputation certificates
                </p>
                <a href="#none" className="service-one__link">
                  <i className="dimon-icon-right-arrow"></i>
                </a>
              </div>
            </div>
          </div>
          <div
            className="col-lg-3 col-md-6 col-sm-12 wow fadeInDown"
            data-wow-duration="1500ms"
          >
            <div className="service-one__single text-center">
              <div className="service-one__inner">
                <i className="service-one__icon dimon-icon-visualization"></i>
                <h3>
                  <a href="#none">
                  Developers
                  </a>
                </h3>
                <p>
                Customised token gated access opens up wide range of possibilities for developers to build on top of Trustified
                </p>
                <a href="#none" className="service-one__link">
                  <i className="dimon-icon-right-arrow"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Features;
