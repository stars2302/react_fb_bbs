import React, { useState } from "react";
//https://firebase.google.com/docs/firestore/manage-data/add-data?hl=ko&authuser=0
// firebase 값 추가 참조사이트
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";


const Home = ()=> {
  const [post,setPost] = useState('');

  const onChange = (e)=>{
    // const value = e.target.value; //ECMA script 2012인가... 무튼 ES6이전 문법임
    const {target:{value}} = e;
    setPost(value);
  }


  //await은 async(비동기)방식이라 async를 앞에 붙여야 됨 
  const onSubmit = async (e)=>{
    e.preventDefault();
    
    /*
    //에러확인하기!
    try{
      할일
    } catch(e){
      에러
    }
    */

    try{
      //await setDoc(doc(db, "cities", "new-city-id"), data);
      //await setDoc(doc(firebase.js에서 추출한, "컬렉션이름","문서이름"),넣을 데이터);
      const docRef = await addDoc(collection(db, "posts"), {
        content: post,
        date: serverTimestamp() //오늘 날짜 시분초 - firebase지원 firebase최고!
      });
      console.log("Document written with ID: ", docRef.id);
    } catch(error){
      console.log(error);
    }
  }
  
  return(
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" name="" placeholder="포스트 쓰기" onChange={onChange} value={post}/>
        <button>입력</button>
      </form>
    </div>
  )
} //comp Home



export default Home;