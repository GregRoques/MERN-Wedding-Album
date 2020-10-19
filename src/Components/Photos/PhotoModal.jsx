import React from 'react';
import cssPhotoModal from './photos.module.css'

const PhotoModal = props => {
    const { images, rightClick, leftClick, closeModal, isShown } = props;
    return  isShown ? (
        <div className= { cssPhotoModal.photoModal } >
        <div className={ cssPhotoModal.closePhotoModal } onClick={()=> closeModal(false, null)}>x</div>
        <div className ={ cssPhotoModal.photoContent}>
            <div className={ cssPhotoModal.imageGalleryButtons } onClick={()=>leftClick(image, )}>{`<`}</div>
            <div className={ cssPhotoModal.sliderContainer }>
                <img alt={image } src={ image }/>
            </div>
            <div className={ cssPhotoModal.imageGalleryButtons } onClick={()=>rightClick(image, )}>{`>`}</div>
        </div>
        <div className ={ cssPhotoModal.pictureCounter }>
            { image +1 }/{ photoArray[].length }
        </div>
    </div>
    ) : ""
}

export default PhotoModal;