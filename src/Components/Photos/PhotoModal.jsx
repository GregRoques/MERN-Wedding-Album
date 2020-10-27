import React from 'react';
import cssPhotoModal from './photos.module.css'

image={ modalPhoto }
isShown = { modalShow }
nextDirection = { nextPrevImage }
closeModal = { setDisplay }

const PhotoModal = props => {
    const { image, nextDirection, closeModal, isShown, stopAutoDownload, totalLength } = props;
    return  isShown ? (
        <div className= { cssPhotoModal.photoModal } >
        <div className={ cssPhotoModal.closePhotoModal } onClick={()=> closeModal(false, null)}>x</div>
        <div className ={ cssPhotoModal.photoContent}>
            { image !== 0 ?
                <div className={ cssPhotoModal.imageGalleryButtons } onClick={()=>nextDirection(image -1)}>{`<`}</div>
                : ""
            }   
            <div className={ cssPhotoModal.sliderContainer } onDragStart={e=> stopAutoDownload(e)} onContextMenu={e=> stopAutoDownload(e)}>
                <img alt={image } src={ image }/>
            </div>
            { image !== totalLength ?
                <div className={ cssPhotoModal.imageGalleryButtons } onClick={()=>nextDirection(image +1)}>{`>`}</div>
                : ""
            }
        </div>
        <div className ={ cssPhotoModal.pictureCounter }>
            <a href={`/images/weddingAlbum/full${image}`} download>Download</a>
        </div>
    </div>
    ) : ""
}

export default PhotoModal;