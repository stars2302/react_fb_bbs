import React from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";



//await deleteDoc(doc(db, '컬렉션','문서이름')); 문서삭제
//https://firebase.google.com/docs/firestore/manage-data/delete-data?hl=ko&authuser=0


const Post = ({postObj,userConfirm})=>{
  console.log(postObj);
  const deletePost = async ()=>{
    if(window.confirm('정말로 삭제하시겠습니까?')){
      await deleteDoc(doc(db,'posts',postObj.id));
    } 
  }
  
  
  
  return (
    <li>
      <h4>{postObj.content}</h4>
      { userConfirm && (
        <>
        <button onClick={deletePost}>Delete</button>
        <button>Edit</button>
        </>
      )}
    </li>
  )
}

export default Post;