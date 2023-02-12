import React from 'react';
import { toast } from 'react-hot-toast';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import DeleteButton from '../DeleteButton/DeleteButton';

const MyProductCards = ({product, i, refetch}) => {

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
         toast.success('Successfully added in the Advertisement')
         refetch();
       }
   })
};

 return (  
      <>
       <th className='hidden md:block'>{i+1}</th>
       <td className='border-2 border-secondary'>                    
            { product?.img &&
                <PhotoProvider>
                    <PhotoView src={product?.img}>
                       <img className='w-20 mx-auto' src={product?.img} alt="" />
                     </PhotoView>
                </PhotoProvider>
             }
       </td>
       <td className='border-2 border-secondary text-center'>{product.name}</td>
       <td className='border-2 border-secondary text-center'>{product.resale_price}</td>
       <td className='border-2 border-secondary text-center'>
      {product?.booking ? 'Booked'
        : 
        <>
         {
                product?.advertisement === 'done' ? <p className='text-accent'>Added</p> :              
                 <button
                     onClick={() => handleMakeAdvertise(product._id)}
                     className="btn btn-xs bg-accent rounded-xl text-white hover:bg-secondary"
                    > Add
                  </button>
            }
        </>
        }           
       </td>
       <td className='border-2 border-secondary text-center'>
             { product && 
                 <div onClick={() => handleDelete(product._id)}>
                    <DeleteButton>
                        Delete
                    </DeleteButton>
                 </div>
             }
       </td>
    </>
  );
};

export default MyProductCards;