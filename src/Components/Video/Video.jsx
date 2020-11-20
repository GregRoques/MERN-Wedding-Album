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

    axios.post(`${api}/video`, {
      loginCheck: this.props.isLoggedIn
    }).then(res => {
      const {playlistLinkId, videoLinks} = res.data;
      this.setState({
        playlistId: playlistLinkId,
        videoLinks: videoLinks,
        currVid: videoLinks[0].link,
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
    console.log(value)
    const { videoLinks } = this.state
    this.setState({
      currVid: videoLinks[value].link,
    });
  };

  render() {
    const { onChangeHandler } = this;
    const { playlistId, videoLinks, currVid, isDisplay } = this.state;
    console.log(currVid)
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
        <div className={cssVideo.bookMarkLink}>
            <a href={`https://www.youtube.com/playlist?list=${playlistId}`} target="_blank">Bookmark YouTube Page</a>
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
