import React, { Component } from 'react';
import { connect } from "react-redux";
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import { api } from '../../Dependencies/AxiosOrders'
import Zip from './Zip-Saver/Zip-Saver';
import cssPhotos from './photos.module.css'
//import PhotoModal from "./PhotoModal"
import ImageContextMenu from './ImageContextMenu/ImageContextMenu'
import { GalleryContextMenu } from './ImageContextMenu/customMenus'

class Photos extends Component {

    state = {
        images: [],
        albumLength: 0,
        modalShow: false,
        modalPhoto: null,
        loaded:false,
        isImageContextShown: false,
        error: "NONE"
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.getPhotos(0);
        document.addEventListener("click", this.handleClick);
    }

    // ============================= Image Drag and Context Menu Methods

    handleClick = (e) => {
        if (isImageContextShown) this.setState({ isImageContextShown: false });
      };

    preventDragHandler = (e) => {
        e.preventDefault();
    }

    openContextMenu = (e, image) =>{
        e.preventDefault();
        this.setState({
            isImageContextShown: true,
        })
        return(
            <ImageContextMenu isShown={this.state.isImageContextShown} e={e} menu={() => <GalleryContextMenu image={image}/>}/>
        )
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
        const {images, albumLength, loaded, error} = this.state;
        return this.state.error === "NONE" ? (
            <div className={cssPhotos.fadeIn}>
                {/* <PhotoModal
                    image={ this.state.modalPhoto }
                    isShown = { this.state.modalShow }
                    rightClick = { this.nextPrevImage }
                    leftClick = { this.nextPrevImage }
                    closeModal = { this.setDisplay }
                    totalLength = { this.state.albumLength }
                /> */}
                <div className={cssPhotos.imageGalleryContainer}>
                    <InfiniteScroll
                        dataLength={images.length}
                        next={() => this.getPhotos(images.length)}
                        hasMore={images.length !== albumLength}
                        loader={
                            <img
                            src="/images/hearts-placeholder.gif"
                            alt="loading"
                            />
                        }
                        >
                        <div className={cssPhotos.imageGrid} style={{ marginTop: "30px" }}>
                            {loaded
                            ? images.map((image, i) => (
                                <div className={cssPhotos.imageItem}>
                                    <img onClick={() => this.setDisplay(true, i) } onDragStart={e=> this.preventDragHandler(e)} onContextMenu={e=> this.openContextMenu(e,image)} key={ i + 1} alt={ `G+R_Wedding${i + 1}` } src={`/images/weddingAlbum/web/tb_${image}`}/>
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