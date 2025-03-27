import { renderHook, act } from '@testing-library/preact';
import { usePosts } from '../usePosts';
import { describe, it, expect } from 'vitest';

describe('usePosts', () => {
  it('should fetch posts on mount', async () => {
    const { result } = renderHook(() => usePosts());

    // Wait for MSW to handle the request
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.posts).toEqual([
      { id: 1, title: 'Post 1', body: 'Body 1' },
      { id: 2, title: 'Post 2', body: 'Body 2' }
    ]);
  });

  it('should create a new post', async () => {
    const { result } = renderHook(() => usePosts());

    act(() => {
      result.current.setTitle('New Post');
      result.current.setBody('New Body');
    });

    expect(result.current.title).toBe('New Post');
    expect(result.current.body).toBe('New Body');

    await act(async () => {
      await result.current.createPost();
    });


    const newPost = result.current.posts[0];
    expect(newPost).toEqual({
      id: 3,
      title: 'New Post',
      body: 'New Body',
      userId: 1
    });
  });

  it('should update an existing post', async () => {
    const { result } = renderHook(() => usePosts());

    // Wait for initial posts to load
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    act(() => {
      result.current.setEditingId(1);
      result.current.setTitle('Updated Post');
      result.current.setBody('Updated Body');
    });

    expect(result.current.title).toBe('Updated Post');
    expect(result.current.body).toBe('Updated Body');
    expect(result.current.editingId).toBe(1);

    await act(async () => {
      await result.current.updatePost();
    });

    const updatedPost = result.current.posts.find(post => post.id === 1);
    expect(updatedPost).toMatchObject({
      id: 1,
      title: 'Updated Post',
      body: 'Updated Body'
    });
  });

  it('should delete a post', async () => {
    const { result } = renderHook(() => usePosts());

    // Wait for initial posts to load
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    const initialLength = result.current.posts.length;

    await act(async () => {
      await result.current.deletePost(1);
    });

    expect(result.current.posts.length).toBe(initialLength - 1);
    expect(result.current.posts.find(post => post.id === 1)).toBeUndefined();
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
