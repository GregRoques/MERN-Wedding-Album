import React from "react";
import cssFooter from "./footer.module.css";

const Footer = () => {
  return (
    <div className={cssFooter.footer}>
      <div className={cssFooter.gregInsta}>
        <a
          href="https://www.instagram.com/qtrmileatatime"
          rel="noopener noreferrer"
          target="_blank"
        >
          <img
            src="/images/socialIcons/gregInsta2.jpg"
            alt="Insta: @qtrmileatatime"
          />
          <img
            className={cssFooter.gregInsta2}
            src="/images/socialIcons/gregInsta1.jpg"
            alt="Insta: @qtrmileatatime"
          />
        </a>
      </div>
      <div className={cssFooter.rebeccaInsta}>
        <a
          href="https://www.instagram.com/thegurv"
          rel="noopener noreferrer"
          target="_blank"
        >
          <img
            src="/images/socialIcons/rebeccaInsta2.jpg"
            alt="Insta: @thegurv"
          />
          <img
            className={cssFooter.rebeccaInsta2}
            src="/images/socialIcons/rebeccaInsta1.jpg"
            alt="Insta: thegurv"
          />
        </a>
      </div>
    </div>
  );
};

export default Footer;
