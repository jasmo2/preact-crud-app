import { h } from "preact";

interface Post {
  id: number;
  title: string;
  body: string;
}

interface PostItemProps {
  post: Post;
  onEdit: (post: Post) => void;
  onDelete: (id: number) => void;
}

export const PostItem = ({ post, onEdit, onDelete }: PostItemProps) => {
  return (
    <li className="post-item">
      <strong>{post.title}</strong>
      <p>{post.body}</p>
      <button className="button button-edit" onClick={() => onEdit(post)}>
        Edit
      </button>
      <button className="button button-delete" onClick={() => onDelete(post.id)}>
        Delete
      </button>
    </li>
  );
};
