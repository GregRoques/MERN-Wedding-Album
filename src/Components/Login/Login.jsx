import React, { Component } from "react";
import cssLogin from "./Login.module.css";

class Login extends Component {
  state = {
    password: "",
    placeholder: "Password",
  };

  onChangeHandler = (e) => {
    let { value } = e.target;

    this.setState({ password: value });
  };

  onSubmitHanlder = (e) => {
    e.preventDefault();
    const TESTpassoword = false;
    if (!TESTpassoword) {
      this.setState({
        password: "",
        placeholder: "INCORRECT PASSWORD",
      });
    }
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

export default Login;
