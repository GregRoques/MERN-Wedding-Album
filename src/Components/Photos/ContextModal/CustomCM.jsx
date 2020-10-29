import React from 'react';
import cssCustomCM from './customCM.module.css';
import { css } from 'emotion';

const ContextModal = ({top, left, isShown, currImage }) =>{
    return isShown ? (
        <a href={`/images/weddingAlbum/full/${currImage}`} download>
            <div id="customContextMenu" className={cssCustomCM.cmContainer} style={{ top: top, left: left}}>
                Save Original Image
            </div>
        </a>
    ) : "";
}

export default ContextModal;