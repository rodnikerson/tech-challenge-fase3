import { TbFaceIdError } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'

export const ErrorAlert: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="w-[75%] flex-center">
      <div className="h-full w-full flex flex-col items-center space-y-4">
        <TbFaceIdError className="w-[2.5rem] h-[2.5rem]" />
        <p>Algo inesperado aconteceu. Tente novamente mais tarde.</p>
      </div>
      <button
        type="button"
        onClick={() => navigate('/')}
        className="mt-4 text-white-500 underline"
      >
        Voltar para a lista de posts
      </button>
    </div>
  )
}
