import { useState, useEffect, Dispatch } from "preact/hooks"
import { Post } from "../types/post"
import { StateUpdater } from "preact/hooks"
import { v4 as uuidv4 } from "uuid"

export interface PostApiTypes {
  posts: Post[]
  title: string
  body: string
  editingId: number | null
  setTitle: Dispatch<StateUpdater<string>>
  setBody: Dispatch<StateUpdater<string>>
  createPost: () => Promise<void>
  updatePost: () => Promise<void>
  deletePost: (id: number) => Promise<void>
  resetForm: () => void
  setEditingId: Dispatch<StateUpdater<number | null>>
}

const API_URL = "https://jsonplaceholder.typicode.com/posts"

export const usePosts = (): PostApiTypes => {
  const [posts, setPosts] = useState<Post[]>([])
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [editingId, setEditingId] = useState<number | null>(null)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    const response = await fetch(API_URL)
    const data = await response.json()
    setPosts(data)
  }

  const createPost = async () => {
    console.log("TCL ~ createPost ~ title:", title, "body", body)
    const response = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify({
        title,
        body,
        userId: uuidv4(),
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
    const newPost = await response.json()
    console.log("TCL ~ createPost ~ newPost:", newPost)
    setPosts([newPost, ...posts])
  }

  const updatePost = async () => {
    console.log("TCL ~ updatePost ~ editingId:", editingId)
    const response = await fetch(`${API_URL}/${editingId}`, {
      method: "PUT",
      body: JSON.stringify({
        id: editingId,
        title,
        body,
        userId: 1,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
    const updatedPost = await response.json()
    setPosts(posts.map((post) => (post.id === editingId ? updatedPost : post)))
  }

  const deletePost = async (id: number) => {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    })
    setPosts(posts.filter((post) => post.id !== id))
  }

  const resetForm = () => {
    setTitle("")
    setBody("")
    setEditingId(null)
  }

  return {
    posts,
    title,
    body,
    editingId,
    setTitle,
    setBody,
    createPost,
    updatePost,
    deletePost,
    resetForm,
    setEditingId,
  }
}
