import React, { useState, useEffect, useContext, useRef } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Input } from '@mui/material';
import "./AddRecipePage.css"
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { Link } from "react-router-dom";

function AddRecipePage(props) {
    const [imagePreviewUrl, setImagePreviewUrl] = useState('');
    const inputRef = useRef(null);

    const handleImageChange = (e) => {
      e.preventDefault();
      let reader = new FileReader();
      let file = e.target.files[0];
        if(file){
            reader.onloadend = () => {
                setImagePreviewUrl(reader.result);
              }
          
              reader.readAsDataURL(file);
        }

    }
    const handlePlaceholderClick = () => {
        inputRef.current.click();
    }

    const renderImagePlaceholder = () => {
        return (
            <div onClick={handlePlaceholderClick} className="image-placeholder">
                <AddPhotoAlternateIcon style={{ fontSize: 60, color: "var(--elder-main-1)" }}/>
                <h6 className="fw-bold text-elder-primary pt-1">Upload a photo of your dish</h6>
            </div>
        )
    }
    return (
        <div className='container mt-5 px-4'>
            <div className='col-sm-6 mx-auto px-1'>
                <h6 className="fw-600">What did you make?</h6>
                <p>Share it with others</p>
                <div className="textarea">
                    <TextField label="Title" fullWidth placeholder="E.g Grandma's chili flakes" variant="outlined" />
                </div>
                

                <Input inputRef={inputRef} type="file" accept="image/*" hidden onChange={handleImageChange} />
                
                <h6 className="mt-4">Add a photo</h6>
                <div className="media mt-3">
                    {imagePreviewUrl ? <img onClick={handlePlaceholderClick} src={imagePreviewUrl} alt="preview" /> : renderImagePlaceholder()}
                </div>

                <h6 className="mt-3">Ingredients</h6>
                <TextareaAutosize
                    className="w-100 p-3 textarea"
                    aria-label="ingredients"
                    placeholder="Type multiple ingredients"
                    minRows={3}
                />
                
                <h6 className="mt-3">Steps</h6>
                <TextareaAutosize
                    className="w-100 p-3 textarea"
                    aria-label="ingredients"
                    placeholder="Divide the recipes into steps"
                    minRows={5}
                />
                <div className='row mt-4'>
                    <div className='col-5 mx-auto'>
                        <Link to="/recipes/add/success" className='mx-auto'>
                            <Button className='rounded-pill' fullWidth variant='contained' >Post
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddRecipePage;
