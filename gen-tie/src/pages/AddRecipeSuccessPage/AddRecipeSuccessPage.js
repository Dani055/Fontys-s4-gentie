import React, { useState, useEffect, useContext, useRef } from "react";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import "./AddRecipeSuccessPage.css"
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

function AddRecipeSuccessPage(props) {

    return (
        <div className='container mt-5 px-4'>
            <div className='col-sm-6 mx-auto pt-5'>
                <div className="success-box text-center p-3">
                    <CheckCircleOutlineIcon style={{ fontSize: 83, color: "var(--elder-main-1)" }}/>
                    <h6 className="text-elder-primary mt-3">Recipe posted!</h6>
                    <p className="mt-4">Thank you for posting your delicious dish. Sharing is caring!</p>
                </div>
                <div className='row mt-4'>
                    <div className='col-6 mx-auto'>
                        <Link to="/recipes" className='mx-auto'>
                            <Button className='rounded-pill' fullWidth variant='contained' >Back to recipes
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddRecipeSuccessPage;
