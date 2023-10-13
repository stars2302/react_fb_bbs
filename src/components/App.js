import React, { useEffect, useState } from "react";
import AppRouter from './Router';
import { getAuth, onAuthStateChanged } from "firebase/auth";
//https://firebase.google.com/docs/auth/web/manage-users?hl=ko&authuser=0#web-modular-api  ++로그인 유무 참조사이트


function App() {
  const [init,setInit] = useState(false);
  const [userObj,setUserObj] = useState(null);

  useEffect(()=>{
    const auth = getAuth();


      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUserObj(user.uid);
        }
        setInit(true);
      });
    
  },[]);

  console.log(userObj);


  // Boolean(값) == isset? 비슷한듯. 값이 있으면 true, 없으면 false
  return (
    <>
      {init ? 
        <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} setUserObj={setUserObj}/>
        : "회원정보 확인중..."
      }
    </>
  )
}

export default App;
