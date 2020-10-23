import React, { Component } from 'react';
import { connect } from "react-redux";
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import { api } from '../../Dependencies/AxiosOrders'
//import PhotoModal from "./PhotoModal"
import cssPhotos from './photos.module.css'

const stateDefault = {
    images: [],
    albumLength: 0,
    modalShow: false,
    modalPhoto: null,
    loaded:true
}

class Photos extends Component {

    state = {
        ...stateDefault,
        error: "NONE"
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.getPhotos()
    }

    preventDragHandler = (e) => {
        e.preventDefault();
    }


    getPhotos = () => {
        axios.post(`${api}/photography`, {
            lengthStart: 0,
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
        console.log(this.state.images)
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
                        dataLength={this.state.images}
                        next={() => this.getPhotos()}
                        hasMore={this.state.images.lenght !== this.state.albumLength}
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
                                    <img onClick={() => this.setDisplay(true, i) } key={ i + 1} alt={ `G+R_Wedding${i + 1}` } src={'/images/weddingAlbum/Full/'+ image}/>
                                </div>
                                ))
                            : ""}
                        </div>
                    </InfiniteScroll>
                </div>
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
  
  export default withRouter(connect(mapStateToProps,null)(Photos));