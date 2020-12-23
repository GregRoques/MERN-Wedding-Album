import React, { Component } from "react";
import { Link } from 'react-router-dom';
import cssLayout from "./layout.module.css";
import Footer from "../Footer/Footer";

class Home extends Component {
  state = {
    selected: "photos",
  };

  componentDidMount(){
    const isSelected = window.location.pathname.split("/")[1]
      this.setView(isSelected)
  }

  setView = (type) => {
    this.setState({
      selected: type,
    });
  };

  render() {
    const { setView } = this;
    const { selected } = this.state;
    return (
      <div className={cssLayout.homeBody}>
        <div className={cssLayout.header}>
          <span>
            <Link onClick={()=>{this.setView("video")}} className={selected === "video" ? cssLayout.headerSelected : cssLayout.headerNotSelected} to="/video">Video</Link>
          </span>
          <span>
            <Link onClick={()=>{this.setView("photos")}} className={selected === "photos" ? cssLayout.headerSelected : cssLayout.headerNotSelected} to="/photos">Photos</Link>
          </span>
        </div>
        <div className={cssLayout.mainContainer}>
          <hoc>
            {this.props.children}
          </hoc>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Home;
