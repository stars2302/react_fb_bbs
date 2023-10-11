//인증관련 page
//https://firebase.google.com/docs/auth/web/start?hl=ko   ++ firebase Auth 참조사이트
//https://firebase.google.com/docs/auth/web/password-auth?hl=ko&authuser=0  ++로그인, 회원가입 참조사이트
import React, { useState } from "react";
import { authService } from "../firebase";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";



const Auth = ()=> {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [newAccount,setNewAccount] = useState(true);
  const [error,setError] = useState('');
  const auth = getAuth();



  const onSubmit = (e)=>{
    e.preventDefault();
    if(newAccount){
      //회원가입
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        setError(errorMessage);
      });

    } else{
      //로그인
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });

    }
  }

  const onChange = (e)=>{
    const {target:{name,value}} = e;

    if(name === 'email'){
      setEmail(value);
    } else{
      setPassword(value);
    }


    if(e.target.name === 'email'){
      setEmail(e.target.value);
    }
  }

  
  return(
    <div>
      <form onSubmit={onSubmit}>
        <input name="email" type="email" placeholder="email" value={email} onChange={onChange}/>
        <input name="password" type="password" placeholder="password" value={password} onChange={onChange}/>
        <button>{newAccount ? "create Account" : "Login in"}</button>
      </form>
      {error}
    </div>
  )
}



export default Auth;