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
    const isLoggedIn = this.props.userId && this.props.idToken;
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

const mapStateToProps = (state) => {
  return {
    userId: state.auth.userId,
    idToken: state.auth.idToken,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignUp: () => dispatch(authCheckState()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
