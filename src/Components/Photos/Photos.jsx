import React, { Component, useEffect } from 'react';
import { connect } from "react-redux";
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import { api } from '../../Dependencies/AxiosOrders'
import Zip from './Zip-Saver/Zip-Saver';
import cssPhotos from './photos.module.css'
import PhotoModal from "./PhotoModal/PhotoModal"
import ContextModal from "./ContextModal/CustomCM"

class Photos extends Component {

    state = {
        images: [],
        albumLength: 0,
        modalShow: false,
        modalPhoto: null,
        loaded:false,
        error: "NONE",
        customCM: {
            left: "",
            top: "",
            isCmShown: false,
            currImage: ""
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.getPhotos(0);
    }
    
    compontentWillUnMount(){
        if(this.state.customCM.isCmShown){
            window.addEventListener('click', this.preventImageTheft).abort()
        }
    }

    // ============================= Image Drag and Context Menu Methods

    preventImageTheft = (e) => {
        if(e.type !== "click"){
            e.preventDefault();
        }
        console.log(e.type)
        if(e.type === "contextmenu" && this.state.images.includes(e.target.name)){
            this.setState({
                customCM:{
                    left: `${e.pageX}px`,
                    top: `${e.pageY - 100}px`,
                    isCmShown: true,
                    currImage: e.target.name
                }
            })
                window.addEventListener('click', e => {
                    this.setState({
                        customCM:{
                            isCmShown: false,
                        }
                    })
                }, {once: true})
            
        }
    }


    // ============================= Backend Photo Request

    getPhotos = (start) => {
        axios.post(`${api}/photography`, {
            lengthStart: start,
            loginCheck: this.props.isLoggedIn
        })
        .then(res => {
            this.setState(prevState => ({
                images: [...prevState.images, ...res.data.images],
                albumLength: prevState.albumLength === 0 ? res.data.albumLength : prevState.albumLength,
                loaded: true
            }))
        })        
        .catch(err => {
            this.setState({
                error: err.data
            })
        })

    }

    // ============================= pop-up Modal Methods

    setDisplay = (show, image) => {
        this.setState({
            modalShow: show,
            modalPhoto: image
        })
    }

    nextPrevImage= (i) => {
        this.setState({
            modalPhoto: i
        })
    }

    // ============================= Render Block

    render() {
        const {images, albumLength, loaded, error, modalPhoto, modalShow} = this.state;
        const { left, top, isCmShown, currImage } = this.state.customCM;
        
        return this.state.error === "NONE" ? (
            <div className={cssPhotos.fadeIn}>
                <PhotoModal
                    image={ modalPhoto }
                    isShown = { modalShow }
                    nextDirection = { this.nextPrevImage }
                    stopAutoDownload  ={ this.preventImageTheft }
                    closeModal = { this.setDisplay }
                    download ={images[modalPhoto]}
                    totalLength = { images.length -1 }
                />
                <ContextModal
                    top={ top }
                    left={ left }
                    isShown ={ isCmShown }
                    currImage={ currImage}
                />
                <div className={cssPhotos.imageGalleryContainer}>
                    <InfiniteScroll
                        dataLength={images.length}
                        next={() => this.getPhotos(images.length)}
                        hasMore={images.length !== albumLength}
                        loader={
                            <img
                            className={cssPhotos.loader}
                            src="/images/hearts-placeholder.gif"
                            alt="loading"
                            />
                        }
                        >
                        <div className={cssPhotos.imageGrid} style={{ marginTop: "30px" }}>
                            {loaded
                            ? images.map((image, i) => (
                                <div className={cssPhotos.imageItem}>
                                    <img onClick={() => this.setDisplay(true, i) } onDragStart={e=> this.preventImageTheft(e)} onContextMenu={e=> this.preventImageTheft(e)} key={ i + 1} name={image} alt={ `G+R_Wedding${i + 1}` } src={`/images/weddingAlbum/web/tb_${i}.jpeg`}/>
                                </div>
                                ))
                            : ""}
                        </div>
                    </InfiniteScroll>
                </div>
                <Zip
                    imagesList ={images}
                    imageListFullLength ={albumLength}
                />
            </div>
        ) : (
                <div>
                    <h2>{error}</h2>
                </div>
            )
    }
}

const mapStateToProps = (state) => {
    return {
      isLoggedIn: state.auth.isLoggedIn,
    };
  };
  
  export default connect(mapStateToProps,null)(Photos);