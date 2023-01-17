import React from 'react';
import { useLoaderData } from 'react-router-dom';
import useTitle from '../../Shared/hooks/useTitle';
import toast from 'react-hot-toast';

const AddProduct = () => {
  const {category_id} = useLoaderData();

  useTitle('AddProduct');

  var showDate = new Date();
  var displayTodaysDate = showDate.getDate()+'/'+(showDate.getMonth()+1)+'/'+showDate.getFullYear();

  const handleAddProduct = event =>{
    event.preventDefault()
    const form = event.target;
    const category_id = form.category_id.value;
    const img = form.img.value;
    const  name = form.name.value;
    const description = form.description.value;
    const used = form.used.value;
    const condition = form.condition.value;
    const location = form.location.value;
    const mobile = form.mobile.value;
    const resale_price = form.resale_price.value;
    const original_price = form.original_price.value;
    const date = form.date.value;

    const product = {
      category_id,
      img,
      name,
      description,
      used,
      condition,
      location,
      mobile,
      resale_price,
      original_price,
      date
    }

    console.log(product);

    fetch('http://localhost:5000/products', {
      method: 'POST',
      headers: {
         'content-type': 'application/json'
      },
      body: JSON.stringify(product)
  })
  .then(res => res.json())
  .then(data => {
    console.log(data)
  })
  .catch(er => console.error(er));
  toast.success('Product added successfully')
  event.target.reset();
}

  return (
    <div id='add-product' className=' pt-6 pb-3 container'>
       <h1 className='text-4xl text-secondary text-center'>Add a product</h1>
       <div className='review-form pt-5 mt-5 container text-center w-2/4 px-5 mx-auto'>
          <form onSubmit={handleAddProduct} className=' pb-5 pt-14 pb-10 w-full bg-accent rounded-lg'>
            <div className="mb-5">
              <input name="category_id" type="text" className="form-control text-center py-3 w-2/3 mx-auto" placeholder="category_id" />
            </div>
            <div className="mb-5">
              <input name="img" type="url" className="form-control text-center py-3 w-2/3 mx-auto" placeholder="photo URL" />
            </div>
            <div className="mb-5 ">
              <input name="name" type="text" className="form-control text-center py-3 w-2/3 mx-auto" placeholder="product title"/>
            </div>
            <div className="mb-5 ">
              <input name="description" type="text" className="form-control text-center py-3 w-2/3 mx-auto" placeholder="description"/>
            </div>
            <div className="mb-5">
              <input name="used" type="text" className="form-control text-center py-3 w-2/3 mx-auto" placeholder="used" />
            </div>
            <div className="mb-5">
              <input name="condition" type="text" className="form-control text-center py-3 w-2/3 mx-auto" placeholder="condition" />
            </div>
            <div className="mb-5">
              <input name="location" type="text" className="form-control text-center py-3 w-2/3 mx-auto" placeholder="location" />
            </div>
            <div className="mb-5">
              <input name="mobile" type="text" className="form-control text-center py-3 w-2/3 mx-auto" placeholder="mobile no" />
            </div>
            <div className="mb-5">
              <input name="resale_price" type="text" className="form-control text-center py-3 w-2/3 mx-auto" placeholder="resale_price" />
            </div>
            <div className="mb-5">
              <input name="original_price" type="text" className="form-control text-center py-3 w-2/3 mx-auto" placeholder="original-price" />
            </div>
            <div className='text-center'>
             <input name="date" type='text' className="form-control text-center py-3 w-2/3 mx-auto mb-3" value= {displayTodaysDate} readOnly='true'/>
         </div>          
            <button className='btn btn-secondary w-2/4 mt-3 mb-4 py-2' type="submit">Add Product</button>
          </form>
      </div>
    </div>
  );
};

export default AddProduct;