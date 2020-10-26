import React, { Component } from "react";
import cssHome from "./Home.module.css";
import Footer from "../Footer/Footer";
import Video from "../Video/Video";
import Photos from "../Photos/Photos";

class Home extends Component {
  state = {
    selected: "photos",
  };

  setView = (type) => {
    this.setState({
      selected: type,
    });
  };

  render() {
    const { setView } = this;
    const { selected } = this.state;
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
        <Footer />
      </div>
    );
  }
}

export default Home;
