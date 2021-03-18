import React, { Component } from 'react';
import { connect } from "react-redux";
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import { api } from '../../Dependencies/AxiosOrders'
import Zip from './Zip-Saver/Zip-Saver';
import cssPhotos from './photos.module.css'
import PhotoModal from "./PhotoModal/PhotoModal"

class Photos extends Component {

    state = {
        images: [],
        albumLength: 0,
        modalShow: false,
        modalPhoto: null,
        loaded:false,
        degrees: 0,
        error: "NONE",
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.getPhotos(0);
    }

    rotate = () => {
        const { degrees } = this.state;
        const rotation = degrees === 270 ? 0 : degrees + 90
        this.setState({
            degrees: rotation
        })
    }


    // ============================= Image Drag and Context Menu Methods

    preventImageTheft = (e) => {
        e.preventDefault();
    }

    // ============================= Backend Photo Request

    getPhotos = (start) => {
        axios.post(`${api}/backendPhoto`, {
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

    setDisplay = (show, i) => {
        this.setState({
            modalShow: show,
            modalPhoto: i,
            degrees: 0
        })
    }

    nextPrevImage= (i) => {
        this.setState({
            modalPhoto: i,
            degrees:0
        })
    }

    // ============================= Render Block

    render() {
        const {images, albumLength, loaded, error, modalPhoto, modalShow, degrees} = this.state;
        
        return this.state.error === "NONE" ? (
            <div className={cssPhotos.fadeIn}>
                <PhotoModal
                    image={ images[modalPhoto] }
                    imageIndex ={modalPhoto}
                    isShown = { modalShow }
                    nextDirection = { this.nextPrevImage }
                    stopAutoDownload  ={ this.preventImageTheft }
                    closeModal = { this.setDisplay }
                    totalLength = { images.length -1 }
                    degrees = {degrees}
                    rotate = {this.rotate}
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
                                    <img onClick={() => this.setDisplay(true, i) } onDragStart={e=> this.preventImageTheft(e)} onContextMenu={e=> this.preventImageTheft(e)} key={ i + 1} name={image} alt={ `G+R_Wedding${i + 1}` } src={`/images/weddingAlbum/web/tb_${image}`}/>
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
