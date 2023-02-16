import React from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import DeleteButton from '../DeleteButton/DeleteButton';

const MyWishListTable = ({ product, setModalContent, refetch  }) => {
   const {_id, img, name, resale_price, booking } = product;
   console.log(product);

   const changeContent = (product) => {
    setModalContent([product]);
};

const handleDelete = id =>{
  const proceed = window.confirm('Are you sure to cancel this product?')
  if(proceed){
    fetch(`https://techmate-server2.vercel.app/wishlist/${id}`,{
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

 return (
   <>
       <td className='border-2 border-secondary'>
        { img &&
                <PhotoProvider>
                    <PhotoView src={img}>
                       <img 
                       className='w-[3rem] sm:w-[6rem] mx-auto' 
                       src={img} alt="" />
                     </PhotoView>
                </PhotoProvider>
             }
             </td>
        <td className='border-2 border-secondary text-[0.4rem] md:text-[1.1rem]'>{name}</td>
       <td className='border-2 border-secondary text-[0.4rem] md:text-[1.3rem]'>{resale_price}</td>
       <td className='border-2 border-secondary'>
          <label
          onClick={()=> {
            changeContent(product)
          }}
          htmlFor="booking-modal"
          className="btn btn-sm btn-secondary ml-1 bg-gradient-to-l from-secondary to-accent rounded-lg text-white border-white hover:border-2 hover:border-secondary"
        > BOOK NOW 
       </label>
       </td>
       <td onClick={() => handleDelete(product._id)}
       className='border-2 border-secondary text-[0.4rem] md:text-[1rem]'>
          <DeleteButton
          >Cancel</DeleteButton>
       </td>
   </>
 );
};

export default MyWishListTable;