import React, { Component } from 'react';
import PhotoModal from "./PhotoModal"
import cssPhotos from './photos.module.css'

// div scroll end for photos:
// https://stackoverflow.com/questions/45585542/detecting-when-user-scrolls-to-bottom-of-div-with-react-js

class Photos extends Component{

    state = {
        images: [],
        totalLength: 0,
        modalShow: false,
        modalPhoto: null,
        error: "NONE"
    }

    componentDidMount(){
        window.scrollTo(0, 0);
        this.getPhotos(0, 25)
    }

    getPhotos = (imageStart, nextImages) =>{ 
        axios.get(`${api}/photography`, {
            lengthStart = imageStart,
            total: nextImages
        })
        .then(res =>{
            this.setState(prevState =>({
                images: prevState.images.push(req.body.images),
                length: prevState.length > 0 ? prevState.length : res.body.length
            }))
        })
        .catch(err =>{
            this.setState({
                error: err
            })
        })
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

    setDisplay = (show, image) =>{
        this.setState({
            modalShow: show,
            modalPhoto: image
        })
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
        const { modalPhoto, modalShow, error } = this.state
        const { clickL, clickR, setDisplay, preventDragHandler, handleScroll  } = this;

        return error === "NONE" ? (
            <div className = { cssPhotos.fadeIn }>
                <PhotoModal
                    image={ modalPhoto }
                    isShown = { modalShow }
                    rightClick = { clickR }
                    leftClick = { clickL }
                    closeModal = { setDisplay }
                />
                <h1 className = {cssPhotos.albumTitleText}>{currentPathname}</h1>
                <div className = { cssPhotos.photoGalleryContainer } onScroll={(e) => handleScroll(e)}>
                    <div className = { cssPhotos.photoGrid } >
                        { photoArray[currentPathname].map((image, i) => {
                            return(
                                <div key={ i } className={cssPhotos.photoBox} onContextMenu={preventDragHandler} onDragStart={preventDragHandler}>
                                    <img onClick={() => setDisplay(true, i) } alt={ currentPathname + i } src={'/images/photography/'+ image}/>
                                </div>
                            )
                        }) } 
                    </div>
                </div>
            </div>
        ) : (
            <div>
               <h2>{error}</h2> 
            </div>
        )
    }
}


export default Photos;