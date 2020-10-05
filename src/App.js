import React, { Component } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignUp();
  }

  NoPage = () => {
    return <Redirect push to="/" />;
  };

  render() {
    const { isLoggedIn } = this.props;

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

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignUp: () => dispatch(authCheckState()),
  };
};

export default withRouter(connect(null, mapDispatchToProps)(App));
