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

  render() {
    const { selected } = this.state;
    const { setView } = this;
    return (
      <div>
        <div className={cssHome.header}>
          <span onClick={() => setView("video")}>Video</span>
          <span onClick={() => setView("photos")}>Photos</span>
        </div>
        {selected === "video" ? <Video /> : <Photos />}
        <Footer />
      </div>
    );
  }
}

export default Home;
