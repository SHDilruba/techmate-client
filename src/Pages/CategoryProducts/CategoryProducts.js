import React from 'react';
import { useLoaderData } from 'react-router-dom';
import ProductsCard from '../../components/ProductsCard';

const CategoryProducts = () => {
    const categoryNews = useLoaderData();
    console.log(categoryNews);
    
    return (
        <div>
            <h2>This is Category has news: {categoryNews.length}</h2>
            {
                categoryNews.map(news =><ProductsCard
                    key={news._id}
                    news={news}
                ></ProductsCard>)
            }
        </div>
    );
};

export default CategoryProducts;