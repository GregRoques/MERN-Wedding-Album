import React from "react";
import { connect } from "react-redux";
import { logOut } from "../../Redux/Actions/Auth";
import cssFooter from "./footer.module.css";

const Footer = (props) => {
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
          />
          <img
            className={cssFooter.gregInsta2}
            src="/images/socialIcons/gregInsta2.png"
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
      <div className={cssFooter.pdfLink}>
        <a href="" download="Greg_Rebecca_wedding_album">
          Click here to see our wedding album pdf
        </a>
      </div>
      <div className={cssFooter.logOutButton} onClick={() => props.LogOut()}>
        <button className={cssFooter.button}>Log Out</button>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    LogOut: () => dispatch(logOut())
  };
};

export default connect(null, mapDispatchToProps)(Footer);
