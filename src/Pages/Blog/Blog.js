import React from 'react';
import useTitle from '../../Shared/hooks/useTitle';

const Blog = () => {
  useTitle('Blog');
  return (
    <div>
      <h1>This is Blog</h1>
    </div>
  );
};

export default Blog;