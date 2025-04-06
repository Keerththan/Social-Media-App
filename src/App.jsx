import './App.css'
import About from './About'
import Footer from './Footer'
import Header from './Header'
import Home from './Home'
import Missing from './Missing'
import Nav from './Nav'
import NewPost from './NewPost'
import PostPage from './PostPage'
import Post from './Post'
import { Routes,Route,Link, useNavigate} from 'react-router-dom'
import PostLayout from './PostLayout'
import { use, useState } from 'react'
import { format } from 'date-fns'
import { useEffect } from 'react'
import api from "./api/posts"
import axios from 'axios'
import EditPost from './EditPost'






function App() {
  const [posts, setPosts] = useState([])
  
  const [search,setSearch]=useState('')
  const [searchResults,setSearchResults]=useState([])
  const [postTitle, setPostTitle] = useState('')
  const [postBody, setPostBody] = useState('')
  const [editTitle, setEditTitle] = useState('')
  const [editBody, setEditBody] = useState('')

  const navigate=useNavigate()

  useEffect(()=>{
    

    fetchPosts()

  },[] )
  const fetchPosts= async()=>{

    try{
     const response= await api.get('/posts')
     //const response= await axios.get("http://localhost:3500/posts")
     setPosts(response.data)


    }
    catch(err){

 }
}



  const handleSubmit = async(e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = { id, title: postTitle, datetime, body: postBody };
    try{
      const response= await api.post('/posts', newPost)
      const allPosts = [...posts, newPost];
      setPosts(allPosts);
      setPostTitle('');
      setPostBody('');
      navigate('/');
    }
    catch(err){
      console.log(`Error: ${err.message}`);
    }
    
   
  }
  

  const handleEdit = async(e,id) => {
    e.preventDefault();
   
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const editedPost = { id: Number(id), title: editTitle, datetime, body: editBody };
    try{
      const response= await api.put(`/posts/${id}`, editedPost)
      //const allPosts = [...posts, newPost];
      //setPosts(allPosts);
      setEditTitle('');
      setEditBody('');
      fetchPosts()

      navigate('/');
    }
    catch(err){
      console.log(`Error: ${err.message}`);
    }
    
   
  }


  
  useEffect(() => {
    const filteredResults = posts.filter((post) =>
      ((post.body).toLowerCase()).includes(search.toLowerCase())
      || ((post.title).toLowerCase()).includes(search.toLowerCase()));

    setSearchResults(filteredResults.reverse());
  }, [posts, search])

  const handleDelate = async (id) => {

    try{
      const response= await api.delete(`/posts/${id}` )
      const postsList = posts.filter(post => post.id !== id);
      setPosts(postsList);
      navigate('/');
    }
    catch(err){
      console.log(`Error: ${err.message}`);
    }
  

    
  }

  return (
    <div className="App">

        
      <Header title="PK Social Media"/>
      <Nav 
       search={search}
       setSearch={setSearch}

       />
      
      
      <Routes>
      
      <Route path="/" element={<Home posts={searchResults}/>}/>
      <Route path="/post">
      <Route index element={ <NewPost
        postTitle={postTitle}
        setPostTitle={setPostTitle}
        postBody={postBody}
        setPostBody={setPostBody} 
        handleSubmit={handleSubmit}
      
      />}/>
      <Route path=":id" element={<PostPage posts={posts} handleDelete={handleDelate}/>}/>
 
     
      </Route>

      <Route path="/about" element={<About/>} />
      <Route path="/edit/:id" element={<EditPost
       handleEdit={handleEdit}
       posts={posts}
       editTitle={editTitle}   
      setEditTitle={setEditTitle}
      editBody={editBody}
      setEditBody={setEditBody}
      
      />} />
      <Route path="*" element={<Missing/>} />

      
  
      
      </Routes>
      <Footer/>  
  
     


      
      

     
    </div>
  )
}

export default App
