import React, { Component } from "react";
import cssFooter from "./footer.module.css";

class Footer extends Component {
  wedddingLogout = () => {
    console.log("logout function will go here");
  };
  render() {
    const { wedddingLogout } = this;
    return (
      <div className={cssFooter.footer}>
        <div className={cssFooter.gregInsta}>
          <a
            href="https://www.instagram.com/qtrmileatatime"
            rel="noopener noreferrer"
            target="_blank"
          >
            <img
              src="/images/socialIcons/gregInsta1.png"
              alt="Insta: @qtrmileatatime"
              // title="@qtrmileatatime"
            />
            <img
              className={cssFooter.gregInsta2}
              src="/images/socialIcons/gregInsta2.png"
              alt="Insta: @qtrmileatatime"
              // title="@qtrmileatatime"
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
              src="/images/socialIcons/rebeccaInsta1.png"
              alt="Insta: @thegurv"
              // title="@thegurv"
            />
            <img
              className={cssFooter.rebeccaInsta2}
              src="/images/socialIcons/rebeccaInsta2.png"
              // title="@thegurv"
              alt="Insta: @thegurv"
            />
          </a>
        </div>
        <div className={cssFooter.logOutButton} onClick={wedddingLogout}>
          <button className={cssFooter.button}>Log Out</button>
        </div>
      </div>
    );
  }
}

export default Footer;
