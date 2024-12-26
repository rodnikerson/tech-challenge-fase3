import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { fetchPosts, deletePost, addPost } from '../redux/slices/postsSlice'
import { useCallback } from 'react'

export const usePosts = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { posts, loading, error } = useSelector((state: RootState) => state.posts)

  const getPosts = useCallback(() => {
    dispatch(fetchPosts())
  }, [dispatch])

  const removePost = useCallback((postId: string) => {
    dispatch(deletePost(postId))
  }, [dispatch])

  const createNewPost = useCallback(
    (postData: any) => {
      dispatch(addPost(postData))
    },
    [dispatch]
  )

  return {
    posts,
    loading,
    error,
    getPosts,
    removePost,
    createNewPost,
  }
}
