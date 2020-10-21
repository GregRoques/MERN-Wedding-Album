import React from 'react';
import cssPhotoModal from './photos.module.css'

image={ modalPhoto }
isShown = { modalShow }
rightClick = { nextPrevImage }
leftClick = { nextPrevImage }
closeModal = { setDisplay }
totalLength = { albumLength }

const PhotoModal = props => {
    const { image, totalLength, rightClick, leftClick, closeModal, isShown } = props;
    return  isShown ? (
        <div className= { cssPhotoModal.photoModal } >
        <div className={ cssPhotoModal.closePhotoModal } onClick={()=> closeModal(false, null)}>x</div>
        <div className ={ cssPhotoModal.photoContent}>
            { image !== 0 ?
                <div className={ cssPhotoModal.imageGalleryButtons } onClick={()=>leftClick(image -1)}>{`<`}</div>
                : ""
            }   
            <div className={ cssPhotoModal.sliderContainer }>
                <img alt={image } src={ image }/>
            </div>
            { image !== totalLength ?
                <div className={ cssPhotoModal.imageGalleryButtons } onClick={()=>rightClick(image +1)}>{`>`}</div>
                : ""
            }
        </div>
        <div className ={ cssPhotoModal.pictureCounter }>
            { image +1 }/{ totalLength }
        </div>
    </div>
    ) : ""
}

export default PhotoModal;