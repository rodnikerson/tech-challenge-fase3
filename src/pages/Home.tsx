import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchPosts } from '../redux/slices/postsSlice'
import { AppDispatch } from '../redux/store'
import { usePosts } from '../hooks/usePosts'
import PostCard from '../components/PostCard'
import { Loading } from '../components/Loading'
import { ErrorAlert } from '../components/ErrorAlert'
import { PostNotFound } from '../components/PostNotFound'

function Home() {
  const dispatch = useDispatch<AppDispatch>()
  const { posts, loading, error } = usePosts()
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch])

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) return <Loading />
  if (error) return <ErrorAlert />
  if (!posts) return <PostNotFound />

  return (
    <div className="container p-4 max-w-4xl h-lvh mx-auto">
      <h1 className="text-4xl font-bold text-center mb-4 top-0 text-white p-4">
        Lista de Posts
      </h1>

      <input
        type="text"
        placeholder="Buscar posts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />

      <ul className="flex flex-col space-y-4">
        {filteredPosts.map((post) => {
          const { id, title, author, content } = post

          return (
            <PostCard
              key={id}
              id={id}
              author={author}
              title={title}
              content={content}
            />
          )
        })}
      </ul>
    </div>
  )
}

export default Home
