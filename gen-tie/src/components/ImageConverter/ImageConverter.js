import React, { useState, useEffect, useRef } from 'react';
import coloredImage from "../../images/colorized-image.jpg"
import { Input } from '@mui/material';
import Button from '@mui/material/Button';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import DownloadIcon from '@mui/icons-material/Download';
import "./ImageConverter.css"

function ImageConverter() {
  const [image, setImage] = useState(null);
  const [convertedImage, setConvertedImage] = useState(null);
  const [mode, setMode] = useState('color');
  const inputRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleModeChange = (event) => {
    setMode(event.target.value);
    console.log(event.target.value)
  };

  const handleConvert = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = image
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      if(mode === 'bw'){
        for (let i = 0; i < data.length; i += 4) {
            const brightness = (3 * data[i] + 4 * data[i + 1] + data[i + 2]) / 8;
            data[i] = brightness;
            data[i + 1] = brightness;
            data[i + 2] = brightness;
        }
        ctx.putImageData(imageData, 0, 0);
      
        setConvertedImage(canvas.toDataURL());
      }
      else{
        setConvertedImage(coloredImage)
      }
      
      
    };
  };
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = convertedImage;
    link.download = 'converted-image.png';
    link.click();
  };

  const handlePlaceholderClick = () => {
    inputRef.current.click();
  }



  return (
    <div> 
      <Input inputRef={inputRef} type="file" accept="image/*" hidden onChange={handleImageUpload} />

      {image && (
        <div className='media'>
          <img src={image} onClick={handlePlaceholderClick} alt="Uploaded Image" />
          <Select
            id="picture-type-select"
            className='mt-3'
            value={mode}
            fullWidth
            onChange={handleModeChange}
          >
            <MenuItem value="color">Color</MenuItem>
            <MenuItem value="bw">Black & White</MenuItem>
          </Select>
          <div className='row mt-4'>
            <div className='col-5 mx-auto'>
              <Button className='rounded-pill' onClick={handleConvert} fullWidth variant='contained' >Convert</Button>
            </div>
          </div>

          {convertedImage && (
            <div className='mt-3'>
              <p className='text-center'><KeyboardDoubleArrowDownIcon style={{ fontSize: 60 }}/></p>
              <h5>Yey, you did it</h5>
              <p>Save it and show it to your friends and family</p>

              <img src={convertedImage} alt="ConvertedImage" />
              <div className='row mt-4'>
                <div className='col-7 mx-auto'>
                  <Button className='rounded-pill' onClick={handleDownload} fullWidth variant='contained' >Save to gallery<DownloadIcon/></Button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      {!image && <div onClick={handlePlaceholderClick} className="image-placeholder-grey">
        <AddPhotoAlternateIcon style={{ fontSize: 60 }} />
        <h6 className="fw-bold pt-1">Upload your photo</h6>
      </div>
      }
    </div>
  );
  
}

export default ImageConverter;