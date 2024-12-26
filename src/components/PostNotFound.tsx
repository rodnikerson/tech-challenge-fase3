import { Link } from 'react-router-dom'

export const PostNotFound: React.FC = () => (
  <div className="container p-4 max-w-4xl min-h-screen flex flex-col justify-between mx-auto">
    <h1 className="text-4xl font-bold text-center mb-4 text-white p-4">
      Post não encontrado
    </h1>
    <Link to="/" className="text-blue-500 underline self-start">
      Voltar para a lista
    </Link>
  </div>
)
