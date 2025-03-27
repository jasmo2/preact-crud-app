import { renderHook, act } from '@testing-library/preact';
import { usePosts } from '../usePosts';
import { describe, it, expect, beforeEach } from 'vitest';

describe('usePosts', () => {
  const mockPosts = [
    { id: 1, title: 'Post 1', body: 'Body 1' },
    { id: 2, title: 'Post 2', body: 'Body 2' }
  ];

  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('should fetch posts on mount', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockPosts));

    const { result } = renderHook(() => usePosts());

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.posts).toEqual(mockPosts);
    expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/posts');
  });

  it('should create a new post', async () => {
    const newPost = { id: 3, title: 'New Post', body: 'New Body', userId: 1 };
    fetchMock.mockResponseOnce(JSON.stringify(newPost));

    const { result } = renderHook(() => usePosts());

    await act(async () => {
      result.current.setTitle('New Post');
      result.current.setBody('New Body');
      await result.current.createPost();
    });

    expect(fetch).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/posts',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({
          title: 'New Post',
          body: 'New Body',
          userId: 1
        })
      })
    );
  });

  it('should update an existing post', async () => {
    const updatedPost = { id: 1, title: 'Updated Post', body: 'Updated Body', userId: 1 };
    fetchMock.mockResponseOnce(JSON.stringify(updatedPost));

    const { result } = renderHook(() => usePosts());

    await act(async () => {
      result.current.setEditingId(1);
      result.current.setTitle('Updated Post');
      result.current.setBody('Updated Body');
      await result.current.updatePost();
    });

    expect(fetch).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/posts/1',
      expect.objectContaining({
        method: 'PUT',
        body: JSON.stringify({
          id: 1,
          title: 'Updated Post',
          body: 'Updated Body',
          userId: 1
        })
      })
    );
  });

  it('should delete a post', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({}));

    const { result } = renderHook(() => usePosts());

    await act(async () => {
      await result.current.deletePost(1);
    });

    expect(fetch).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/posts/1',
      expect.objectContaining({
        method: 'DELETE'
      })
    );
  });

  it('should reset form', () => {
    const { result } = renderHook(() => usePosts());

    act(() => {
      result.current.setTitle('Test');
      result.current.setBody('Test Body');
      result.current.setEditingId(1);
      result.current.resetForm();
    });

    expect(result.current.title).toBe('');
    expect(result.current.body).toBe('');
    expect(result.current.editingId).toBeNull();
  });
});
