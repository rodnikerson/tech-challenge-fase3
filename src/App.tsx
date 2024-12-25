import { Routes, Route } from 'react-router-dom'
import Home from './Home'
import PostDetail from './PostDetail'
import Login from './Login'
import CreatePost from './CreatePost'
import AdminPanel from './AdminPanel'
import './App.css'
import EditPost from './EditPost'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/post/:postId" element={<PostDetail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/create-post" element={<CreatePost />} />
      <Route path="/admin" element={<AdminPanel />} />
      <Route path="/edit-post/:postId" element={<EditPost />} />
    </Routes>
  )
}

export default App
