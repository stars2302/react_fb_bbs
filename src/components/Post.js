import React from "react";

const Post = ({postObj,userConfirm})=>(
  <li>
    <h4>{postObj.content}</h4>
    { userConfirm && (
      <>
    <button>Delete</button>
    <button>Edit</button>
    </>
    )
    }
  </li>

  )

export default Post;