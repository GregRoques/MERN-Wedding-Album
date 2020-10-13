import React, { Component } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import { authCheckState } from "./Redux/Actions/Auth";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";

class App extends Component {
  componentDidMount() {
    axios("https://extreme-ip-lookup.com/json/").then((res) => {
      const { query } = res.data;
      this.props.onTryAutoSignIn(query);
    });
  }

  NoPage = () => {
    return <Redirect push to="/" />;
  };

  render() {
    const { isLoggedIn } = this.props;
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
    isLoggedIn: state.auth.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignIn: (ip) => dispatch(authCheckState(ip)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
