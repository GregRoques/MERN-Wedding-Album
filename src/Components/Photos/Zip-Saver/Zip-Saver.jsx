import React from 'react';
import cssZip from "./zipSaver.module.css";

const Zip = ({imagesList, imageListFullLength}) =>{
    return imagesList.length === imageListFullLength ? (
        <div className={cssZip.pdfLink}>
            <a href="/images/weddingAlbum/zip/G+R_WeddingAlbumFull.zip" download> Download All</a>
        </div>
    ) : ""
}

export default Zip