import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useTitle from '../../Shared/hooks/useTitle';

const Blog = () => {
  useTitle('Blog');

  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
      axios.get('http://localhost:5000/blog')
      .then((res) => {
        setBlogPosts(res.data)
      })
      .catch(console.error);
  
}, []);
  
  return (
      <div className='mt-8 mb-20'>
        <h2 className='text-5xl mb-10 text-center font-serif text-accent'>Welcome to Blog </h2>
        <div className='mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 mx-auto md:mx-20  px-10 bg-accent py-10 rounded-xl'>
         {
          blogPosts.map(post => <div key={post._id}>
               <div className="card h-[20rem]  bg-base-100 shadow-xl mx-auto">
                 <div className="card-body items-center text-center ">
                    <h2 className=" text-2xl text-accent  mb-2 font-serif"> {post.question}</h2>
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