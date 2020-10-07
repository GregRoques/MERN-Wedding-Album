import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { api } from "../../Dependencies/AxiosOrders";
import { compId } from "../../Dependencies/userInfo";
import cssLogin from "./Login.module.css";
import { logIn } from "../../Redux/Actions/Auth";

class Login extends Component {
  state = {
    password: "",
    placeholder: "Password",
  };

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
    const { password } = this.state;
    const { isWrongPW } = this;

    axios
      .post(`${api}/login`, {
        password,
        compId,
      })
      .then((res) => {
        const { pw, userName, isCorrectPW } = res.data;
        if (isCorrectPW === "yes") {
          LogIn();
          localStorage.setItem("token", pw);
          localStorage.setItem("userId", userName);
        } else {
          isWrongPW();
        }
      })
      .catch(() => {
        isWrongPW();
      });
  };

  render() {
    const { onChangeHandler, onSubmitHanlder } = this;
    const { password, placeholder } = this.state;
    return (
      <div>
        <form onChange={onChangeHandler} onSubmit={(e) => onSubmitHanlder(e)}>
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
