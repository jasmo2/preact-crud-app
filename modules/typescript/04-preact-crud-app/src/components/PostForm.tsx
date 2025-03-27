import { h } from "preact";
import { FC } from 'preact/compat';
import { usePostsContext } from "../context/PostsContext";

export const PostForm: FC = () => {
  const {
    title,
    body,
    setTitle,
    setBody,
    handleSubmit,
    resetForm,
    editingId
  } = usePostsContext();

  const handleTitleChange = (e: h.JSX.TargetedEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  }

  const handleBodyChange = (e: h.JSX.TargetedEvent<HTMLTextAreaElement>) => {
    setBody(e.currentTarget.value);
  }

  return (
    <div className="form-container">
      <h2>{editingId ? 'Edit Post' : 'Create Post'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={handleTitleChange}
          className="input"
        />
        <textarea
          placeholder="Body"
          value={body}
          onChange={handleBodyChange}
          className="textarea"
        />
        <button type="submit" className="button button-primary">
          {editingId ? 'Update' : 'Create'}
        </button>
        <button type="button" className="button" onClick={resetForm}>
          Cancel
        </button>
      </form>
    </div>
  );
};
