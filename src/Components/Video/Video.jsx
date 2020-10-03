import React, { Component } from "react";
import ReactHtmlParser from "react-html-parser";
import cssVideo from "./video.module.css";
import { videoList } from "./videoList";

class Video extends Component {
  state = {
    currVid: videoList.Feature_Video,
  };

  onChangeHandler = (e) => {
    const { value } = e.target;

    this.setState({
      currVid: videoList[value],
    });
  };

  render() {
    const { onChangeHandler } = this;
    const { currVid } = this.state;
    return (
      <div>
        <div className={cssVideo.selectBarContainer}>
          <select
            name="weddingVids"
            className={cssVideo.selectBar}
            onChange={onChangeHandler}
          >
            {Object.keys(videoList).map((vid, index) => {
              return (
                <option value={vid}>
                  {index + 1}. {vid.replaceAll("_", " ")}
                </option>
              );
            })}
          </select>
        </div>
        <div className={cssVideo.videoAlign}>{ReactHtmlParser(currVid)}</div>
      </div>
    );
  }
}

export default Video;
