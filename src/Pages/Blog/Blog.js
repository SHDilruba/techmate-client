import React from 'react';
import { useLoaderData } from 'react-router-dom';
import useTitle from '../../Shared/hooks/useTitle';

const Blog = () => {
  useTitle('Blog');
  const blogPosts = useLoaderData();
  console.log(blogPosts);
  
  return (
      <div className=''>
        <h2 className='text-4xl mb-8 text-center font-sans text-secondary'>Welcome to Blog</h2>
        <div className='mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 mx-auto md:mx-20  px-10 bg-accent py-10 rounded-xl'>
         {
          blogPosts.map(post => <>
               <div className="card h-[20rem]  bg-base-100 shadow-xl mx-auto">
                 <div className="card-body items-center text-center ">
                    <h2 className="card-title text-2xl text-secondary mb-2"> {post.question}</h2>
                    <p>{post.answer}</p>
                </div>
              </div>
          </>)
         }
         </div>
    </div>
  );
};

export default Blog;