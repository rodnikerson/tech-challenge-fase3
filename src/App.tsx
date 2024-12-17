import { Routes, Route } from 'react-router-dom'
import Home from './Home'
import PostDetail from './PostDetail'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/post/:postId" element={<PostDetail />} />
    </Routes>
  )
}

export default App
