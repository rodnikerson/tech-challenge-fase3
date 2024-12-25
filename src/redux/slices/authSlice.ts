import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface User {
  name: string
  email: string
  role: 'ADMIN' | 'MEMBER'
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
}

const storedUser = localStorage.getItem('user')
const initialState: AuthState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  isAuthenticated: !!storedUser,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload
      state.isAuthenticated = true
      localStorage.setItem('user', JSON.stringify(action.payload))
    },
    logout: (state) => {
      state.user = null
      state.isAuthenticated = false
      localStorage.removeItem('user')
      localStorage.removeItem('token')
    },
  },
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer
