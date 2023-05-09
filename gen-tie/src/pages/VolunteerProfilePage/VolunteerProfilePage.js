import React, {useState, useEffect, useContext} from 'react';
import { AppContext } from '../../StateProvider';
import { Link, useNavigate, useParams } from 'react-router-dom';
import "./VolunteerProfilePage.css"
import { Button } from '@mui/material';

function VolunteerProfilePage(){
  const { users} = useContext(AppContext)
  const params = useParams()
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

  useEffect(() => {
    let user = users.find(obj => obj.id == params.userId)

    if(!user){
        navigate("/elder/home")
    }
    setUser(user)
  }, []);


  return (
    <div className='container mt-5 px-4'>
            <div className='col-sm-6 mx-auto pt-5'>
              {user &&
                  <div className='profile-box p-4'>
                      <h5 className='text-elder-primary'>Volunteer profile</h5>
                      <div className='row align-items-center g-0 mt-4'>
                        <div className='col-3 media'>
                          <img className='rounded-circle' src={user.picture}></img>
                        </div>
                        <div className='col-9 ps-3'>
                          <h6 className='m-0 pb-1'>{user.name}</h6>
                        </div>
                      </div>
                      <div className='row fw-500 align-items-center text-center g-1 mt-3'>
                        <div className='col'>
                            <p className='m-0 text-black-50'>Phone</p>
                            <p className='m-0'>{user.phone}</p>
                        </div>
                        <div className='col'>
                            <p className='m-0 text-black-50'>Ratings</p>
                            <p className='m-0'>4.5/5</p>
                        </div>
                        <div className='col'>
                            <p className='m-0 text-black-50'>Occupation</p>
                            <p className='m-0'>Student</p>
                        </div>
                     </div>
                    <h6 className='mt-3'>Notes</h6>
                    <p>I will be there in 10 minutes. I will give you a call when I'm in front of the house</p>
                  </div>
              }
              <div className='row mt-4'>
                    <div className='col-6 mx-auto'>
                        <Link to="/elder/home" className='mx-auto'>
                            <Button className='rounded-pill' fullWidth variant='contained' >Back to home
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
  );
}

export default VolunteerProfilePage;