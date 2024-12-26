import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks'
import PostForm from '../components/PostForm'

const CreatePost: React.FC = () => {
  const navigate = useNavigate()
  const { isAuthenticated, isAdmin, user } = useAuth()

  const handleCreatePost = async (formData: {
    title: string
    content: string
    author: string
  }) => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(formData),
    })
    if (!response.ok) {
      throw new Error('Erro ao criar postagem.')
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

  return (
    <div className="container w-dvw mx-auto max-w-2xl p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Criar Postagem</h1>
      <PostForm
        initialData={{
          title: '',
          content: '',
          author: user?.name || '',
        }}
        onSubmit={handleCreatePost}
        readOnlyAuthor
        successMessage="Postagem criada com sucesso!"
      />
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
