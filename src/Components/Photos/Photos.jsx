import React, { Component } from 'react';
import PhotoModule from './PhotoModal';
import photoModal from "./PhotoModal"
import cssPhotos from './photos.module.css'

// div scroll end for photos:
// https://stackoverflow.com/questions/45585542/detecting-when-user-scrolls-to-bottom-of-div-with-react-js

class Photos extends Component{

    state = {
        images: [],
        modalShow: false,
        modalPhoto: null
    }

    componentDidMount(){
        window.scrollTo(0, 0);
    }

    handleScroll = e => {
        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        if (bottom) { 
            console.log("bottom")
        }
     }

     preventDragHandler = (e) => {
        e.preventDefault();
      }

      pictureDisplayOn = (currentPhoto) =>{
        this.setState(prevState =>({
            modalShow: !prevState.modalShow,
            modalPhoto: currentPhoto
        }))

    }

    pictureDisplayOff = () =>{
        this.setState(prevState=>({
            modalShow: !prevState.modalShow,
            modalPhoto: null
        }))
    }

    clickL = (i, album) =>{
        i--
        if(i<0){
            i = photoArray[album].length - 1
        }

        this.setState({
            modalPhoto: i
        })
    }

    clickR = (i, album) =>{
        i++
        if(i> photoArray[album].length - 1){
            i = 0
        }

        this.setState({
            modalPhoto: i
        })
    }

    render(){
        const { modalPhoto, modalShow} = this.state
        const { clickL, clickR, pictureDisplayOff, preventDragHandler, handleScroll, pictureDisplayOn } = this;
        return(
            <div className = { cssPhotos.fadeIn }>
                { modalShow ? <PhotoModule
                    image={ modalPhoto }
                    rightClick = { clickR }
                    leftClick = { clickL }
                    closeModal = { pictureDisplayOff }
                /> : "" }
                <h1 className = {cssPhotos.albumTitleText}>{currentPathname}</h1>
                <div className = { cssPhotos.photoGalleryContainer } onScroll={(e) => handleScroll(e)}>
                    <div className = { cssPhotos.photoGrid } >
                        { photoArray[currentPathname].map((image, i) => {
                            return(
                                <div key={ i } className={cssPhotos.photoBox} onContextMenu={preventDragHandler} onDragStart={preventDragHandler}>
                                    <img onClick={() => pictureDisplayOn(i) } alt={ currentPathname + i } src={'/images/photography/'+ image}/>
                                </div>
                            )
                        }) } 
                    </div>
                </div>
                {/* cats */}
            </div>
        )
        
    }
}


export default Photos;