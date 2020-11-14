import React from "react";
import { Link } from 'react-router-dom'
import { connect } from "react-redux";
import { logOut } from "../../Redux/Actions/Auth";
import cssFooter from "./footer.module.css";

const Footer = (props) => {
  return (
    <div className={cssFooter.footer}>
      <div className={cssFooter.logOutButton} >
      <Link to="/contact"> 
        <button  className={cssFooter.button}>
          Contact
        </button>
      </Link>
        <button onClick={() => props.LogOut(props.isLoggedIn.password)} className={cssFooter.button}>
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
    LogOut: () => dispatch(logOut())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
