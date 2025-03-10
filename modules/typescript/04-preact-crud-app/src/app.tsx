import { h } from "preact";
import "./app.css";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export const CrudApp = () => {
  const posts: Post[] = [];
  const currentPost = { title: "", body: "" };

  return (
    <div className="container">
      <h1>Preact CRUD App</h1>

      <div className="form-container">
        <h2>Create Post</h2>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={currentPost.title}
          className="input"
        />
        <textarea
          name="body"
          placeholder="Body"
          value={currentPost.body}
          className="textarea"
        />

        <button className="button button-primary">Create</button>
        <button className="button">Cancel</button>
      </div>

      <h2>Posts</h2>
      <ul className="post-list">
        {posts.map((post) => (
          <li key={post.id} className="post-item">
            <strong>{post.title}</strong>
            <p>{post.body}</p>
            <button className="button button-edit">Edit</button>
            <button className="button button-delete">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
