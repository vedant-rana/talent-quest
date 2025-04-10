const Footer = () => {
  return (
    <footer
      className="footer"
      style={{ overflowX: "hidden", backgroundColor: "#30158e" }}
    >
      <div className="footer__outer text-white max-container container-fluid m-auto">
        <div className="footer__itm">
          <h4>Silver Touch Technologies</h4>
          <div
            className="footer__main mb-5"
            style={{ color: "#cc1997", marginLeft: "25px !important" }}
          >
            <i className="fa-solid fa-location-dot"></i>
            <h5 className="m-0">Ahmedabad, India</h5>
          </div>
        </div>
        <div className="footer__itm">
          <div className="footer__main">
            <i className="fa-regular fa-envelope"></i>
            <a
              href="mailto:your.info@silvertouch.com"
              className="text-white text__underline"
            >
              info@silvertouch.com
            </a>
          </div>
          <div className="footer__main">
            <i className="fa-solid fa-phone text-white"></i>
            <p className="mb-1">+91 79 4002 2774</p>
          </div>
          <div className="footer__main">
            <i className="fa-solid fa-map-pin"></i>
            <p className="mb-1">
              2nd Floor, Saffron Tower, Panchvati Cir,
              <br /> opp. Central Mall, Panchavati Society,
              <br /> Gulbai Tekra, Ahmedabad, Gujarat 380006
            </p>
          </div>
          <div className="footer__main mb-0">
            <a href="https://maps.app.goo.gl/UvC1uztg2SXaPUpf7" target="_blank">
              See On Map
            </a>
          </div>
        </div>
        <div className="footer__itm">
          <ul className="nav mb-3"></ul>

          <ul className="social">
            <li className="social__li">
              <a
                className="social__link"
                href="https://www.linkedin.com/company/silver-touch-technologies-ltd/about/"
                target="_blank"
              >
                <svg
                  className="social__icon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 112.2 112.2"
                >
                  <circle cx="56.1" cy="56.1" r="56.1"></circle>
                  <path
                    fill="#fff"
                    d="M36.53 46.62h-10.2v36.67h10.2V46.62zM31.43 35.42c-3.4 0-6.15 2.75-6.15 6.15s2.75 6.15 6.15 6.15 6.15-2.75 6.15-6.15S34.83 35.42 31.43 35.42zm16.18 11.2c-5.05 0-8.78 2.54-10.22 5.13v-4.41H27.23v36.67h10.2V57.44c0-1.55 0.11-3.11 0.56-4.23 1.24-3.11 4.06-6.33 8.78-6.33 6.19 0 8.66 4.77 8.66 11.74v23.66h10.2V56.3c0-12.3-6.78-18.04-15.77-18.04z"
                  ></path>
                </svg>
              </a>
            </li>
            <li className="social__li">
              <a className="social__link" href="#" target="_blank">
                <svg
                  className="social__icon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 112.2 112.2"
                >
                  <circle cx="56.1" cy="56.1" r="56.1"></circle>
                  <path
                    fill="#fff"
                    d="M53.98 80.7h4.4c0 0 1.33-0.15 2.01-0.88 0.63-0.67 0.61-1.93 0.61-1.93s-0.09-5.91 2.66-6.78c2.7-0.86 6.17 5.71 9.85 8.24 2.78 1.91 4.9 1.49 4.9 1.49l9.84-0.14c0 0 5.15-0.32 2.71-4.36 -0.2-0.33-1.42-2.99-7.31-8.46 -6.17-5.72-5.34-4.8 2.09-14.7 4.53-6.03 6.33-9.71 5.77-11.29 -0.54-1.5-3.87-1.1-3.87-1.1l-11.08 0.07c0 0-0.82-0.11-1.43 0.25 -0.59 0.36-0.98 1.19-0.98 1.19s-1.75 4.67-4.09 8.64c-4.93 8.38-6.9 8.82-7.71 8.3 -1.87-1.21-1.41-4.87-1.41-7.47 0-8.12 1.23-11.5-2.4-12.38 -1.2-0.29-2.09-0.48-5.17-0.51 -3.95-0.04-7.3 0.01-9.19 0.94 -1.26 0.62-2.23 1.99-1.64 2.07 0.73 0.1 2.39 0.45 3.27 1.64 1.14 1.54 1.1 5.01 1.1 5.01s0.65 9.55-1.52 10.74c-1.49 0.81-3.54-0.85-7.94-8.45 -2.25-3.89-3.95-8.19-3.95-8.19s-0.33-0.8-0.91-1.23c-0.71-0.52-1.7-0.69-1.7-0.69l-10.52 0.07c0 0-1.58 0.04-2.16 0.73 -0.52 0.61-0.04 1.88-0.04 1.88s8.24 19.28 17.57 28.99C44.26 81.29 53.98 80.7 53.98 80.7L53.98 80.7z"
                  ></path>
                </svg>
              </a>
            </li>
            <li className="social__li">
              <a
                className="social__link"
                href="https://www.instagram.com/silvertouchtechnologiesltd/?hl=en"
                target="_blank"
              >
                <svg
                  className="social__icon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 89.76 89.76"
                >
                  <path d="M58.26 23.88H31.5c-4.27 0-7.74 3.47-7.74 7.74v26.75c0 4.27 3.47 7.75 7.74 7.75h26.75c4.27 0 7.75-3.47 7.75-7.74V31.62C66 27.35 62.53 23.88 58.26 23.88zM44.88 58.91c-7.67 0-13.9-6.24-13.9-13.91 0-7.67 6.24-13.9 13.91-13.9 7.67 0 13.91 6.24 13.91 13.91C58.79 52.67 52.55 58.91 44.88 58.91zM59.23 33.97c-1.81 0-3.29-1.48-3.29-3.29 0-1.81 1.48-3.29 3.29-3.29 1.81 0 3.29 1.48 3.29 3.29C62.52 32.49 61.05 33.97 59.23 33.97z"></path>
                  <path d="M44.88 36.97c-4.43 0-8.03 3.6-8.03 8.03 0 4.43 3.6 8.03 8.03 8.03 4.43 0 8.03-3.6 8.03-8.03C52.91 40.57 49.31 36.97 44.88 36.97z"></path>
                  <path d="M44.88 0C20.09 0 0 20.09 0 44.88c0 24.79 20.09 44.88 44.88 44.88 24.79 0 44.88-20.09 44.88-44.88C89.76 20.09 69.66 0 44.88 0zM71.88 58.38c0 7.51-6.11 13.62-13.62 13.62H31.5c-7.51 0-13.62-6.11-13.62-13.62V31.62c0-7.51 6.11-13.62 13.62-13.62h26.75c7.51 0 13.62 6.11 13.62 13.62V58.38z"></path>
                </svg>
              </a>
            </li>
            <li className="social__li">
              <a className="social__link" href="#" target="_blank">
                <svg
                  className="social__icon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 612 612"
                >
                  <path d="M306 612c-28.15 0-55.28-3.67-81.4-11.02 -26.11-7.35-50.49-17.65-73.13-30.91s-43.25-29.17-61.81-47.74c-18.56-18.56-34.48-39.17-47.74-61.81 -13.26-22.65-23.56-47.02-30.91-73.14C3.67 361.28 0 334.15 0 306s3.67-55.28 11.02-81.4 17.65-50.49 30.91-73.13 29.17-43.25 47.74-61.81 39.17-34.48 61.81-47.74 47.02-23.56 73.13-30.91S277.85 0 306 0c42.02 0 81.7 8.06 119.03 24.17s69.77 37.94 97.31 65.48 49.37 59.98 65.48 97.31S612 263.98 612 306c0 28.15-3.67 55.28-11.02 81.4 -7.35 26.11-17.65 50.49-30.91 73.13 -13.26 22.64-29.17 43.25-47.74 61.81 -18.56 18.56-39.17 34.48-61.81 47.74 -22.65 13.26-47.02 23.56-73.14 30.91C361.28 608.33 334.15 612 306 612zM453.49 179.93H163.4c-2.86 0-5.3 0.92-7.34 2.75s-3.06 4.39-3.06 7.65v32.44c0 1.63 0.61 2.45 1.84 2.45l152.39 86.9 1.23 0.61c0.81 0 1.43-0.2 1.84-0.61l147.49-86.9c0.81-0.41 1.43-0.61 1.84-0.61 0.41 0 1.02-0.2 1.84-0.61 1.63 0 2.45-0.82 2.45-2.45v-31.21c0-3.26-1.02-5.81-3.06-7.65S456.35 179.93 453.49 179.93zM245.41 310.28c0.41-0.41 0.61-1.02 0.61-1.84 0-1.23-0.41-1.84-1.22-1.84l-87.52-50.18c-1.22-0.41-2.24-0.41-3.06 0 -0.82 0-1.22 0.61-1.22 1.84v131.58c0 1.23 0.61 2.04 1.84 2.45h1.22c0.82 0 1.22-0.2 1.22-0.61L245.41 310.28zM351.9 320.08c-0.41-1.23-1.43-1.43-3.06-0.61l-33.66 19.58c-4.08 2.45-8.36 2.45-12.85 0l-29.38-16.52c-1.22-0.82-2.24-0.82-3.06 0l-112 104.04c-0.41 0.41-0.61 1.22-0.61 2.44 0 0.41 0.41 1.02 1.22 1.84 2.45 0.82 4.08 1.23 4.9 1.23H450.43c0.82 0 1.64-0.41 2.45-1.23 0-1.63-0.2-2.65-0.61-3.06L351.9 320.08zM462.06 253.98h-2.44l-83.23 49.57c-0.81 0-1.22 0.61-1.22 1.84 -0.41 0.41-0.2 1.02 0.61 1.83L459 397.19c0.82 0.82 1.43 1.23 1.84 1.23h1.22c1.23-1.23 1.84-2.04 1.84-2.45V256.43C463.9 255.61 463.28 254.8 462.06 253.98z"></path>
                </svg>
              </a>
            </li>
            <li className="social__li">
              <a
                className="social__link"
                href="https://www.facebook.com/SilverTouchTechnologies/"
                target="_blank"
              >
                <svg
                  className="social__icon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 112.2 112.2"
                >
                  <circle cx="56.1" cy="56.1" r="56.1"></circle>
                  <path
                    fill="#fff"
                    d="M70.2 58.29h-10.01v36.67H45.03V58.29h-7.21V45.41h7.21v-8.34c0-5.96 2.83-15.3 15.3-15.3L71.56 21.81v12.51h-8.15c-1.34 0-3.22 0.67-3.22 3.51v7.59h11.33L70.2 58.29z"
                  ></path>
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
