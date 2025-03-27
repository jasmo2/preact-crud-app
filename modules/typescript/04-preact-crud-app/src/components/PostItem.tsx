import { h } from "preact";
import { usePostsContext } from "../context/PostsContext";

interface Post {
  id: number;
  title: string;
  body: string;
}

interface PostItemProps {
  post: Post;
}

export const PostItem = ({ post }: PostItemProps) => {
  const { handleEdit, deletePost } = usePostsContext();

  return (
    <li className="post-item">
      <strong>{post.title}</strong>
      <p>{post.body}</p>
      <button className="button button-edit" onClick={() => handleEdit(post)}>
        Edit
      </button>
      <button className="button button-delete" onClick={() => deletePost(post.id)}>
        Delete
      </button>
    </li>
  );
};
