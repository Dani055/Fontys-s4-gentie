import React, {useContext, useState, useMemo, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import { AppContext } from '../../StateProvider';
import Button from '@mui/material/Button';
import TinderCard from 'react-tinder-card'

const db = [
  {
    name: 'Spaghetti carbonara',
    url: 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/recipe-image-legacy-id-1001491_11-2e0fa5c.jpg?resize=768,574'
  },
  {
    name: 'Broccoli',
    url: 'https://domf5oio6qrcr.cloudfront.net/medialibrary/5390/h1218g16207258089583.jpg'
  },
  {
    name: 'Baklava',
    url: 'https://cleobuttera.com/wp-content/uploads/2018/03/lifted-baklava.jpg'
  },
  {
    name: 'Pelmeni',
    url: 'https://upload.wikimedia.org/wikipedia/commons/d/df/Pelmeni_Russian.jpg'
  },
]

function LandingPage(){
    const {isElder, setIsElder} = useContext(AppContext)
    const [currentIndex, setCurrentIndex] = useState(0)
    const navigate = useNavigate();

    useEffect(() => {
      const itemElements = document.querySelectorAll('.recipe-card::before');
      itemElements.forEach((itemElement) => {
        const computedStyle = getComputedStyle(itemElement);
        const backgroundImage = computedStyle.getPropertyValue('background-image');
        itemElement.style.setProperty('--background-image', backgroundImage);
      });
    }, []);

    const childRefs = useMemo(
      () =>
        Array(db.length)
          .fill(0)
          .map((i) => React.createRef()),
      []
    )

    const confirmYoung = () => {
        setIsElder(false)
        navigate("/young/home")
    };
    const confirmElder = () => {
        setIsElder(true)
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
          {db.map((recipe, index) => (
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