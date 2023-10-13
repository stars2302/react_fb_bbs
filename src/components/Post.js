import React, { useState } from "react";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { db } from "../firebase";



//await deleteDoc(doc(db, '컬렉션','문서이름')); 문서삭제
//https://firebase.google.com/docs/firestore/manage-data/delete-data?hl=ko&authuser=0


const Post = ({postObj,userConfirm})=>{
  
  const deletePost = async ()=>{
    if(window.confirm('정말로 삭제하시겠습니까?')){
      await deleteDoc(doc(db,'posts',postObj.id));

      //스토리지 이미지파일 삭제
      const storage = getStorage();
      const storageRef = ref(storage, postObj.attachmentUrl);
      deleteObject(storageRef);
    } 



  }
  
  const [edit,setEdit] = useState(false); //수정모드인지 구분
  const [newPost,setNewPost] = useState(postObj.content);
  
  const toggleEditMode = ()=>setEdit((prev)=>!prev);

  const onchange = (e)=>{
    const {target:{value}} = e;
    setNewPost(value);
  }

  const onSubmit = async (e)=>{
    e.preventDefault();
    const postRef = doc(db, "posts", postObj.id);

    await updateDoc(postRef, {
      content: newPost
    });

    setEdit();
  }


  return (
    <li>
      {edit ? 
      (
        <>
        <form onSubmit={onSubmit}>
          <input value={newPost} onChange={onchange} required/>
          <button>업데이트</button>
        </form>
        <button onClick={toggleEditMode}>취소</button>
        </>
      ):(
        <>
        <h4>{postObj.content}</h4>
        {postObj.attachmentUrl && <img src={postObj.attachmentUrl} alt="" width="200"/>}
        { userConfirm && (
          <>
          <button onClick={deletePost}>Delete</button>
          <button onClick={toggleEditMode}>Edit</button>
          </>
        )}
        </>
      )
      }
    </li>
  )
}

export default Post;