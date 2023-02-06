import React from "react"; 

const CallToActionTwo = () => {
  return (
    <section className="cta-two">
      <div className="container">
        <img src="/assets/images/mocs/cta-moc-2-1.png" className="cta-two__moc" alt="alter text" />
        <div className="row">
          <div className="col-lg-6">
            <div className="cta-two__content">
              <i className="cta-two__icon dimon-icon-data"></i>
              <div className="block-title text-left">
                <h2 className="block-title__title">
                  Interact with <span>Customers</span> <br /> on Single
                  Platform.
                </h2>
              </div>
              <div className="cta-two__text">
                <p>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur. Lorem Ipsum is simply
                  dummy text of the printing laborum perspiciatis unde.
                </p>
                <p>
                  Excepteur sint occaecat cupidatat non proident sunt in culpa
                  qui officia deserunt mollit lorem ipsum anim id est.
                </p>
              </div>
              <a href="#none" className="thm-btn">
                <span>Get Started</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default CallToActionTwo;
