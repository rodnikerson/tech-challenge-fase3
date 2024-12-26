import React from 'react'
import { Link } from 'react-router-dom'

interface PostCardProps {
  id: string
  title: string
  author: string
  content?: string
}

const PostCard: React.FC<PostCardProps> = ({ id, title, author, content }) => {
  return (
    <Link to={`/post/${id}`} className="block">
      <li className="p-4 border rounded shadow-md h-56 flex flex-col justify-between bg-gray-800 text-white">
        <div className="flex flex-col justify-between h-full">
          <h2 className="text-2xl font-semibold mb-2">{title}</h2>
          <p className="text-sm text-gray-400 mb-2">Por: {author}</p>
          <p className="text-gray-300 text-justify">
            {content ? content.substring(0, 100) + '...' : 'Sem descrição.'}
          </p>
        </div>
      </li>
    </Link>
  )
}

export default PostCard
