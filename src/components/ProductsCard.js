import React from 'react';

const Products = ({ news }) => {
    const { _id, name, published_date } = news;
    
    return (
      <div>
          <p>{name}</p>
      </div>
    );
};

export default Products;