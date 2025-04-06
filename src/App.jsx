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






function App() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "My First Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. "
    },
    {
      id: 2,
      title: "My 2nd Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit."
    },
    {
      id: 3,
      title: "My 3rd Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit."
    },
    {
      id: 4,
      title: "My Fourth Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing"
    }
  ])
  
  const [search,setSearch]=useState('')
  const [searchResults,setSearchResults]=useState([])
  const [postTitle, setPostTitle] = useState('')
  const [postBody, setPostBody] = useState('')
  const navigate=useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = { id, title: postTitle, datetime, body: postBody };
    const allPosts = [...posts, newPost];
    setPosts(allPosts);
    setPostTitle('');
    setPostBody('');
    navigate('/');
   
  }
  
  useEffect(() => {
    const filteredResults = posts.filter((post) =>
      ((post.body).toLowerCase()).includes(search.toLowerCase())
      || ((post.title).toLowerCase()).includes(search.toLowerCase()));

    setSearchResults(filteredResults.reverse());
  }, [posts, search])

  const handleDelate = (id) => {
    const postsList = posts.filter(post => post.id !== id);
    setPosts(postsList);
    navigate('/');
    
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
      <Route path="*" element={<Missing/>} />

      
  
      
      </Routes>
      <Footer/>  
  
     


      
      

     
    </div>
  )
}

export default App
