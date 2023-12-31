import React from "react";
import { Routes,Route } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Profile from "../routes/Profile"
import Nav from "./Nav";



const AppRouter = ({isLoggedIn,userObj,setUserObj})=>{
  return(
    <>
    {isLoggedIn && <Nav/>}
    <Routes>
      {isLoggedIn ? (
      <>
        <Route path="/" element={<Home userObj={userObj}/>}></Route>
        <Route path="/profile" element={<Profile setUserObj={setUserObj}/>}></Route>
      </>
        ):(
        <Route path="/" element={<Auth/>}></Route>
        )
      }
    </Routes>
    </>
  )
}

export default AppRouter;