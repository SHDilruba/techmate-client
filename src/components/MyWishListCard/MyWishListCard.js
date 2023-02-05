import React from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import DeleteButton from '../DeleteButton/DeleteButton';

const MyWishListCard = ({ product, setModalContent, refetch  }) => {
   const {_id, img, name, resale_price, i } = product;

   const changeContent = (product) => {
    setModalContent([product]);
};

const handleDelete = id =>{
  const proceed = window.confirm('Are you sure to cancel this product?')
  if(proceed){
    fetch(`http://localhost:5000/wishlist/${id}`,{
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
            onClick={()=>changeContent(product)}
            htmlFor="booking-modal"
            className="btn btn-xs btn-secondary bg-gradient-to-l from-secondary to-accent rounded text-white outline text-[0.4rem] md:text-[1rem]"
          > Book Now
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

export default MyWishListCard;