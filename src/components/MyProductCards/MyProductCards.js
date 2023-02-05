import React from 'react';
import { toast } from 'react-hot-toast';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

const MyProductCards = ({product, i, myProducts, setMyProducts, refetch}) => {

 const handleDelete = id =>{
  const proceed = window.confirm('Are you sure to cancel this product?')
  if(proceed){
    fetch(`http://localhost:5000/products/${id}`,{
    method: 'DELETE',
    headers: {
      authorization: `bearer ${localStorage.getItem('accessToken')}`
   }
  })
  .then(res => res.json())
  .then(data => {
    console.log(data);
    alert('deleted successfully')
    const remaining = myProducts.filter(product => product._id !== id);
    setMyProducts(remaining);
    refetch();
  })
 }
 };

const handleMakeAdvertise = id =>{
  fetch(`http://localhost:5000/products/advertise/${id}`,{
      method: 'PUT',
      headers: {
         authorization: `bearer ${localStorage.getItem('accessToken')}`
      }
  })
   .then(res => res.json())
   .then (data => {
    console.log(data);
       if(data.modifiedCount > 0){
         toast.success('Maked Advertise successfully')
         refetch();
       }
   })
};

 return (  
      <>
       <th className='bg-gradient-to-l from-secondary to-accent text-center'>{i+1}</th>
       <td className='bg-gradient-to-l from-secondary to-accent'>                    
            { product?.img &&
                <PhotoProvider>
                    <PhotoView src={product?.img}>
                       <img className='w-20 mx-auto' src={product?.img} alt="" />
                     </PhotoView>
                </PhotoProvider>
             }
       </td>
       <td className='bg-gradient-to-l from-secondary to-accent text-center'>{product.name}</td>
       <td className='bg-gradient-to-l from-secondary to-accent text-center'>{product.resale_price}</td>
       <td className='bg-gradient-to-l from-secondary to-accent text-center'>
            {
                product?.advertisement === 'done' ? 'Done' :              
                 <button
                     onClick={() => handleMakeAdvertise(product._id)}
                     className="btn btn-xs outline bg-white rounded-xl text-black hover:text-white"
                    > Add
                  </button>
            }
       </td>
       <td className='bg-gradient-to-l from-secondary to-accent text-center'>
             { product && 
                  <button 
                      onClick={() => handleDelete(product._id)} className='btn btn-xs outline bg-red-600 hover:bg-white hover:text-red-500'>
                      Delete
                  </button>
             }
       </td>
  </>
  );
};

export default MyProductCards;