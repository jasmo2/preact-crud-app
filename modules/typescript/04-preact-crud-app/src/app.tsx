import { h } from "preact";
import "./app.css";
import { PostForm } from "./components/PostForm";
import { PostList } from "./components/PostList";

export const CrudApp = () => {
  return (
    <div className="container">
      <h1>Preact CRUD App</h1>
      <PostForm />
      <h2>Posts</h2>
      <ul className="post-list">
        <PostList />
      </ul>
    </div>
  );
};
