import { useParams, Link } from 'react-router-dom'
import { usePosts } from './hooks/usePosts'
import { useEffect } from 'react'
import { Loading } from './components/Loading'
import { ErrorAlert } from './components/ErrorAlert'
import { PostNotFound } from './components/PostNotFound'

function PostDetail() {
  const { postId } = useParams<{ postId: string }>()
  const { posts, loading, error, getPosts } = usePosts()

  useEffect(() => {
    getPosts()
  }, [getPosts])

  const post = posts.find((p) => p.id.toString() === postId)

  if (loading) return <Loading />
  if (error) return <ErrorAlert />
  if (!post) return <PostNotFound />

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
