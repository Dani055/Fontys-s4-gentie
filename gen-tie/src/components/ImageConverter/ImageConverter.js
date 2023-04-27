import React, { useState, useEffect, useRef } from 'react';
import coloredImage from "../../images/colorized-image.jpg"

function ImageConverter() {
  const [image, setImage] = useState(null);
  const [convertedImage, setConvertedImage] = useState(null);
  const [mode, setMode] = useState('color');

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

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {image && (
        <div className='media'>
          <img src={image} alt="Uploaded Image" />
          <select value={mode} onChange={handleModeChange}>
            <option value="color">Color</option>
            <option value="bw">Black & White</option>
          </select>
          <button onClick={handleConvert}>Convert</button>
          {convertedImage && (
            <div>
              <img src={convertedImage} alt="ConvertedImage" />
              <button onClick={handleDownload}>Download Image</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
  
}

export default ImageConverter;