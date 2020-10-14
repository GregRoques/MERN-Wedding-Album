import React, { Component } from 'react';
import cssPhotos from './photos.module.css'

// div scroll end for photos:
// https://stackoverflow.com/questions/45585542/detecting-when-user-scrolls-to-bottom-of-div-with-react-js

var photoArray = {}

class Photos extends Component{

    state = {
        modalShow: false,
        modalPhoto: null
        
    }

    componentDidMount(){
        window.scrollTo(0, 0);
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

    preventDragHandler = (e) => {
        e.preventDefault();
      }

    handleScroll = e => {
        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        if (bottom) { 
            console.log("bottom")
        }
     }


    render(){

        var currentPathname =((window.location.pathname).split('/photography/').pop()).replace(/["_"]/g, " ");
        let modalPhotoGallery = null

        if(this.state.modalShow){
            modalPhotoGallery=(
                <div className= { cssPhotos.photoModal } >
                    <div className={ cssPhotos.closePhotoModal } onClick={()=> this.pictureDisplayOff()}>x</div>
                    <div className ={ cssPhotos.photoContent}>
                        <div className={ cssPhotos.imageGalleryButtons } onClick={()=>this.clickL(this.state.modalPhoto, currentPathname)}>{`<`}</div>
                        <div className={ cssPhotos.sliderContainer } onContextMenu={this.preventDragHandler} onDragStart={this.preventDragHandler}>
                            <img alt={ currentPathname + this.state.modalPhoto } src={'/images/photography/' + photoArray[currentPathname][this.state.modalPhoto] }/>
                        </div>
                        <div className={ cssPhotos.imageGalleryButtons } onClick={()=>this.clickR(this.state.modalPhoto, currentPathname)}>{`>`}</div>
                    </div>
                    <div className ={ cssPhotos.pictureCounter }>
                        { this.state.modalPhoto +1 }/{ photoArray[currentPathname].length }
                    </div>
                </div>
            )
        }
        
        return(
            <div className = { cssPhotos.fadeIn }>
                { modalPhotoGallery }
                <h1 className = {cssPhotos.albumTitleText}>{currentPathname}</h1>
                <div className = { cssPhotos.photoGalleryContainer } onScroll={(e) => this.handleScroll(e)}>
                    <div className = { cssPhotos.photoGrid } >
                        { photoArray[currentPathname].map((image, i) => {
                            return(
                                <div key={ i } className={cssPhotos.photoBox} onContextMenu={this.preventDragHandler} onDragStart={this.preventDragHandler}>
                                    <img onClick={() => this.pictureDisplayOn(i) } alt={ currentPathname + i } src={'/images/photography/'+ image}/>
                                </div>
                            )
                        }) } 
                    </div>
                </div>
            </div>
        )
        
    }
}


export default Photos;