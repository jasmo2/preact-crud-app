import { h } from "preact";
import { FC } from 'preact/compat';
import { Dispatch, StateUpdater } from "preact/hooks";

interface PostFormProps {
  title: string;
  body: string;
  setTitle: Dispatch<StateUpdater<string>>;
  setBody: Dispatch<StateUpdater<string>>;
  handleSubmit: (e: Event) => void;
  handleCancel: () => void;
  isEditing: boolean;
}

export const PostForm: FC<PostFormProps> = ({
  title,
  body,
  setTitle,
  setBody,
  handleSubmit,
  handleCancel,
  isEditing
}) => {

  const handleTitleChange = (e: h.JSX.TargetedEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  }

  const handleBodyChange = (e: h.JSX.TargetedEvent<HTMLTextAreaElement>) => {
    setBody(e.currentTarget.value);
  }

  return (
    <div className="form-container">
      <h2>{isEditing ? 'Edit Post' : 'Create Post'}</h2>
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
          {isEditing ? 'Update' : 'Create'}
        </button>
        <button type="button" className="button" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};
