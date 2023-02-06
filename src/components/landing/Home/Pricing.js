import React, { Component, useState } from "react";
import { Templates } from "../../../Templates";

const Pricing = () => {
  

  return (
    <section className="pricing-one" id="pricing">
      <div className="container">
        <div className="block-title text-center">
          <h2 className="block-title__title">
            <span>Easy To Use</span>
          </h2>
          {/* <div className="cta-one__text"> */}
            <p className="banner-one__text">
            Easy to customise and use from a wide range of predesigned templates of Certificates and Badges.
            </p>
          {/* </div> */}
        </div>

        <div className="tabed-content">
          <div id="month">

            <div className="row pricing-one__price-row">
              {
                Templates.map((e,i ) => {
                  return (
                    <div
                      key={e.title}
                      className="col-lg-4 animated fadeInUp"
                      data-wow-duration="1500ms"
                    >
                      {
                       i < 3  && e.component
                      }
                    </div>
                  )
                })
              } 
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Pricing;
