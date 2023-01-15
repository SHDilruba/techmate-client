import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PrimaryButton from '../PrimaryButton/PrimaryButton';

const Categories = () => {
    const [categories, setCategories] = useState([]);

    useEffect( () =>{
        fetch('http://localhost:5000/product-categories')
        .then( res => res.json())
        .then(data => setCategories(data));
    }, [])

    return (
        <div className='mx-auto'>
            <h1 className='text-3xl text-secondary-focus font-semibold font-sans'> {categories.length} AVAILABLE CATEGORIES</h1>
            <h1 className='text-secondary'>----------<span className='text-accent'>oo</span>----------</h1>
            <div className='grid grid-rows-3 lg:grid-rows-1 grid-flow-col gap-4 mt-10 mx-auto w-full'>
                {
                    categories.map(category => <p key={category.id}>
                        <Link to={`/category/${category.id}`}>
                        <div className="card mx-8 lg:mx-auto lg:w-96 bg-base-100 shadow-xl image-full" >
                                <div className="card-body text-center bg-accent hover:bg-pink-500">
                                   <div className='flex justify-center justify-items-center gap-6'>
                                       <img className='w-1/2 h-100 bg-white p-1' src={category.img} alt="" />
                                    <div>
                                        <h2 className='text-3xl font-serif font-semibold mt-1'>{category.name}</h2>
                                        <div className='mt-3'>
                                        <PrimaryButton>Click Here</PrimaryButton>
                                        </div>
                                    </div>
                                   </div>
                                </div>
                            </div>
                        </Link>
                    </p>)
                }
            </div>
        </div>
    );
};

export default Categories;