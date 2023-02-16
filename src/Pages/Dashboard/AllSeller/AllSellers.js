import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import DeleteButton from '../../../components/DeleteButton/DeleteButton';

const AllSeller = () => {

  const {data: sellers = [], refetch} = useQuery({
     queryKey: ['users'],
     queryFn: async() =>{
      const res = await fetch('https://techmate-server2.vercel.app/users/allSellers');
      const data = await res.json();
      return data;
     }
  });

  const handleVerifySeller = id =>{
    fetch(`https://techmate-server2.vercel.app/users/${id}`,{
        method: 'PUT',
        headers: {
           authorization: `bearer ${localStorage.getItem('accessToken')}`
        }
    })
     .then(res => res.json())
     .then (data => {
      console.log(data);
         if(data.modifiedCount > 0){
           toast.success('Seller verified successfully')
           refetch();
         }
     })
  }

  const handleDelete = id =>{
    const proceed = window.confirm('Are you sure to cancel this user?')
    if(proceed){
      fetch(`https://techmate-server2.vercel.app/users/${id}`,{
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
    <div>
    <h2 className="text-4xl ml-10 my-10 text-accent font-sans">ALL {sellers?.length} {sellers?.length > 1 ? 'Sellers' : 'Seller'}</h2>
    <div className="overflow-x-auto">
<table className="table w-full text-[0.5rem] md:text-[1.3rem]">
   <thead>
      <tr className='text-secondary text-center'>
        <th className='hidden md:block bg-gradient-to-l from-secondary to-accent text-white'>{sellers.length}  {sellers.length > 1 ? 'sellers' : 'seller' }</th>
        <th className='bg-gradient-to-l from-secondary to-accent text-white '>Name</th>
        <th className='bg-gradient-to-l from-secondary to-accent text-white'>Email</th>
        <th className='bg-gradient-to-l from-secondary to-accent text-white'>Verify </th>
        <th className='bg-gradient-to-l from-secondary to-accent text-white'>Cancel</th>
      </tr>
   </thead>
   <tbody className='text-center'>
       {
           sellers.map((seller, i) => <tr className=' border-2 border-secondary h-[4rem]' key={seller._id}>
            <th className='hidden md:block w-[2rem] md:w-full'>{i+1}</th>
            <td className=' border-2 border-secondary'>{seller.name}</td>
            <td className=' border-2 border-secondary'>{seller.email}</td>
            <td className=' lg:w-[12rem]  border-2 border-secondary'>{seller?.seller_quality !== 'verified' ? <button onClick={() => handleVerifySeller(seller._id)} className='btn btn-xs btn-accent rounded-lg text-white hover:bg-secondary'>Verify</button>
             :
            <div className=' text-accent'>
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 22 22" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mx-auto">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
             }</td>
            <td onClick={() => handleDelete(seller._id)}
            className=' border-2 border-secondary'>
           <DeleteButton 
            >Cancel</DeleteButton></td>
          </tr>)
       }
    </tbody>
  </table>
</div>
</div>
  );
};

export default AllSeller;