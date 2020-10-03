import React, { Component } from "react";
import cssLogin from "./Login.module.css";

class Login extends Component {
  state = {
    password: "",
  };

  onChangeHandler = (e) => {
    let { value } = e.target;

    this.setState({ password: value });
  };

  onSubmitHanlder = (e) => {
    e.preventDefault();
  };

  render() {
    const { onChangeHandler, onSubmitHanlder } = this;
    const { password } = this.state;
    return (
      <div>
        <form onChange={onChangeHandler} onSubmit={(e) => onSubmitHanlder(e)}>
          <input
            className={cssLogin.shortForm}
            type="text"
            placeholder="Password"
            value={password}
            required
          />
          <div></div>
          <button type="submit" className={cssLogin.submit}>
            SUBMIT
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
