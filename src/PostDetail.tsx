import { useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from './redux/store'

function PostDetail() {
  const { postId } = useParams<{ postId: string }>()
  const post = useSelector((state: RootState) =>
    state.posts.posts.find((p) => p.id.toString() === postId)
  )

  if (!post) {
    return (
      <div className="container p-4 max-w-4xl min-h-screen flex flex-col justify-between mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4 text-white p-4">
          Post não encontrado
        </h1>
        <Link to="/" className="text-blue-500 underline self-start">
          Voltar para a lista
        </Link>
      </div>
    )
  }

  return (
    <div className="container p-4 max-w-4xl min-h-screen flex flex-col justify-between mx-auto">
      <div>
        <h1 className="text-4xl font-bold text-white mb-4">{post.title}</h1>
        <p className="text-sm text-gray-400 mb-4">Por: {post.author}</p>
        <p className="text-gray-300 text-justify leading-relaxed">
          {post.content}
        </p>
      </div>
      <Link to="/" className="text-blue-500 mt-4 underline">
        Voltar para a lista
      </Link>
    </div>
  )
}

export default PostDetail
