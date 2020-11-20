import React from 'react';
import cssPhotoModal from './photoModal.module.css'

const PhotoModal = props => {
    const { image, nextDirection, closeModal, isShown, stopAutoDownload, totalLength } = props;
    return  isShown ? (
        <div className= { cssPhotoModal.photoModal } >
        <div className={ cssPhotoModal.closePhotoModal } onClick={()=> closeModal(false, null)}>x</div>
        <div className ={ cssPhotoModal.photoContent}>
            <div className={ cssPhotoModal.imageGalleryButtons }>
            { image !== 0 ?
                <div onClick={()=>nextDirection(image -1)}>{`<`}</div>
                : ""
            }   
            </div>
            <div className={ cssPhotoModal.sliderContainer } onDragStart={e=> stopAutoDownload(e)} onContextMenu={e=> stopAutoDownload(e)}>
                <img name={image} alt={image} src={`/images/weddingAlbum/web/med_${image}`}/>
            </div>
            <div className={ cssPhotoModal.imageGalleryButtons }>
                { image !== totalLength ?
                    <div onClick={()=>nextDirection(image +1)}>{`>`}</div>
                    : ""
                }
            </div>
        </div>
        <div className ={ cssPhotoModal.pictureCounter }>
            <a href={`/images/weddingAlbum/full/${image}`} download={image}> <img src='/images/download.png'/></a>
        </div>
    </div>
    ) : ""
}

export default PhotoModal;