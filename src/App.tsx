import { Routes, Route } from 'react-router-dom'
import Home from './Home'
import PostDetail from './PostDetail'
import Login from './Login'
import CreatePost from './CreatePost'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/post/:postId" element={<PostDetail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/create-post" element={<CreatePost />} />
    </Routes>
  )
}

export default App
