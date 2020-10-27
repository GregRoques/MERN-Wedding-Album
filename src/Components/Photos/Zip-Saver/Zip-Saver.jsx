import React from 'react';
import cssZip from "./module.zip-saver.css";
import { JSZip } from 'jszip';
import { saveAs } from "file-saver"

const zipFileName = "Greg+Rebecca_Wedding";
const imageDirectory = "/images/weddingAlbum/full";

const zipImages = ({imagesList}) =>{
    let zip = new JSZip();
    let folder = zip.folder('images')
    imagesList.map((image,i)=>{
        folder.file(`${image}`, `${imageDirectory}/${image}`, {base64:true})

        if((i+1) === imagesList.length){
            folder.generateAsync({type:'blob'}).then((content)=> {
                saveAs(content, zipFileName);
             });
        }
    })
    
}

const Zip = ({imagesList, imageListFullLength}) =>{
    return imagesList.length === imageListFullLength ? (
        <div className={cssZip.pdfLink} onClick={()=>zipImages(imagesList)}>
            Download All High-Res Images
        </div>
    ) : ""
}

export default Zip