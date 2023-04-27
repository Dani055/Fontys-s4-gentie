import React, {useState, useEffect, useContext} from 'react';
import { AppContext } from '../../StateProvider';
import "./HomeElder.css"
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import CreateRequestForm from '../../components/CreateRequestForm/CreateRequestForm';

function HomeElder(){
  const { requests, loggedUser} = useContext(AppContext)
  const [myRequest, setMyRequest] = useState(null)

  useEffect(() => {
    let request = requests.find(obj => obj.user.id === loggedUser.id)
    setMyRequest(request)
  }, [requests]);

  const displaySuccessBox = () => {
    return (
      <>
        <div className="success-box text-center p-3">
          <CheckCircleOutlineIcon style={{ fontSize: 83, color: "var(--elder-main-1)" }} />
          <h6 className="text-elder-primary mt-3">Request submitted</h6>
          <p className="mt-4">We will notify you when someone applies to help you.</p>
        </div>
        <div className='row mt-4'>
          <div className='col-6 mx-auto'>
            {myRequest?.volunteer ? <Link to={"/profile/" + myRequest.volunteer.id} className='mx-auto'>
              <Button className='rounded-pill' fullWidth variant='contained' >View volunteer
              </Button>
            </Link> : <h6 className='text-center'>No volunteer yet</h6>}
            
          </div>
        </div>
      </>
    )
  }

  return (
    <div className='container mt-5 px-4'>
            <div className='col-sm-6 mx-auto pt-5'>
              {myRequest ? displaySuccessBox() : <CreateRequestForm/>}
                
            </div>
        </div>
  );
}

export default HomeElder;