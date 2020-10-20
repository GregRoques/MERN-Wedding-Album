import React, { Component } from 'react';
import axios from 'axios';
import { api } from '../../Dependencies/AxiosOrders'
//import PhotoModal from "./PhotoModal"
import cssPhotos from './photos.module.css'

const stateDefault = {
    images: [],
    albumLength: 0,
    indexStart: 0,
    modalShow: false,
    modalPhoto: null,
}

class Photos extends Component {

    state = {
        ...stateDefault,
        error: "NONE"
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.getPhotos(this.state.images.length)
    }

    getPhotos = (length) => {
        axios.post(`${api}/photography`, {
            lengthStart: length,
        })
            .then(res => {
                this.setState(prevState => ({
                    images: [...prevState.images, ...res.data.images],
                    albumLength: prevState.albumLength === 0 ? res.data.albumLength : prevState.albumLength,
                    indexStart: prevState.images.length
                }))
                //console.log(`${this.state.images.length} ${this.state.indexStart}`)
                if (this.state.images.length !== this.state.albumLength) {
                    setTimeout(() => {
                        this.getPhotos(this.state.images.length)
                    }, 500)
                }
            })
            .catch(err => {
                this.setState({
                    ...stateDefault,
                    error: err
                })
            })
    }

    preventDragHandler = (e) => {
        e.preventDefault();
    }

    setDisplay = (show, image) => {
        this.setState({
            modalShow: show,
            modalPhoto: image
        })
    }

    clickL = (i, album) => {
        i--
        // if(i<0){
        //     i = photoArray[album].length - 1
        // }
        this.setState({
            modalPhoto: i
        })
    }

    clickR = (i, album) => {
        i++
        // if(i> photoArray[album].length - 1){
        //     i = 0
        // }
        this.setState({
            modalPhoto: i
        })
    }

    render() {
        const { modalPhoto, modalShow, error, albumLength } = this.state
        const { clickL, clickR, setDisplay, preventDragHandler, handleScroll } = this;
        return error === "NONE" ? (
            <div className={cssPhotos.fadeIn}>
                {/* <PhotoModal
                    image={ modalPhoto }
                    isShown = { modalShow }
                    rightClick = { clickR }
                    leftClick = { clickL }
                    closeModal = { setDisplay }
                    totalLength = { albumLength }
                /> */}
                <div className={cssPhotos.photoGrid} >
                    {/* { photoArray[currentPathname].map((image, i) => {
                            return(
                                <div key={ i } className={cssPhotos.photoBox} onContextMenu={preventDragHandler} onDragStart={preventDragHandler}>
                                    <img onClick={() => setDisplay(true, i) } alt={ currentPathname + i } src={'/images/photography/'+ image}/>
                                </div>
                            )
                        }) }  */}
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