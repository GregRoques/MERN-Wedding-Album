import React, { Component } from "react";
import axios from "axios";
import { api } from "../../Dependencies/AxiosOrders";
import { connect } from "react-redux";
import cssVideo from "./video.module.css";


class Video extends Component {
  state = {
    isDisplay: "yes",
    playlistId: "",
    videoLinks: "",
    currVid: ""
  };

  componentDidMount(){
    window.scrollTo(0, 0);

    axios.post(`${api}/backendVideo`, {
      loginCheck: this.props.isLoggedIn
    }).then(res => {
      const videoList = res.data;
      this.setState({
        videoLinks: videoList,
        currVid: videoList[0].link,
        isDisplay: "yes"
      })
    }).catch(()=>{
      this.setState({
        isDisplay: "no"
      })
    })
  }
  
  onChangeHandler = (e) => {
    const { value } = e.target;
    const { videoLinks } = this.state
    this.setState({
      currVid: videoLinks[value].link,
    });
  };

  render() {
    const { onChangeHandler } = this;
    const { videoLinks, currVid, isDisplay } = this.state;
    return isDisplay === "yes" ? (
      <div>
        <div className={cssVideo.selectBarContainer}>
          <select
            name="weddingVids"
            className={cssVideo.selectBar}
            onChange={onChangeHandler}
          >
            {Object.values(videoLinks).map((vid, index) => {
              return (
                <option value={index} >
                  {index + 1}. {vid.title}
                </option>
              );
            })}
          </select>
        </div>
        <div className={cssVideo.videoAlign}>
          <iframe width="560" height="315" src={currVid} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
      </div>
    ) : <div className={cssVideo.isError}>
            <img src="/images/ytFail.jpg"/>
            <div>Sorry, YouTube Cannot Load Your Videos at This Time :(</div>
        </div>
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
  };
};

export default connect(mapStateToProps,null)(Video);
