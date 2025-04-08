const Home = () => {
  return (
    <>
      <div className="company">
        <div className="company__laptop"></div>
        <div className="company__elem"></div>
        <i className="company__icon company__icon--arrow bounceInDown animated"></i>
        <i className="company__icon company__icon--btn bounceInDown animated"></i>
        <i className="company__icon company__icon--graph bounceInDown animated"></i>
        <i className="company__icon company__icon--time bounceInDown animated"></i>
        <i className="company__icon company__icon--circle bounceInDown animated"></i>
      </div>

      <section className="about about--company">
        <div className="container">
          <div className="about__desc">
            <div className="about__desc-wrap">
              <h2 className="title-h2">TalentQuest</h2>
              <span className="about__caption">
                Automatic interview service
              </span>
            </div>
            <a
              className="btn-a"
              asp-area=""
              asp-controller="Interview"
              asp-action="FindExam"
            >
              More information
            </a>
          </div>
        </div>
      </section>

      <section className="overview">
        <div className="container">
          <div className="overview__outer">
            <div className="overview__itm">
              <div className="overview__desc">
                <h2 className="title-h2">Overview</h2>
                <h3 className="title-h3">Great technical tests</h3>
                <h3 className="title-h3">Expert review for results</h3>
                <h3 className="title-h3">Statistics and history</h3>
                <h3 className="title-h3 overview__platforms">
                  We work on any platform !
                </h3>

                <div className="platform">
                  <i className="platform__icon">
                    <img className="platform__img" src="/images/ic-web.png" />
                  </i>
                  <i className="platform__icon">
                    <img
                      className="platform__img"
                      src="/images/ic-android.png"
                    />
                  </i>
                  <i className="platform__icon">
                    <img className="platform__img" src="/images/ic-apple.png" />
                  </i>
                  <i className="platform__icon">
                    <img className="platform__img" src="/images/ic-api.png" />
                  </i>
                </div>
              </div>
            </div>
            <div className="overview__itm overview__itm--img">
              <img className="overview__img" src="/images/bg-overview.png" />
            </div>
          </div>
        </div>
      </section>

      <section className="tools">
        <div className="container">
          <div className="tools__outer tools__outer--left">
            <div className="tools__itm">
              <span className="tools__ttl">iOS Development</span>
              <p className="tools__text">
                We test modern programming languages such as Swift and
                Objective-C and proven technologies and approaches that allow to
                easily extend and scale our products
              </p>
            </div>
            <div className="tools__itm">
              <span className="tools__ttl">UI/UX Design</span>
              <p className="tools__text">
                We have tests for prototyping, branding, UI and UX design for
                web and mobile products. Our approach is simple: we focus on how
                actual people will use our products
              </p>
            </div>
            <div className="tools__itm">
              <span className="tools__ttl">Project Management</span>
              <p className="tools__text">
                We can test dedicated project managers ensure that all your
                expectations and requirements are met.
              </p>
            </div>
          </div>
          <img className="tools__img" src="/images/bg-tools.png" />
          <div className="tools__outer tools__outer--right">
            <div className="tools__itm">
              <span className="tools__ttl">Android Development</span>
              <p className="tools__text">
                We test Android developers in Java, Kotlin and Xamarin.
              </p>
            </div>
            <div className="tools__itm">
              <span className="tools__ttl">Web Development</span>
              <p className="tools__text">
                We provide both frontend and backend development tests. Our web
                development test team specializes in Ruby on Rails, JavaScript,
                PHP, AngularJS, React, Node.js, ASP.NET and Elixir.
              </p>
            </div>
            <div className="tools__itm">
              <span className="tools__ttl">Quality Assurance</span>
              <p className="tools__text">
                Our quality control team verifies that developers meets business
                objectives, and ensures that test results is realy greate
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="process">
        <div className="container">
          <div className="process__desc">
            <h2 className="title-h2">How it Works</h2>
            <h3 className="title-h3">
              Candidates pass pre-prepared technical tests
            </h3>
            <h3 className="title-h3">
              Employers get scores, ratings and reviews for any required
              specialists
            </h3>
            <h3 className="title-h3">
              According to the review employer can connect with the best
              candidates
            </h3>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
