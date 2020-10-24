import React, { Component } from 'react';
import { connect } from "react-redux";
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import { api } from '../../Dependencies/AxiosOrders'
//import PhotoModal from "./PhotoModal"
import Zip from './Zip-Saver/Zip-Saver';
import cssPhotos from './photos.module.css'

const stateDefault = {
    images: [],
    albumLength: 0,
    modalShow: false,
    modalPhoto: null,
    loaded:false
}

class Photos extends Component {

    state = {
        ...stateDefault,
        error: "NONE"
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.getPhotos(0)
    }

    preventDragHandler = (e) => {
        e.preventDefault();
    }


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

    render() {

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
                        dataLength={this.state.images.length}
                        next={() => this.getPhotos(this.state.images.length)}
                        hasMore={this.state.images.length !== this.state.albumLength}
                        loader={
                            <img
                            src="/images/hearts-placeholder.gif"
                            alt="loading"
                            />
                        }
                        >
                        <div className={cssPhotos.imageGrid} style={{ marginTop: "30px" }}>
                            {this.state.loaded
                            ? this.state.images.map((image, i) => (
                                <div className={cssPhotos.imageItem}>
                                    <img onClick={() => this.setDisplay(true, i) } key={ i + 1} alt={ `G+R_Wedding${i + 1}` } src={`/images/weddingAlbum/web/tb_${image}`}/>
                                </div>
                                ))
                            : ""}
                        </div>
                    </InfiniteScroll>
                </div>
                <Zip
                    imagesList ={this.state.images}
                    imageListFullLength ={this.state.albumLength}
                />
            </div>
        ) : (
                <div>
                    <h2>{this.state.error}</h2>
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