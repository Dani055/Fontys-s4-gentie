import React, { useContext, useState, useMemo, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { AppContext } from '../../StateProvider';
import { IconButton } from '@mui/material';
import { Button } from '@mui/material';
import TinderCard from 'react-tinder-card'
import StarIcon from '@mui/icons-material/Star';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import "./RecipesPage.css"

function RecipesPage() {
  const { recipes } = useContext(AppContext)

  const childRefs = useMemo(
    () =>
      Array(recipes.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  )
  const onSwipe = (direction) => {
    console.log('You swiped: ' + direction)
  }
  const swipe = async (dir, index) => {
    console.log("here")
    await childRefs[index].current.swipe(dir)
  }

  return (
    <div className='container mt-4'>
      <div className='col-sm-6 mx-auto'>
        <div className='cardContainer'>
          <div className='position-relative'>
            {recipes.map((recipe, index) => (
              <TinderCard
                ref={childRefs[index]}
                className='swipe'
                key={recipe.name}
                onSwipe={onSwipe}
                preventSwipe={['up', 'down']}
                swipeRequirementType='position'
              >
                <div
                  style={{ backgroundImage: 'url(' + recipe.url + ')' }}
                  className='recipe-card p-4'
                >
                  <div className='recipe-creator'>
                    <h5 className='fw-600'>{recipe.name}</h5>
                    <div className='d-flex align-items-center fw-500'>
                      <img className="profile-image-recipe" src={recipe.user.picture}></img>
                      <p className='ps-2 m-0'>by {recipe.user.name}</p>
                      <div className='d-flex align-items-center ms-auto'>
                      <StarIcon></StarIcon>
                      <p className='m-0 pt-1'>{recipe.rating}/5</p>
                      </div>
                      
                    </div>
                  </div>
                  <Button variant="contained" className="pressable button-recipe-card-left" color='primary' onClick={() => swipe('left', index)}><i class="bi bi-hand-thumbs-down-fill"></i></Button>
                  <Button variant="contained" className="pressable button-recipe-card-right" color='primary' onClick={() => swipe('right', index)}><i class="bi bi-hand-thumbs-up-fill"></i></Button>
                </div>

              </TinderCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipesPage;