import React, { Component } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";

class App extends Component {
  NoPage = () => {
    return <Redirect push to="/" />;
  };

  render() {
    const isLoggedIn = true;

    return (
      <div>
        <Switch>
          <Route exact path="/" component={isLoggedIn ? Home : Login} />
          <Route component={this.NoPage} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
