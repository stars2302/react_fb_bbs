import React, { useEffect, useState } from "react";
import AppRouter from './Router';
import { getAuth, onAuthStateChanged } from "firebase/auth";
//https://firebase.google.com/docs/auth/web/manage-users?hl=ko&authuser=0#web-modular-api  ++로그인 유무 참조사이트


function App() {
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  const [init,setInit] = useState(false);

  useEffect(()=>{
    const auth = getAuth();


      onAuthStateChanged(auth, (user) => {
        if (user) {
          setIsLoggedIn(true);
          console.log(user); //로그인한 유저 정보
        } else {
          setIsLoggedIn(false);
        }
        setInit(true);
      });
    
  },[]);

  return (
    <>
      {init ? 
        <AppRouter isLoggedIn={isLoggedIn}/>
        : "회원정보 확인중..."
      }
    </>
  )
}

export default App;
