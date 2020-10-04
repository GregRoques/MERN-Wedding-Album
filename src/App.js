import React, { Component } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";

class App extends Component {
  NoPage = () => {
    return <Redirect push to="/" />;
  };

  render() {
    const TESTisLoggedIn = true;

    return (
      <div>
        <Switch>
          <Route exact path="/" component={TESTisLoggedIn ? Home : Login} />
          <Route component={this.NoPage} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
