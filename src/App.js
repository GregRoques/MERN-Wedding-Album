import React, { Component } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import { authCheckState } from "./Redux/Actions/Auth";
import Layout from "./Components/Layout/Layout";
import Photos from "./Components/Photos/Photos";
import Video from "./Components/Video/Video";
import Login from "./Components/Login/Login";
import Contact from './Components/Contact/Contact';

class App extends Component {
  async componentDidMount() {
    const ip = await axios("https://extreme-ip-lookup.com/json/")
      .then((res) => {
        return res.data.query;
      })
      .catch(() => {
        return "";
      });
    this.props.onTryAutoSignIn(ip);
  }

  NoPage = () => {
    return <Redirect push to={!this.props.isLoggedIn ? "/login" : "/video"} />;
  };

  render() {
    const { isLoggedIn } = this.props;
    return (
      <div>
        {isLoggedIn === "" ? (
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route component={this.NoPage} />
          </Switch>
        ) : (
          <Layout>
            <Switch>
              <Route exact path="/video" component={Video} />
              <Route exact path="/photos" component={Photos} />
              <Route exact path="/contact" component={Contact} />
              <Route component={this.NoPage} />
            </Switch>
          </Layout>
        )}
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
