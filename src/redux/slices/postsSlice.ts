import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

interface Post {
  id: string
  slug: string
  title: string
  content?: string
  author: string
  publishedAt?: string
  createdAt: string
  updatedAt: string
}

interface PostsState {
  posts: Post[]
  loading: boolean
  error: string | null
}

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: null,
}

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/posts`)
      if (!response.ok) throw new Error('Erro ao buscar posts.')
      return (await response.json()) as Post[]
    } catch (error) {
      return rejectWithValue('Erro ao carregar os posts\n\n' + error)
    }
  }
)

export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (postId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/posts/${postId}`,
        {
          method: 'DELETE',
        }
      )
      if (!response.ok) {
        if (response.status === 404) throw new Error('Post não encontrado')
        throw new Error('Erro ao excluir o post')
      }
      return postId
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.posts.push(action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false
        state.posts = action.payload
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

      .addCase(deletePost.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false
        state.posts = state.posts.filter((post) => post.id !== action.payload)
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { addPost } = postsSlice.actions

export default postsSlice.reducer
