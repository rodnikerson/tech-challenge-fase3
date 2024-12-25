import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from './redux/store'

const CreatePost: React.FC = () => {
  const navigate = useNavigate()
  const user = useSelector((state: RootState) => state.auth.user)
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  )

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: user?.name || '',
  })
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<boolean>(false)

  const isAdmin = user?.role === 'ADMIN'

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    const titleWords = formData.title.trim().split(/\s+/)
    const contentLength = formData.content.trim().length

    if (titleWords.length < 2) {
      setError('O título deve conter pelo menos duas palavras.')
      return
    }

    if (contentLength < 100) {
      setError('O conteúdo inserido é muito curto. Aprimore-o.')
      return
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/posts`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify(formData),
        }
      )

      if (!response.ok) {
        throw new Error('Erro ao criar postagem.')
      }

      setSuccess(true)
      setFormData({ title: '', content: '', author: user?.name || '' })
    } catch (err: any) {
      console.error('Erro ao criar postagem:', err.message)
      setError(err.message)
    }
  }

  return (
    <div className="container w-dvw mx-auto max-w-2xl p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Criar Postagem</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-300">Título</label>
          <input
            type="text"
            name="title"
            placeholder="Digite o título"
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
            placeholder="Digite o conteúdo"
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
            className="w-full p-2 border rounded text-black bg-gray-300 font-semibold"
          />
        </div>

        {error && <p className="text-red-500">{error}</p>}
        {success && (
          <p className="text-green-500">Postagem criada com sucesso!</p>
        )}

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
        >
          Criar Postagem
        </button>
      </form>

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

export default CreatePost
