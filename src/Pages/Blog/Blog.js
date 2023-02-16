import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useTitle from '../../Shared/hooks/useTitle';

const Blog = () => {
  useTitle('Blog');

  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
      axios.get('https://techmate-server2.vercel.app/blog')
      .then((res) => {
        setBlogPosts(res.data)
      })
      .catch(console.error);
  
}, []);
  
  return (
      <div className='mt-8 mb-20'>
        <h2 className='text-5xl mb-10 text-center font-serif text-accent'>Welcome to Blog </h2>
        <div className='mt-10 grid grid-cols-1 gap-12 mx-auto lg:mx-20  p-2 rounded-xl'>
         {
          blogPosts.map(post => <div key={post._id}>
               <div className="card h-[20rem] lg:h-[16rem] border-4 border-accent bg-base-100 shadow-xl mx-auto">
                 <div className="card-body items-center text-center px-[4rem] ">
                    <h2 className="text-3xl text-secondary-focus  my-2 font-serif"> {post.question}</h2>
                    <p>{post.answer}</p>
                </div>
              </div>
          </div>)
         }
         </div>
    </div>
  );
};

export default Blog;