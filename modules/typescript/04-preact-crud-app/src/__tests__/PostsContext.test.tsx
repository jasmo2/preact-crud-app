import { h } from 'preact';
import { render, fireEvent } from '@testing-library/preact';
import { PostsProvider, usePostsContext } from '../context/PostsContext';
import { describe, it, expect } from 'vitest';

const TestComponent = () => {
  const { title, setTitle, handleSubmit } = usePostsContext();
  return (
    <div>
      <input
        value={title}
        onChange={(e) => setTitle(e.currentTarget.value)}
        data-testid="title-input"
      />
      <button onClick={(e) => handleSubmit(e as any)}>Submit</button>
    </div>
  );
};

describe('PostsContext', () => {
  it('provides post context to children', () => {
    const { getByTestId } = render(
      <PostsProvider>
        <TestComponent />
      </PostsProvider>
    );

    const input = getByTestId('title-input');
    fireEvent.change(input, { target: { value: 'New Title' } });

    expect((input as HTMLInputElement).value).toBe('New Title');
  });
});
