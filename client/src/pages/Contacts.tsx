const Contact = () => {
  return (
    <>
      <div className="content__fixed">
        <section className="vh-50 vw-50">
          <div className="container-fluid h-custom">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-md-9 col-lg-6 col-xl-5">
                <div className="message__top"></div>
              </div>
              <div
                className="col-md-8 col-lg-6 col-xl-4"
                style={{ marginLeft: "4%" }}
              >
                <h2 className="title-h2">Got a question in mind?</h2>
                <h3 className="title-h3">Please let us know:</h3>
                <form className="form js-validForm">
                  <div className="form__outer">
                    <div className="form__itm form__itm--name">
                      <input
                        className="form__inp js-validRequired"
                        placeholder="Your name"
                        type="text"
                      />
                      <span className="error error-req">Required to fill</span>
                    </div>
                    <div className="form__itm form__itm--email">
                      <input
                        className="form__inp js-validRequired js-noSpaces js-validEmail"
                        placeholder="Your email address"
                        type="email"
                      />
                      <span className="error error-req">Required to fill</span>
                      <span className="error error-email">Invalid email</span>
                    </div>
                  </div>
                  <div className="form__outer">
                    <div className="form__itm form__itm--phone">
                      <input
                        className="form__inp js-noSpaces"
                        placeholder="Phone number"
                        type="text"
                      />
                    </div>
                    <div className="form__itm form__itm--budget">
                      <input
                        className="form__inp js-noSpaces"
                        placeholder="Skype (optional)"
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="form__outer">
                    <div className="form__itm form__itm--full-width">
                      <textarea
                        className="form__inp form__textarea"
                        placeholder="Message or question"
                      ></textarea>
                    </div>
                  </div>
                  <div className="form--center">
                    <button className="btn-b js-submitBtn" type="button">
                      <span>Send message</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        <section className="contact mt-4">
          <div className="contact__wrap">
            <div className="container no-width">
              <h2 className="title-h2">More Contacts</h2>
              <div className="contact__outer">
                <div className="contact__itm">
                  <div className="connection connection--contacts">
                    <div className="connection__outer">
                      <div className="connection__top">
                        <img
                          className="connection__icon connection__icon--campaign"
                          src="/images/contact-category.png"
                        />
                        <span className="connection__ttl">
                          Project Inquiries
                        </span>
                        <p className="connection__text mb-2">
                          Got an app idea? Tell us about it!
                        </p>
                        <a
                          className="connection__link"
                          href="mailto:info@silvertouch.com"
                        >
                          info@silvertouch.com
                        </a>
                      </div>
                      <div className="connection__bottom">
                        <a
                          className="btn-b btn-b--small"
                          href="mailto:info@silvertouch.com"
                        >
                          <span>Send message</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="contact__itm">
                  <div className="connection connection--contacts">
                    <div className="connection__outer">
                      <div className="connection__top">
                        <img
                          className="connection__icon connection__icon--campaign"
                          src="/images/contact-category.png"
                        />
                        <span className="connection__ttl">Career</span>
                        <p className="connection__text mb-2">
                          We’re looking for talented people!
                        </p>
                        <a
                          className="connection__link"
                          href="mailto:hr@silvertouch.com"
                        >
                          hr@silvertouch.com
                        </a>
                      </div>
                      <div className="connection__bottom">
                        <a
                          className="btn-b btn-b--small"
                          href="mailto:hr@silvertouch.com"
                        >
                          <span>Send message</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="contact__itm">
                  <div className="connection connection--contacts">
                    <div className="connection__outer">
                      <div className="connection__top">
                        <img
                          className="connection__icon connection__icon--campaign"
                          src="/images/contact-category.png"
                        />
                        <span className="connection__ttl">Partnership</span>
                        <p className="connection__text mb-2">
                          Want to become a partner?
                        </p>
                        <a
                          className="connection__link"
                          href="mailto:sales@silvertouch.com"
                        >
                          sales@silvertouch.com
                        </a>
                      </div>
                      <div className="connection__bottom">
                        <a
                          className="btn-b btn-b--small"
                          href="mailto:sales@silvertouch.com"
                        >
                          <span>Send message</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="team">
          <div className="container">
            <div className="team__wrap">
              <h2 className="title-h2">Join Our Team</h2>
              <h3 className="title-h3">
                Looking forward to joining us? We're glad to see you among our
                team members!
              </h3>
            </div>
            <div className="team__outer">
              <div className="team__itm">
                <div className="connection">
                  <div className="connection__outer">
                    <div className="connection__top">
                      <img
                        className="map__img"
                        src="/images/car-developers.png"
                      />
                    </div>
                    <div className="connection__bottom connection--center">
                      <span className="connection__info">Developers</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="team__itm team__itm--second">
                <div className="connection">
                  <div className="connection__outer">
                    <div className="connection__top">
                      <img className="map__img" src="/images/car-testers.png" />
                    </div>
                    <div className="connection__bottom connection--center">
                      <span className="connection__info">Testers</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="team__itm team__itm--last">
                <div className="connection">
                  <div className="connection__outer">
                    <div className="connection__top">
                      <img className="map__img" src="/images/car-sales.png" />
                    </div>
                    <div className="connection__bottom connection--center">
                      <span className="connection__info">Sales</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="work">
          <div className="container">
            <div className="work__wrap--center">
              <h2 className="title-h2">Our Values</h2>
              <h3 className="title-h3">
                TalentQuest is a sum of great technology, innovative culture,
                and smart people. Our values are what we respect and care about.
              </h3>
            </div>
            <div className="work__outer work__outer--value">
              <div className="work__itm">
                <div className="work__preview">
                  <div className="work__preview-row">
                    <div className="work__preview-col">
                      <i className="work__icon">
                        <img className="work__img" src="/images/ic-work.png" />
                      </i>
                    </div>
                    <div className="work__preview-col">
                      <span className="work__ttl">Excellence at work</span>
                      <p className="work__text">
                        {" "}
                        The will to win, the desire to succeed, and the urge to
                        reach our full potential can all be boiled down to one
                        word: excellence. Commitment to excellence at every
                        stage of app development, from planning to delivery, is
                        the key that unlocks value.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="work__itm">
                <div className="work__preview">
                  <div className="work__preview-row">
                    <div className="work__preview-col">
                      <i className="work__icon">
                        <img
                          className="work__img"
                          src="/images/ic-process.png"
                        />
                      </i>
                    </div>
                    <div className="work__preview-col">
                      <span className="work__ttl">People over processes</span>
                      <p className="work__text">
                        The most impressive feats are accomplished by groups of
                        people, not individuals. We are team players and we hire
                        people with a similar outlook, because the success of
                        our team is integral to our own success.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="work__itm">
                <div className="work__preview">
                  <div className="work__preview-row">
                    <div className="work__preview-col">
                      <i className="work__icon">
                        <img
                          className="work__img"
                          src="/images/ic-knowleage.png"
                        />
                      </i>
                    </div>
                    <div className="work__preview-col">
                      <span className="work__ttl">Knowledge sharing</span>
                      <p className="work__text">
                        Knowledge is power and the way to get power is by
                        sharing knowledge. By teaching others, we teach
                        ourselves. Spreading knowledge both within our company
                        and to the world at large is the smart way to do
                        business.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="work__itm">
                <div className="work__preview">
                  <div className="work__preview-row">
                    <div className="work__preview-col">
                      <i className="work__icon">
                        <img
                          className="work__img"
                          src="/images/ic-relationships.png"
                        />
                      </i>
                    </div>
                    <div className="work__preview-col">
                      <span className="work__ttl">Strong relationships</span>
                      <p className="work__text">
                        One of the key elements in our relationships with
                        clients is the ability to trust and be trusted.Trust is
                        earned by being honest and transparent, doing our work
                        consistently, and delivering great results.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="development separator"></div>

        <section className="map">
          <div className="container">
            <h2 className="title-h2">Our Legal Address</h2>

            <section className="map">
              <iframe
                src="https://www.google.com/maps/d/embed?mid=14ylGH49U-1Uvyr7dPqJMPmQ0HnvD0ic&ehbc=2E312F&noprof=1"
                width="1240"
                height="580"
              ></iframe>
            </section>
          </div>
        </section>
      </div>
    </>
  );
};

export default Contact;
