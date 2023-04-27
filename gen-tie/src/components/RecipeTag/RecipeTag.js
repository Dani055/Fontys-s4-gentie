import React, { useState, useEffect, useContext } from "react";


function RecipeTag(props) {

    return (
        <div className="col-4">
            <div className="bg-young text-white rounded-pill py-1">
                {props.tag}
            </div>
        </div>
    );
}

export default RecipeTag;
