import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { AppDispatch } from './redux/store'
import { fetchPosts } from './redux/slices/postsSlice'
import { useAuth } from './hooks/useAuth'
import { usePosts } from './hooks/usePosts'
import { Loading } from './components/Loading'
import { ErrorAlert } from './components/ErrorAlert'
import { PostNotFound } from './components/PostNotFound'

const EditPost: React.FC = () => {
  const { postId } = useParams<{ postId: string }>()
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const { posts, loading, error } = usePosts()

  const { isAuthenticated, isAdmin } = useAuth()

  const post = posts.find((p) => p.id === postId)

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
  })
  const [success, setSuccess] = useState(false)
  const [localError, setLocalError] = useState<string | null>(null)

  useEffect(() => {
    if (!post) {
      dispatch(fetchPosts())
    } else {
      setFormData({
        title: post.title,
        content: post.content || '',
        author: post.author,
      })
    }
  }, [dispatch, post])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLocalError(null)
    setSuccess(false)

    const titleWords = formData.title.trim().split(/\s+/)
    const contentLength = formData.content.trim().length

    if (titleWords.length < 2) {
      setLocalError('O título deve conter pelo menos duas palavras.')
      return
    }

    if (contentLength < 100) {
      setLocalError('O conteúdo inserido é muito curto. Aprimore-o.')
      return
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/posts/${postId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify(formData),
        }
      )

      if (!response.ok) {
        throw new Error('Erro ao atualizar o post.')
      }

      setSuccess(true)
      navigate('/admin')
    } catch (err: any) {
      setLocalError(err.message)
    }
  }

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

  if (loading) return <Loading />
  if (error) return <ErrorAlert />
  if (!post) return <PostNotFound />

  return (
    <div className="container w-dvw mx-auto max-w-2xl p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Editar Postagem</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-300">Título</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-300">Conteúdo</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            rows={5}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-300">Autor</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            readOnly
            className="w-full p-2 border rounded bg-gray-300 text-black"
          />
        </div>

        {localError && <p className="text-red-500">{localError}</p>}
        {success && (
          <p className="text-green-500">Post atualizado com sucesso!</p>
        )}

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
        >
          Salvar Alterações
        </button>
      </form>

      <button
        type="button"
        onClick={() => navigate('/admin')}
        className="mt-4 text-blue-500 underline"
      >
        Voltar ao Painel
      </button>
    </div>
  )
}

export default EditPost
