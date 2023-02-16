import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PrimaryButton from '../PrimaryButton/PrimaryButton';

const Categories = () => {
    const [categories, setCategories] = useState([]);

    useEffect( () =>{
        fetch('https://techmate-server2.vercel.app/product-categories')
        .then( res => res.json())
        .then(data => setCategories(data));
    }, [])

    return (
        <div className='mx-auto w-4/5 lg:w-full'>
            <h1 className='text-xl md:text-3xl text-secondary-focus font-semibold font-sans'> {categories.length} AVAILABLE CATEGORIES</h1>
            <h1 className='text-secondary'>----------<span className='text-accent'>oo</span>----------</h1>
            <div className='grid grid-rows-3 lg:grid-rows-1 grid-flow-col gap-[6rem] md:gap-[3rem] mt-4 md:mt-10 mx-auto '>
                {
                    categories?.map(category => <div key={category.id}>
                        <Link to={`/category/${category.id}`}>
                        <div className="card mx-auto h-[11rem] shadow-xl image-full" >
                                <div className="card-body text-center bg-accent hover:bg-pink-500 rounded-lg">
                                   <div className='flex justify-center items-center gap-8'>
                                       <img className='w-1/2 h-[10rem] md:h-[8rem] bg-white ' src={category.img} alt="" />
                                    <div>
                                        <h2 className='text-3xl font-serif font-semibold mt-1'>{category.name}</h2>
                                        <div className='mt-3 w-full'>
                                        <PrimaryButton 
                                           >Click Here</PrimaryButton>
                                        </div>
                                    </div>
                                   </div>
                                </div>
                            </div>
                        </Link>
                    </div>)
                }
            </div>
        </div>
    );
};

export default Categories;