import React from 'react;'
import { css } from "emotion";
import { Motion } from 'react-motion'

const ImageContextMenu = ({e, isShown, menu}) => {

    const imageContextMenu = css`
        position: absolute;
        top: ${e.pageX}px,
        left: ${e.pageY}px
    `;

    return(
        <Motion
        defaultStyle={{ opacity: 0 }}
        style={{ opacity: !isShown ? spring(0) : spring(1) }}
      >
        {(interpolatedStyle) => (
          <>
            {isShown ? (
                <div
                    className={imageContextMenu} 
                    style={{opacity: interpolatedStyle.opacity}}
                >
                    {menu}
                </div>
            ) : (
              <></>
            )}
          </>
        )}
      </Motion>
    );
}

export default ImageContextMenu;


