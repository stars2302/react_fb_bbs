import React, { useEffect, useState } from "react";
//https://firebase.google.com/docs/firestore/manage-data/add-data?hl=ko&authuser=0
// firebase 값 추가 참조사이트
import { collection, getDocs, addDoc, serverTimestamp, query, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import Post from "../components/Post";

const Home = ({userObj})=> {
  const [post,setPost] = useState('');
  const [posts,setPosts] = useState([]);
  

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
        date: serverTimestamp(), //오늘 날짜 시분초 - firebase지원 firebase최고!
        uid: userObj
      });
      console.log("Document written with ID: ", docRef.id);
    } catch(error){
      console.log(error);
    }
  }

  /*
  const getPosts = async ()=>{
    const querySnapshot = await getDocs(collection(db, "posts"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      const postObj = {
        ...doc.data(),
        id: doc.id
      }
      setPosts((prev)=>[postObj, ...prev]);
    }); 
  }
  */

  console.log(posts);
  /*
  //전개 연산자를 활용해서 value 커스텀
  const test = {title:'title1', content: 'content1'};
  const testCopy = {...test,title:'title2'};
  console.log(testCopy);
  console.log(test);
  */

  useEffect(()=>{
    const q = query(collection(db, "posts"), orderBy("date"));
    onSnapshot(q, (querySnapshot) => {
      /*
      const posts = [];
      querySnapshot.forEach((doc) => {
        posts.push(doc.data().name);
      });
      */
      
      const postArr = querySnapshot.docs.map((doc)=>({
        id: doc.id,
        ...doc.data()
      }))
      setPosts(postArr);
    });
  },[]);
  console.log(posts);
  
  return(
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" name="" placeholder="포스트 쓰기" onChange={onChange} value={post}/>
        <button>입력</button>
      </form>
      <ul>
        {
          posts.map(item=><Post key={item.id} postObj={item}/>)
        }
      </ul>
    </div>
  )
} //comp Home



export default Home;