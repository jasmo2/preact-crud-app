import { h } from 'preact';
import { render } from '@testing-library/preact';
import { PostList } from '../components/PostList';
import { PostsContext } from '../context/PostsContext';
import { describe, it, expect } from 'vitest';

describe('PostList', () => {
  const mockPosts = [
    { id: 1, title: 'Post 1', body: 'Body 1' },
    { id: 2, title: 'Post 2', body: 'Body 2' }
  ];

  it('renders all posts from context', () => {
    const { getByText } = render(
      <PostsContext.Provider value={{ posts: mockPosts } as any}>
        <PostList />
      </PostsContext.Provider>
    );

    expect(getByText('Post 1')).toBeInTheDocument();
    expect(getByText('Body 1')).toBeInTheDocument();
    expect(getByText('Post 2')).toBeInTheDocument();
    expect(getByText('Body 2')).toBeInTheDocument();
  });

  it('renders empty list when no posts', () => {
    const { container } = render(
      <PostsContext.Provider value={{ posts: [] } as any}>
        <PostList />
      </PostsContext.Provider>
    );

    expect(container.firstChild?.hasChildNodes()).toBeFalsy();
  });
});
