import React from "react";
import cssVideo from "./video.module.css";

const Video = () => {
    return (
      <div>
        <div className={cssVideo.videoAlign}>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/videoseries?list=PLM2GdNHvfSCElP-c0kHDV6nYszw1mxfkm" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <div className={cssVideo.bookMarkLink}>
            <a href="https://www.youtube.com/playlist?list=PLM2GdNHvfSCElP-c0kHDV6nYszw1mxfkm" target="_blank">Bookmark YouTube Page</a>
        </div>
      </div>
    );
}

export default Video;
