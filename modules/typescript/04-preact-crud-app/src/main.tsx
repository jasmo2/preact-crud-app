import { render } from "preact";
import { PostsProvider } from "./context/PostsContext";
import "./index.css";
import { CrudApp } from "./app";

render(
  <PostsProvider>
    <CrudApp />
  </PostsProvider>,
  document.getElementById("app")!
);
