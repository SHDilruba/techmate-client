import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import useTitle from '../../Shared/hooks/useTitle';

const Blog = () => {
  useTitle('Blog');
// const [blogPosts, setBlogPost] = useState();
const {data:blogPosts = []} = useQuery({
      queryKey: ['blogPosts'],
      queryFn: () => fetch('http://localhost:5000/blog')
      .then(res => res.json())
  })
  
  return (
      <div className='mt-8'>
        <h2 className='text-5xl mb-10 text-center font-serif text-accent'>Welcome to Blog</h2>
        <div className='mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 mx-auto md:mx-20  px-10 bg-accent py-10 rounded-xl'>
         {
          blogPosts.map(post => <>
               <div className="card h-[20rem]  bg-base-100 shadow-xl mx-auto">
                 <div className="card-body items-center text-center ">
                    <h2 className=" text-2xl text-accent  mb-2 font-serif"> {post.question}</h2>
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