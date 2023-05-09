import React, {useState, useEffect} from 'react';
import ImageConverter from '../../components/ImageConverter/ImageConverter';
import "./GalleryPage.css"


function GalleryPage(){
  return (
    <div className='container mt-5 px-4'>
      <div className='col-sm-6 mx-auto '>
        <h5>Bring back the memories or feel the retro vibe</h5>
        <p>Convert your pitures from black-and-white to coloure and vice versa</p>
        <ImageConverter />
      </div>
    </div>
  );
}

export default GalleryPage;