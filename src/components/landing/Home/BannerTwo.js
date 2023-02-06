import React from "react"; 

const BannerTwo = () => {
  return (
    <section className="banner-two" id="banner">
      <span className="banner-two__shape-1"></span>
      <span className="banner-two__shape-2"></span>
      <span className="banner-two__shape-3"></span>
      <span className="banner-two__shape-4"></span>
      <div className="banner-two__moc">
        <img src="/assets/images/mocs/banner-moc-2-1.png" alt="alter text" />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-xl-6 col-lg-8">
            <div className="banner-two__content">
              <h3 className="banner-two__title">
                We Deliver the <br />
                <span>Software</span> you <br /> Need.
              </h3>
              <p className="banner-two__text">
                We are committed to providing our customers with <br />{" "}
                exceptional service while offering our employees the <br /> best
                training.
              </p>
              <a href="#none" className="banner-two__btn thm-btn ">
                <span>Get Started</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default BannerTwo;
