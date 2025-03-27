import { h } from "preact";
import { usePostsContext } from "../context/PostsContext";
import { PostItem } from "./PostItem";

export const PostList = () => {
  const { posts } = usePostsContext();

  return (
    <>
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </>
  );
};
