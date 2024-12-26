import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../redux/slices/authSlice'

const Login: React.FC = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCredentials((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error('Credenciais inválidas.')
      }

      dispatch(login(data.user))

      localStorage.setItem('token', data.token)

      alert('Login realizado com sucesso!')
      navigate('/')
    } catch (err: any) {
      console.error('Erro no login:', err.message)
      setError(err.message)
    }
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white py-5 px-8 border-t-4 border-blue-700 rounded-md shadow-lg w-full max-w-sm">
        <h2 className="text-3xl text-gray-400 mb-3 text-center">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Digite seu e-mail"
              value={credentials.email}
              onChange={handleChange}
              required
              className="w-full p-2 mt-1 text-black bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-700">Senha</label>
            <input
              type="password"
              name="password"
              placeholder="Digite sua senha"
              value={credentials.password}
              onChange={handleChange}
              required
              className="w-full p-2 mt-1 text-black bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="border-none bg-blue-800 py-2 px-3 text-white rounded-md w-full mt-2 hover:bg-blue-700 transition duration-300"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
