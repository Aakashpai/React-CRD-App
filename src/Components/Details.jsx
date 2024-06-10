import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const DetailsWrapper = styled.div`
  max-width: 1300px;
  margin: auto;
  padding: 0 20px;
   .container {
      max-width: 600px;
      margin: 0 auto;
    }
    
    h1{
      text-align: center;
    }

    .user-info {
       margin-top: 30px;
    }
    
    .user-info p {
      margin: 10px 0;
    }
`

const Details = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(location?.state?.user || {});
  
  useEffect(() => {
    if (!location.state.user) {
      navigate('/')
    } else {
      setUserDetails(location?.state?.user)
    }
  }, [location?.state?.user])
  
  return (
    <DetailsWrapper>
      <h1>User Information</h1>
      <div className="user-info">
        <p><b>Name: </b>{userDetails?.name}</p>
        <p><b>Email: </b>{userDetails?.email}</p>
        <p><b>Phone: </b>{userDetails?.phone}</p>
        <p><b>Address: </b>{userDetails?.address}</p>
      </div>
    </DetailsWrapper>
  )
}

export default Details