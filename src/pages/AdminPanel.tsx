import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchPosts, deletePost } from '../redux/slices/postsSlice'
import { AppDispatch } from '../redux/store'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth, usePosts } from '../hooks'

import { FaEdit } from 'react-icons/fa'
import { MdDeleteForever } from 'react-icons/md'

function AdminPanel() {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { posts, loading, error } = usePosts()
  const { isAuthenticated, isAdmin } = useAuth()

  useEffect(() => {
    if (isAuthenticated && isAdmin) {
      dispatch(fetchPosts())
    }
  }, [dispatch, isAuthenticated, isAdmin])

  if (!isAuthenticated || !isAdmin) {
    return (
      <div className="flex flex-col gap-16 items-center justify-center h-screen">
        <h2 className="text-9xl">&#x25D5; &#xFE35; &#x25D5;</h2>
        <h2 className="text-3xl">Acesso negado</h2>

        <button
          type="button"
          onClick={() => navigate('/')}
          className="mt-4 text-blue-500 underline"
        >
          Voltar para a lista de posts
        </button>
      </div>
    )
  }

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
