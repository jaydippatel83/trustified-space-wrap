import React from "react";
import { Link } from "react-router-dom";


const data = [
  {
    title: "OnChain Reputation",
  },
  {
    title: "Degree Certificates",
  },
  {
    title: "Income Certificate",
  },
  {
    title: "Event Ticket Badges",
  },
  {
    title: "Reward Badges",
  },
  {
    title: "OnChain Carbon Credit",
  },
  {
    title: "Property Ownership"
  },
  {
    title: "KYC Documents"
  },
  {
    title: "Insurance Certificates"
  }
]

const Subscribe = () => {
  return (
    <section className="mailchimp-one pt-5">
      <div className="container">
        <div className="block-title text-center">
          <h2 className="block-title__title">
            Use Cases of <span>NFT </span> Badges & Certificates.
          </h2>
        </div>
        <div className="row">
          {
            data.map((e, i) => {
              return (
                <div key={i} className="col-lg-4 mt-2">
                  <div className="blog-card__content">
                    <ul className="list-unstyled blog-one__meta">
                      <li>
                        <h4 className="blog-one__title">{e.title}</h4>
                      </li>
                    </ul>

                  </div>
                </div>
              )
            })
          }
        </div>

        <div className="mc-form__response"></div>
      </div>
    </section >
  );
};
export default Subscribe;
