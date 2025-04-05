import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const PostLayout = () => {
  return (
    <div>
       <Link to="/postpage/1">Post1</Link>
      <br></br>
      <Link to="/postpage/2">Post2</Link>
      <br></br>
      <Link to="/postpage/3">Post3</Link>
  
      <Outlet/>
      
    </div>
  )
}

export default PostLayout
