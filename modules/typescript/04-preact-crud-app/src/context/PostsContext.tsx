import { h, createContext } from "preact";
import { useContext } from "preact/hooks";
import { Post } from "../types/post";
import { usePosts, PostApiTypes } from "../hooks/usePosts";

interface PostsContextType extends PostApiTypes {
  handleEdit: (post: Post) => void;
  handleSubmit: (e: Event) => Promise<void>;
}

export const PostsContext = createContext<PostsContextType>({} as PostsContextType);
export const usePostsContext = () => useContext(PostsContext);

interface Props {
  children: h.JSX.Element | h.JSX.Element[];
}

export const PostsProvider = ({ children }: Props): h.JSX.Element => {
  const posts = usePosts();

  async function handleSubmit(e: Event): Promise<void> {
    e.preventDefault();
    if (posts.editingId) {
      await posts.updatePost();
    } else {
      await posts.createPost();
    }
    posts.resetForm();
  };

  function handleEdit(post: Post): void {
    posts.setEditingId(post.id);
    posts.setTitle(post.title);
    posts.setBody(post.body);
  };

  return (
    <PostsContext.Provider value={{
      ...posts,
      handleSubmit,
      handleEdit
    }}>
      {children}
    </PostsContext.Provider>
  );
};
