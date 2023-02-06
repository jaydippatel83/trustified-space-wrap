import React from "react";
import AccordionItem from "./AccordionItem"; 

const Faq = () => {
  return (
    <section className="faq-one">
      <img src="/assets/images/background/faq-one-bg.png" alt="alter text" className="faq-one__bg" />
      <div className="container">
        <div className="block-title text-center">
          <h2 className="block-title__title">
            Want to Ask <span>Something</span> <br /> From Us?
          </h2>
        </div>
        <div className="accrodion-grp faq-accrodion">
          <AccordionItem
            title="Pre and post launch mobile app marketing pitfalls to avoid"
            content="There are many variations of passages of available but
                    majority have alteration in some by inject humour or random
                    words. Lorem ipsum dolor sit amet, error insolens reprimique
                    no quo, ea pri verterem phaedr vel ea iisque aliquam."
            status={false}
          />
          <AccordionItem
            title="Boostup your application traffic is just a step away"
            content="There are many variations of passages of available but
                    majority have alteration in some by inject humour or random
                    words. Lorem ipsum dolor sit amet, error insolens reprimique
                    no quo, ea pri verterem phaedr vel ea iisque aliquam."
            status={true}
          />
          <AccordionItem
            title="How to update application new features"
            content="There are many variations of passages of available but
                    majority have alteration in some by inject humour or random
                    words. Lorem ipsum dolor sit amet, error insolens reprimique
                    no quo, ea pri verterem phaedr vel ea iisque aliquam."
            status={false}
          />
          <AccordionItem
            title="
            How to connect with the support to improve app experience
          "
            content="There are many variations of passages of available but
                    majority have alteration in some by inject humour or random
                    words. Lorem ipsum dolor sit amet, error insolens reprimique
                    no quo, ea pri verterem phaedr vel ea iisque aliquam."
            status={false}
          />
          <AccordionItem
            title="How to connect with the support to improve app experience"
            content="There are many variations of passages of available but
                    majority have alteration in some by inject humour or random
                    words. Lorem ipsum dolor sit amet, error insolens reprimique
                    no quo, ea pri verterem phaedr vel ea iisque aliquam."
            status={false}
          />
        </div>
      </div>
    </section>
  );
};
export default Faq;
