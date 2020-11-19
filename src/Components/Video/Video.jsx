import React, { Component } from "react";
import axios from "axios";
import { api } from "../../Dependencies/AxiosOrders";
import { connect } from "react-redux";
import cssVideo from "./video.module.css";


class Video extends Component {
  state = {
    playlistId: "",
    videoLinks: "",
    currVid: ""
  };

  componentDidMount(){
    window.scrollTo(0, 0);

    axios.post(`${api}/video`, {
      loginCheck: this.props.isLoggedIn
    }).then(res => {
      const {playlistLinkId, videoLinks} = res.data;
      this.setState({
        playlistId: playlistLinkId,
        videoLinks: videoLinks,
        currVid: videoLinks[0].link
      })
    })
  }
  
  onChangeHandler = (e) => {
    const { value } = e.target;
    console.log(value)
    const { videoLinks } = this.state
    this.setState({
      currVid: videoLinks[value].link,
    });
  };

  render() {
    const { onChangeHandler } = this;
    const { playlistId, videoLinks, currVid } = this.state;
    console.log(currVid)
    return (
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
        <div className={cssVideo.bookMarkLink}>
            <a href={`https://www.youtube.com/playlist?list=${playlistId}`} target="_blank">Bookmark YouTube Page</a>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
  };
};

export default connect(mapStateToProps,null)(Video);
