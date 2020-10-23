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
          isWrongPW();
        } else {
          if(pw !== "save-error"){
            window.localStorage.setItem("GR-Wedding-Token", pw)
          };
          LogIn(pw);
        }
      })
      .catch(() => {
          isWrongPW();
      });
    }
  };

  render() {
    const { password, placeholder } = this.state;
    return (
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
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    LogIn: () => dispatch(logIn()),
  };
};

export default connect(null, mapDispatchToProps)(Login);
