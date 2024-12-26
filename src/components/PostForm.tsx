import React, { useState } from 'react'

interface PostFormData {
  title: string
  content: string
  author: string
}

interface PostFormProps {
  initialData: PostFormData
  onSubmit: (formData: PostFormData) => Promise<void>
  readOnlyAuthor?: boolean
  successMessage?: string
}

const PostForm: React.FC<PostFormProps> = ({
  initialData,
  onSubmit,
  readOnlyAuthor = true,
  successMessage = 'Operação realizada com sucesso!',
}) => {
  const [formData, setFormData] = useState<PostFormData>(initialData)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<boolean>(false)

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
      await onSubmit(formData)
      setSuccess(true)
      setFormData({ ...initialData })
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
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
          onChange={handleChange}
          readOnly={readOnlyAuthor}
          className="w-full p-2 border rounded text-black bg-gray-300 font-semibold"
        />
      </div>

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{successMessage}</p>}

      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
      >
        {successMessage === 'Postagem criada com sucesso!'
          ? 'Criar Postagem'
          : 'Salvar Alterações'}
      </button>
    </form>
  )
}

export default PostForm
