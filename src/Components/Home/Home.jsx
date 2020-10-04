import React, { Component } from "react";
import cssHome from "./Home.module.css";
import Footer from "../Footer/Footer";
import Video from "../Video/Video";
import Photos from "../Photos/Photos";

class Home extends Component {
  state = {
    selected: "video",
  };

  setView = (type) => {
    this.setState({
      selected: type,
    });
  };

  wedddingLogout = () => {
    console.log("logout function will go here");
  };

  render() {
    const { selected } = this.state;
    const { setView, wedddingLogout } = this;
    return (
      <div className={cssHome.homeBody}>
        <div className={cssHome.header}>
          <span
            className={selected === "video" ? cssHome.headerSelected : ""}
            onClick={() => setView("video")}
          >
            Video
          </span>
          <span
            className={selected === "photos" ? cssHome.headerSelected : ""}
            onClick={() => setView("photos")}
          >
            Photos
          </span>
        </div>
        <div className={cssHome.mainContainer}>
          {selected === "video" ? <Video /> : <Photos />}
        </div>
        <Footer logOut={wedddingLogout} />
      </div>
    );
  }
}

export default Home;
