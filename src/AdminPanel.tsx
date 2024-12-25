import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts, deletePost } from './redux/slices/postsSlice'
import { RootState, AppDispatch } from './redux/store'
import { Link } from 'react-router-dom'

import { FaEdit } from 'react-icons/fa'
import { MdDeleteForever } from 'react-icons/md'

function AdminPanel() {
  const dispatch = useDispatch<AppDispatch>()
  const { posts, loading, error } = useSelector(
    (state: RootState) => state.posts
  )

  useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch])

  const handleDelete = (postId: string) => {
    if (window.confirm('Tem certeza de que deseja excluir este post?')) {
      dispatch(deletePost(postId))
        .unwrap()
        .then(() => {
          alert('Post excluído com sucesso!')
        })
        .catch((err) => {
          alert(`Erro ao excluir o post: ${err}`)
        })
    }
  }

  return (
    <div className="container p-4 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-6">
        Painel Administrativo
      </h1>

      {loading && <p className="text-center text-lg">Carregando posts...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="border border-gray-300 p-2">Título</th>
            <th className="border border-gray-300 p-2">Autor</th>
            <th className="border border-gray-300 p-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id} className="text-center">
              <td className="border border-gray-300 p-2">{post.title}</td>
              <td className="border border-gray-300 p-2">{post.author}</td>
              <td className="border border-gray-300 p-2 space-y-2">
                <button className="w-[48px] h-[32px] flex justify-center items-center p-0">
                  <Link to={`/edit-post/${post.id}`} className="py-2 px-4">
                    <FaEdit>Editar</FaEdit>
                  </Link>
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="text-red-500 w-[48px] h-[32px] flex justify-center items-center p-0"
                >
                  <MdDeleteForever>Excluir</MdDeleteForever>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {!loading && posts.length === 0 && (
        <p className="text-center text-lg">Nenhum post encontrado.</p>
      )}
    </div>
  )
}

export default AdminPanel
