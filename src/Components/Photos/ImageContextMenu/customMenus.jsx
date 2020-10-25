export const GalleryContextMenu = ({image}) =>(
    <ul>
        <li><a download={`/images/weddingAlbum/full/${image}`}>
            Save Hi-Res
        </a></li>
        <li><a download={`/images/weddingAlbum/web/med_${image}`}>
            Save Med-Res
        </a></li> 
    </ul>
);

export const SinglePhotoConextMenu = ({image}) =>(
    <ul>
        <li><a download={`/images/weddingAlbum/full/${image}`}>
            Save Hi-Res
        </a></li>
        <li><a download={`/images/weddingAlbum/web/med_${image}`}>
            Save Med-Res
        </a></li> 
    </ul>
);