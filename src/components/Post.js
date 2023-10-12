import React from "react";

const Post = ({postObj})=>(
  <li>
    <h4>{postObj.content}</h4>
    <button>Delete</button>
    <button>Edit</button>
  </li>

  )

export default Post;