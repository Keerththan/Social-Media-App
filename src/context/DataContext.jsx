import { createContext, useState, useEffect } from 'react';
import useAxiosFetch from '../hooks/useAxiosFetch';
import useWindowSize from '../hooks/useWindowSize';
import { Routes,Route,Link, useNavigate} from 'react-router-dom'
import Post from '../Post'


const DataContext = createContext({});

export const DataProvider = ({ children }) => {

    const [posts, setPosts] = useState([])
  
  const [search,setSearch]=useState('')
  const [searchResults,setSearchResults]=useState([])
  const [postTitle, setPostTitle] = useState('')
  const [postBody, setPostBody] = useState('')
  const [editTitle, setEditTitle] = useState('')
  const [editBody, setEditBody] = useState('')
  const {width}=useWindowSize()
  const {data,fetchError,isLoading}=useAxiosFetch('http://localhost:3500/posts')

  const navigate=useNavigate()

  useEffect(()=>{
  

    setPosts(data)

  },[data] )
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
        <DataContext.Provider value={{
            posts,
            postTitle,
            setPostTitle,
            postBody,
            setPostBody,
            handleSubmit,
            handleDelate,
            handleEdit,
            editTitle,
            setEditTitle,
            editBody,
            setEditBody,
            fetchPosts,
            searchResults,
            search,
            setSearch,
            width,
            isLoading,
            fetchError
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;