import { BrowserRouter, Route, Routes } from 'react-router-dom'
window.global = window;
import './App.css'
import SignIn from './pages/Signin'
import Signup from './pages/Signup'
import Home from './pages/Home'
import { Blogs } from './pages/Blogs'
import { BlogPost } from './pages/BlogPost'
import { Publish } from './pages/Publish'
import Subscription from './pages/Subscription';
// import Blog from './pages/Blog'

function App() {


  return (
    <>
     <BrowserRouter>
     <Routes>
       <Route path="/signin" element={<SignIn />} />
       <Route path="/signup" element={<Signup  />} />
       <Route path="/" element={<Home />} />
       <Route path="/subscription" element={<Subscription />} />
       <Route path="/blogs" element={<Blogs />} />
       <Route path="/blog/:id" element={<BlogPost />} />
       <Route path="/publish" element={<Publish />} />
      </Routes>
     </BrowserRouter>

    </>
  )
}

export default App
