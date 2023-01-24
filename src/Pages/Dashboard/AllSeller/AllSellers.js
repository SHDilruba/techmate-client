import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';

const AllSeller = () => {

  const {data: sellers = [], refetch} = useQuery({
     queryKey: ['users'],
     queryFn: async() =>{
      const res = await fetch('http://localhost:5000/users/allSellers');
      const data = await res.json();
      return data;
     }
  });

  const handleVerifySeller = id =>{
    fetch(`http://localhost:5000/users/${id}`,{
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
      fetch(`http://localhost:5000/users/${id}`,{
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
    <h2 className="text-3xl ml-8 my-8 text-accent">All {sellers.length} Sellers</h2>
    <div className="overflow-x-auto">
<table className="table w-full text-[0.5rem] md:text-[1.2rem] text-white">
   <thead>
      <tr>
        <th className='text-secondary text-center text-[0.6rem] md:text-[1rem]'>{sellers.length}  {sellers.length > 1 ? 'sellers' : 'seller' }</th>
        <th className='text-secondary text-center text-[0.6rem] md:text-[1rem]'>Name</th>
        <th className='text-secondary text-center text-[0.6rem] md:text-[1rem]'>Email</th>
        <th className='text-secondary text-center text-[0.6rem] md:text-[1rem]'>Verify </th>
        <th className='text-secondary text-center text-[0.6rem] md:text-[1rem]'>Delete</th>
      </tr>
   </thead>
   <tbody>
       {
           sellers.map((seller, i) => <tr key={seller._id}>
            <th className='bg-gradient-to-l from-secondary to-accent text-center w-[2rem] lg:w-[8rem]'>{i+1}</th>
            <td className='bg-gradient-to-l from-secondary to-accent text-center'>{seller.name}</td>
            <td className='bg-gradient-to-l from-secondary to-accent text-center'>{seller.email}</td>
            <td className=' lg:w-[12rem] bg-gradient-to-l from-secondary to-accent text-center'>{seller?.seller_quality !== 'verified' ? <button onClick={() => handleVerifySeller(seller._id)} className='btn btn-xs btn-outline bg-white outline'>Verify</button>
             :
            <div className='text-center'>
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mx-auto">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
             }</td>
            <td className='bg-gradient-to-l from-secondary to-accent '><button onClick={() => handleDelete(seller._id)}  className='btn btn-xs outline bg-red-600 hover:bg-white hover:text-red-500'>Delete</button></td>
          </tr>)
       }
    </tbody>
  </table>
</div>
</div>
  );
};

export default AllSeller;