import React from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";



const Profile = ({setUserObj})=> {
  const auth = getAuth();
  const navigate = useNavigate();
  
  const onLogoutClick = ()=> {
    // authService.signOut(); ;
    signOut(auth).then(() => {
      setUserObj(null);
      navigate('/');
    }).catch((error) => {
      console.log(error);
    });
  }

  return(
    <>
      <button onClick={onLogoutClick}>로그아웃</button>
    </>
  )
}



export default Profile;