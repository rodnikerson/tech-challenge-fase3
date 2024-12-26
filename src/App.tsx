import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import PostDetail from './pages/PostDetail'
import Login from './pages/Login'
import CreatePost from './pages/CreatePost'
import AdminPanel from './pages/AdminPanel'
import EditPost from './pages/EditPost'
import './App.css'

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
