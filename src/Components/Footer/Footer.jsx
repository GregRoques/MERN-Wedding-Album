import React from "react";
import { Redirect } from 'react-router-dom'
import { connect } from "react-redux";
import { logOut } from "../../Redux/Actions/Auth";
import cssFooter from "./footer.module.css";

const Footer = (props) => {
  return (
    <div className={cssFooter.footer}>
      <div className={cssFooter.logOutButton} >
        <button onClick={() =>{return <Redirect to="/contact"/>}} className={cssFooter.button}>
          Contact
        </button>
        <button onClick={() => props.LogOut()} className={cssFooter.button}>
          Log Out
        </button>
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
