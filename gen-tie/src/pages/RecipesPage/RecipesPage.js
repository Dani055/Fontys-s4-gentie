import React, { useContext, useState, useMemo, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from '../../StateProvider';
import { Button } from '@mui/material';
import TinderCard from 'react-tinder-card'
import StarIcon from '@mui/icons-material/Star';
import "./RecipesPage.css"
import RecipeInfo from '../../components/RecipeInfo/RecipeInfo';

function RecipesPage() {
  const { recipes, isElder } = useContext(AppContext)
  const [currentRecipeIndex, setCurrentRecipeIndex] = useState(recipes.length - 1)
  const [availableRecipes, setAvailableRecipes] = useState(true)

  const childRefs = useMemo(
    () =>
      Array(recipes.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  )
  const onSwipe = (direction) => {
    console.log('You swiped: ' + direction)
    if(currentRecipeIndex - 1 >= 0){
      setCurrentRecipeIndex(currentRecipeIndex - 1)
    }
    else{
      setAvailableRecipes(false)
    }
  }
  const swipe = async (dir, index) => {
    await childRefs[index].current.swipe(dir)
  }

  return (
    <div className='container mt-4'>
      <div className='col-sm-6 mx-auto'>
        {availableRecipes ? 
        <>
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
                      <img className="profile-image-recipe rounded-circle" src={recipe.user.picture}></img>
                      <p className='ps-2 m-0'>by {recipe.user.name}</p>
                      <div className='d-flex align-items-center ms-auto'>
                      <StarIcon></StarIcon>
                      <p className='m-0 pt-1'>{recipe.rating}/5</p>
                      </div>
                      
                    </div>
                  </div>

                  <Button variant="contained" className="pressable rounded-pill button-recipe-card-left" color='primary' onClick={() => swipe('left', index)}><i className="bi bi-hand-thumbs-down-fill"></i></Button>
                  <Button variant="contained" className="pressable rounded-pill button-recipe-card-right" color='primary' onClick={() => swipe('right', index)}><i className="bi bi-hand-thumbs-up-fill"></i></Button>
                </div>

              </TinderCard>

            ))}
          </div>
        </div>
            {isElder ?
            <div className='row mt-4'>
              <div className='col-5 mx-auto'>
              <Link to="/recipes/add" className='mx-auto'>
                <Button className='rounded-pill' fullWidth variant='contained' >Add recipe
                </Button>
              </Link>
              </div>

            </div>
              
              :
              <RecipeInfo recipe={recipes[currentRecipeIndex]} />}
          </>
          
          : <h3 className='text-center'>No more recipes available</h3>}

      </div>
    </div>
  );
}

export default RecipesPage;