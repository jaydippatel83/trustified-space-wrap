import React, { Component } from 'react';
import CountUp from 'react-countup';
import VisibilitySensor from 'react-visibility-sensor';
import { data } from '../../utils/BadgeTemplates';

const Counter = () => {

    return (
        <section className="fact-one">
            <div className="container">

                <div className="block-title text-center">
                    <h2 className="block-title__title">
                        Issue cool <span>Badges</span>
                    </h2>
                    {/* <div className="cta-one__text"> */}
                        <p className="banner-one__text">
                            NFT badges are the best way to create a lifelong memory and
                            can also be issued for various purposes like NFT event tickets,
                            token gated community access, and as performance based rewards to
                            community members.
                        </p>
                    {/* </div> */}
                </div>

                <div className="row">

                    {
                        data.map((e, i) => {
                            if (e.id < 5) {
                                return (
                                    <div key={i} className="col-lg-3 col-md-6 col-sm-12 wow fadeInUp" data-wow-duration="1500ms">
                                        <div className="fact-one__single">
                                            <div className="fact-one__inner">
                                                <div className={`token2 m-2  m-auto`} style={{ backgroundColor: '#fff' }}>
                                                    <h1 id={`title${e.id}`} className={e.id > 5 ? "text-white" : ""} >{e.title}</h1>
                                                    <img id={`logo${e.id}`} src={`/images/${e.img}`} alt="Etherenal 2021 Token" />
                                                    <p id={`sub${e.id}`} className={e.id > 5 ? "text-white sub" : "sub"}  >{e.sub}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        })
                    }
                </div>
            </div>
        </section>
    )
}

export default Counter;