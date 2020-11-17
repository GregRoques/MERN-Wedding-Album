import React from "react";
import { Link } from 'react-router-dom'
import { connect } from "react-redux";
import { logOut } from "../../Redux/Actions/Auth";
import cssFooter from "./footer.module.css";

const Footer = (props) => {
  return (
    <div className={cssFooter.footer}>
      <div className={cssFooter.logOutButton} >
        <button onClick={() => props.LogOut(props.isLoggedIn)} className={cssFooter.button}>
          Log Out
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    LogOut: (props) => dispatch(logOut(props))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
