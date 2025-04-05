import React from 'react'
import { useParams } from 'react-router-dom'

const Post = ({post}) => {

    const {id} = useParams()
  return (
    <article className="Post">
  <h2 >{post.title}</h2>
  <p className="postDate">{post.datetime}</p>
  <p className="postBody">{post.body}  </p>



    </article>
    
  )
}

export default Post
