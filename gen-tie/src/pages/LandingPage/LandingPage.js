import React, {useContext, useState, useMemo, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import { AppContext } from '../../StateProvider';
import Button from '@mui/material/Button';
import TinderCard from 'react-tinder-card'

function LandingPage(){
    const {isElder, setIsElder, setLoggedUser, recipes} = useContext(AppContext)

    const navigate = useNavigate();

    const childRefs = useMemo(
      () =>
        Array(recipes.length)
          .fill(0)
          .map((i) => React.createRef()),
      []
    )

    const confirmYoung = () => {
        setIsElder(false)
        setLoggedUser({
          name: "Josh Sevens",
          picture: "https://media.licdn.com/dms/image/C5603AQF9V7rulvhcGw/profile-displayphoto-shrink_800_800/0/1648538863146?e=2147483647&v=beta&t=adF9VspgE-A8s_PnLvt8pjs3D6MpbZrcM5FQInUnvAA"
        })
        navigate("/young/home")
    };
    const confirmElder = () => {
        setIsElder(true)
        setLoggedUser({
          name: "Bold Boelaars",
          picture: "https://upload.wikimedia.org/wikipedia/commons/5/54/Angry_Grandpa_-_2015_%28cropped%29.jpg"
        })
        navigate("/elder/home")
    };

    const onSwipe = (direction) => {
      console.log('You swiped: ' + direction)
    }
    const swipe = async (dir, index) => {
      await childRefs[index].current.swipe(dir)
    }

  return (
    <div>
      <Button variant="contained" onClick={confirmYoung}>Young</Button>
      <Button variant="outlined" onClick={confirmElder}>Elder</Button>
      <div className='cardContainer container'>
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
                className='recipe-card p-2'
              >
                <h3>{recipe.name}</h3>
                <button className="pressable button-recipe-card-left" onClick={() => swipe('left', index)}>Swipe left!</button>
                <button className="pressable button-recipe-card-right" onClick={() => swipe('right', index)}>Swipe right!</button>
              </div>

            </TinderCard>
          ))}
        </div>

      </div>
      
    </div>
  );
}

export default LandingPage;