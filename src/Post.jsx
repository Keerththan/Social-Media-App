import React from 'react'
import { Link, useParams } from 'react-router-dom'

const Post = ({post}) => {

    const {id} = useParams()
  return (
  <article className="Post">
   <Link to ={`post/${post.id}`}><h2 >{post.title}</h2>
  <p className="postDate">{post.datetime}</p>
  </Link>
  <p className="postBody">{post.body}  </p>



    </article>
    
  )
}

export default Post
