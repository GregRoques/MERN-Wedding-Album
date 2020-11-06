import React, { Component } from "react";
import { connect } from "react-redux";
import cssLogin from "./Login.module.css";
import axios from "axios";
import { api } from "../../Dependencies/AxiosOrders";
import { browserName } from "react-device-detect";
import { logIn } from "../../Redux/Actions/Auth";

class Login extends Component {
  state = {
    password: "",
    placeholder: "Password",
    ip:""
  };

  componentDidMount(){
    axios("https://extreme-ip-lookup.com/json/")
    .then((res) => {
      const { query } = res.data;
      this.setState({
          ip: query
      })
    })
  }

  onChangeHandler = (e) => {
    let { value } = e.target;
    this.setState({ password: value });
  };

  isWrongPW = () => {
    this.setState({
      password: "",
      placeholder: "INCORRECT PASSWORD",
    });
  };

  onSubmitHanlder = (e) => {
    e.preventDefault();
    const { LogIn } = this.props;
    const { password, ip } = this.state;
    const { isWrongPW } = this;
    if(password){
    axios
      .post(`${api}/login`, {
        password,
        compId: {
          browserName,
          ip
        }
      })
      .then((res) => {
        const pw = res.data;
        console.log(pw)
        if (pw === "NO") {
          return isWrongPW();
        } else {
          if(pw !== "save-error"){
            window.localStorage.setItem("GR-Wedding-Token", pw)
          };
          return LogIn({
            password: pw,
            browswer: browserName,
            ip: ip
          });
        }
      })
      .catch(() => {
          isWrongPW();
      });
    }
  };

  render() {
    const { password, placeholder } = this.state;
    const { isLoaded } = this.props;
    return isLoaded === "yes" ? (
      <div>
        <form onChange={this.onChangeHandler} onSubmit={(e) => this.onSubmitHanlder(e)}>
          <input
            className={cssLogin.shortForm}
            type="password"
            placeholder={placeholder}
            value={password}
            required
          />
          <div className={cssLogin.buttonContainer}>
            <button type="submit" className={cssLogin.button}>
              {placeholder === "Password" ? "SUBMIT" : "Try Again?"}
            </button>
          </div>
        </form>
      </div>
    ) : <div className={cssLogin.isLoading}>
        <img src="/images/hearts-placeholder.gif"/>
    </div>;
  }
}

const mapStateToProps = (state) => {
  return {
    isLoaded: state.auth.isLoaded,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    LogIn: (password) => dispatch(logIn(password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
