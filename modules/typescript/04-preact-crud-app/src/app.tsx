import { h } from "preact";
import "./app.css";
import { PostForm } from "./components/PostForm";
import { PostItem } from "./components/PostItem";
import { usePosts } from "./hooks/usePosts";
import { Post } from './types/post';

export const CrudApp = () => {
  const {
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
    setEditingId
  } = usePosts();

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    if (editingId) {
      await updatePost();
    } else {
      await createPost();
    }
    resetForm();
  };

  const handleEdit = (post: Post) => {
    setEditingId(post.id);
    setTitle(post.title);
    setBody(post.body);
  };

  return (
    <div className="container">
      <h1>Preact CRUD App</h1>
      <PostForm
        title={title}
        body={body}
        setTitle={setTitle}
        setBody={setBody}
        handleSubmit={handleSubmit}
        handleCancel={resetForm}
        isEditing={!!editingId}
      />
      <h2>Posts</h2>
      <ul className="post-list">
        {posts.map((post) => (
          <PostItem
            key={post.id}
            post={post}
            onEdit={handleEdit}
            onDelete={deletePost}
          />
        ))}
      </ul>
    </div>
  );
};
