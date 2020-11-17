import React from 'react';
import cssInsta from './insta.module.css'

const Insta = () =>{
    return(
        <div className={cssInsta.instaBody}>
            <div className={cssInsta.gregInsta}>
                <a
                    href="https://www.instagram.com/qtrmileatatime"
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    <img
                        src="/images/socialIcons/gregInsta1.png"
                        alt="Insta: @qtrmileatatime"
                    />
                    <img
                        className={cssInsta.gregInsta2}
                        src="/images/socialIcons/gregInsta2.png"
                        alt="Insta: @qtrmileatatime"
                    />
                </a>
            </div>
            <div className={cssInsta.rebeccaInsta}>
                <a
                    href="https://www.instagram.com/thegurv"
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    <img
                        src="/images/socialIcons/rebeccaInsta1.png"
                        alt="Insta: @thegurv"
                        // title="@thegurv"
                    />
                    <img
                        className={cssInsta.rebeccaInsta2}
                        src="/images/socialIcons/rebeccaInsta2.png"
                        // title="@thegurv"
                        alt="Insta: @thegurv"
                    />
                </a>
            </div>
        </div>
    )
}

export default Insta;