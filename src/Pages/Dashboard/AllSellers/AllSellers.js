import { useQuery } from '@tanstack/react-query';
import React from 'react';

const AllSellers = () => {

  const {data: sellers = [], refetch} = useQuery({
     queryKey: ['users'],
     queryFn: async() =>{
      const res = await fetch('http://localhost:5000/users/sellers');
      const data = await res.json();
      return data;
     }
  });

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
<table className="table w-full text-[0.6rem] md:text-[1.2rem] text-white">
   <thead>
      <tr>
        <th className='text-secondary text-center text-[0.6rem] md:text-[1rem]'>{sellers.length}  {sellers.length > 1 ? 'sellers' : 'seller' }</th>
        <th className='text-secondary text-center text-[0.6rem] md:text-[1rem]'>Name</th>
        <th className='text-secondary text-center text-[0.6rem] md:text-[1rem]'>Email</th>
        <th className='text-secondary text-center text-[0.6rem] md:text-[1rem]'>Delete</th>
      </tr>
   </thead>
   <tbody>
       {
           sellers.map((seller, i) => <tr key={seller._id}>
            <th className='bg-gradient-to-l from-secondary to-accent text-center'>{i+1}</th>
            <td className='bg-gradient-to-l from-secondary to-accent text-center'>{seller.name}</td>
            <td className='bg-gradient-to-l from-secondary to-accent text-center'>{seller.email}</td>
            <td className='bg-gradient-to-l from-secondary to-accent text-center'><button onClick={() => handleDelete(seller._id)}  className='btn btn-xs outline bg-red-600 hover:bg-white hover:text-red-500'>Delete</button></td>
          </tr>)
       }
    </tbody>
  </table>
</div>
</div>
  );
};

export default AllSellers;