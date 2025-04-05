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
import { Routes,Route,Link} from 'react-router-dom'
import PostLayout from './PostLayout'






function App() {
  return (
    <div className="App">
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/newpost">NewPost</Link></li>
          <li><Link to="/postpage">PostPage</Link></li>

        </ul>
      </nav>
      <Routes>
        <Route path="/"  element={<Home/>}/>
        <Route path="/about"  element={<About/>}/>
        <Route path="/header"  element={<Header/>}/>
        <Route path="/nav"  element={<Nav/>}/>
        <Route path="/newpost"  element={<NewPost/>}/>
        
        <Route path="/postpage"  element={<PostLayout/>}>
            <Route index element={<PostPage/>}/>
            <Route path=":id"  element={<Post/>}/>
        </Route>
        
        <Route path="/missing"  element={<Missing/>}/>
        <Route path="/footer"  element={<Footer/>}/>
        <Route path="*" element={<Missing/>}/>

      </Routes>
     
    </div>
  )
}

export default App
