import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchPosts } from './redux/slices/postsSlice'
import { RootState, AppDispatch } from './redux/store'

function Home() {
  const dispatch = useDispatch<AppDispatch>()
  const { posts, loading, error } = useSelector(
    (state: RootState) => state.posts
  )
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch])

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

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

      {loading && <p className="text-center text-lg">Carregando posts...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <ul className="flex flex-col space-y-4">
        {filteredPosts.map((post) => (
          <Link to={`/post/${post.id}`}>
            <li
              key={post.id}
              className="p-4 border rounded shadow-md h-56 flex flex-col justify-between bg-gray-800 text-white"
            >
              <div className="flex flex-col justify-between h-full">
                <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
                <p className="text-sm text-gray-400 mb-2">Por: {post.author}</p>
                <p className="text-gray-300 text-justify">
                  {post.content
                    ? post.content.substring(0, 100) + '...'
                    : 'Sem descrição.'}
                </p>
              </div>
            </li>
          </Link>
        ))}
      </ul>

      {!loading && filteredPosts.length === 0 && (
        <p className="text-center text-lg">Nenhum post encontrado.</p>
      )}
    </div>
  )
}

export default Home
