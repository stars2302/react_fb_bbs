import React, { useEffect, useState } from "react";
//https://firebase.google.com/docs/firestore/manage-data/add-data?hl=ko&authuser=0
// firebase 값 추가 참조사이트
import { collection, addDoc, serverTimestamp, query, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import Post from "../components/Post";
import { getStorage, ref,uploadString ,getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from "react-router-dom";


const Home = ({userObj})=> {
  const [post,setPost] = useState('');
  const [posts,setPosts] = useState([]);
  const [attachment,setAttachment] = useState(); //이미지 //기본값 undefined
  const [attachmentUrl,setAttachmentUrl] = useState('');
  const navigate = useNavigate();
  // const [inputFile, setInputFile] = useState();
  

  const onChange = (e)=>{
    // const value = e.target.value; //ECMA script 2012인가... 무튼 ES6이전 문법임
    const {target:{value}} = e;
    setPost(value);
  }


  //await은 async(비동기)방식이라 async를 앞에 붙여야 됨 
  const onSubmit = async (e)=>{
    e.preventDefault();

    //참조만들기 및 파일업로드
    const storage = getStorage();
    const storageRef = ref(storage, `${userObj}/${uuidv4()}`);

    uploadString(storageRef, attachment, 'data_url').then(async (snapshot) => {
      // setAttachmentUrl();
      // console.log(attachment);
      let attachmentUrl = await getDownloadURL(storageRef); 
      try{
        //await setDoc(doc(db, "cities", "new-city-id"), data);
        //await setDoc(doc(firebase.js에서 추출한, "컬렉션이름","문서이름"),넣을 데이터);
        await addDoc(collection(db, "posts"), {
          content: post,
          date: serverTimestamp(), //오늘 날짜 시분초 - firebase지원 firebase최고!
          uid: userObj,
          attachmentUrl
        });
        attachmentUrl = '';
        
      } catch(error){
        console.log(error);
      }
    });


    /*
    //에러확인하기!
    try{
      할일
    } catch(e){
      에러
    }
    */

    
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
  
  const conFileChange = (e)=>{
    console.log(e.target.files[0]);//첨부파일정보
    const {target:{files}} = e;
    const theFile = files[0];
    const reader = new FileReader(); //filefeader를 사용할 수 있도록 객체 생성

    //onloadend - 로드가 끝나면~
    reader.onloadend = (e)=>{
      setAttachment(e.target.result);
    }
    reader.readAsDataURL(theFile); //엄청 긴... 문자열로 절대경로..? 만들어서 반환해주는듯..
  }

  const onFileClear = ()=>{
    setAttachment(null);
    // document.querySelector('#attachment').value = null;
  }





  //input의 attribute accept는 파일형식을 지정할 수 있음!!
  //https://developer.mozilla.org/ko/docs/Web/API/FileReader/readAsDataURL 파일 미리보기 filereader mdn
  return(
    <div>
      <form onSubmit={onSubmit}>
        <p>
          <label htmlFor="content">내용: </label>
          <input type="text" name="" placeholder="포스트 쓰기" onChange={onChange} value={post}/>
        </p>
        <p>
          <label htmlFor="attachment">첨부이미지: </label>
          <input type="file" accept="images/*" onChange={conFileChange} />
          {attachment && 
            <>
              <img src={attachment} alt="" width="250"/>
              <button type="button" onClick={onFileClear}>이미지취소</button>
            </>
          }
        </p>
        <button>입력</button>
      </form>
      <ul>
        {
          posts.map(item=><Post key={item.id} postObj={item} userConfirm={item.uid === userObj}/>)
        }
      </ul>
    </div>
  )
} //comp Home



export default Home;