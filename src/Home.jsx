import React from 'react'
import Feed from './Feed'

const Home = ({posts}) => {
  return (
    <main className="Home">
     
      {posts.length? <Feed posts={posts}/> : <h2>No post here</h2>}

      </main>
    
  )
}

export default Home
