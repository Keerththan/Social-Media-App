import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'


const EditPost = ({posts,handleEdit,editTitle,setEditTitle,editBody,setEditBody}) => {
    const {id} = useParams()
    const post = posts.find(post => (post.id).toString() === id);
   
    useEffect(() => {
        if (post) {
          setEditTitle(post.title);
          setEditBody(post.body);
        }
      }, [post]);
    if (!post) {
        return <h2>⚠️ Post Not Found</h2>;
      }
    

  return (
   
           <main className="NewPost">
       
          <form className="newPostForm" onSubmit={(e)=>handleEdit(e,id)}>
              <label htmlFor="postTitle">Title:</label>
              <input
                  id="postTitle"
                  type="text"
                  required
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
              />
              <label htmlFor="postBody">Post:</label>
              <textarea
                  id="postBody"
                  required
                  value={editBody}
                  onChange={(e) => setEditBody(e.target.value)}
              />
              <button type="submit">Update</button>
          </form>
          </main>
          
     
      
 
  )
}

export default EditPost
