import { h } from 'preact';
import { render, fireEvent } from '@testing-library/preact';
import { PostItem } from '../components/PostItem';
import { PostsContext } from '../context/PostsContext';
import { describe, it, expect, vi } from 'vitest';


describe('PostItem', () => {
  const mockPost = {
    id: 1,
    title: 'Test Post',
    body: 'Test Body'
  };

  const mockContext = {
    handleEdit: vi.fn(),
    deletePost: vi.fn()
  };

  it('renders post title and body', () => {
    const { getByText } = render(
      <PostsContext.Provider value={mockContext as any}>
        <PostItem post={mockPost} />
      </PostsContext.Provider>
    );

    expect(getByText('Test Post')).toBeInTheDocument();
    expect(getByText('Test Body')).toBeInTheDocument();
  });

  it('calls handleEdit when edit button is clicked', () => {
    const { getByText } = render(
      <PostsContext.Provider value={mockContext as any}>
        <PostItem post={mockPost} />
      </PostsContext.Provider>
    );

    fireEvent.click(getByText('Edit'));
    expect(mockContext.handleEdit).toHaveBeenCalledWith(mockPost);
  });

  it('calls deletePost when delete button is clicked', () => {
    const { getByText } = render(
      <PostsContext.Provider value={mockContext as any}>
        <PostItem post={mockPost} />
      </PostsContext.Provider>
    );

    fireEvent.click(getByText('Delete'));
    expect(mockContext.deletePost).toHaveBeenCalledWith(mockPost.id);
  });
});
