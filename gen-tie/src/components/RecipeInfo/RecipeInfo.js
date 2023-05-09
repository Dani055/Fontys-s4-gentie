import React, { useState, useEffect, useContext } from "react";
import { AppContext } from '../../StateProvider';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import "./RecipeInfo.css"
import RecipeTag from "../RecipeTag/RecipeTag";

function RecipeInfo(props) {
    const [tabIndex, setTabIndex] = useState('1');

    const handleChange = (event, newValue) => {
        setTabIndex(newValue);
    };
    return (
        <div className="mt-3">
            <TabContext value={tabIndex}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    
                    <TabList centered onChange={handleChange} aria-label="lab API tabs example">

                        <Tab label="Overview" value="1" />
                        <Tab label="Ingredients" value="2" />
                        <Tab label="Guide" value="3" />

                    </TabList>
                </Box>
                <TabPanel value="1">
                    <div className="recipe-tab p-4">
                        <div className="row text-center">
                            <div className="col">
                                <p className="m-0 fw-500">Prep time</p>
                                <p className="m-0">{props.recipe.prepTime}</p>
                            </div>
                            <div className="col">
                                <p className="m-0 fw-500">Cook time</p>
                                <p className="m-0">{props.recipe.cookTime}</p>
                            </div>
                            <div className="col">
                                <p className="m-0 fw-500">Difficulty</p>
                                <p className="m-0">{props.recipe.difficulty}</p>
                            </div>
                        </div>
                        <p className="fw-600 mt-5 mb-1">About</p>
                        <p className="m-0">{props.recipe.about}</p>
                        <p className="fw-600 mt-5">Tags</p>
                        <div className="row g-3 text-center">
                            {props.recipe.tags.map(tag => (
                                <RecipeTag key={tag} tag={tag}/>
                            ))}
                        </div>
                    </div>
                </TabPanel>
                <TabPanel value="2">
                    <div className="recipe-tab p-4">
                        {props.recipe.ingredients.map(ingredient => (
                            <p key={ingredient}>
                                <RestaurantIcon color="primary"/>
                                <span className="ms-2">{ingredient}</span>
                            </p>
                        ))}
                    </div>
                </TabPanel>
                <TabPanel value="3">
                    <div className="recipe-tab p-4">
                        {props.recipe.steps.map((step, index) => (
                            <div key={step}>
                                <h6 className="fw-600">Step {index + 1}</h6>
                                <p>{step}</p>
                            </div>
                        ))}
                    </div>
                </TabPanel>
            </TabContext>
        </div>
    );
}

export default RecipeInfo;
