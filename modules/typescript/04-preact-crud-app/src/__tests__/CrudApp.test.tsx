import { h } from 'preact';
import { render } from '@testing-library/preact';
import { CrudApp } from '../app';
import { PostsProvider } from '../context/PostsContext';
import { describe, it, expect } from 'vitest';

describe('CrudApp', () => {
  it('renders main app components', () => {
    const { getByText } = render(
      <PostsProvider>
        <CrudApp />
      </PostsProvider>
    );

    expect(getByText('Preact CRUD App')).toBeInTheDocument();
    expect(getByText('Create Post')).toBeInTheDocument();
    expect(getByText('Posts')).toBeInTheDocument();
  });
});
