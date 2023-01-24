import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useTitle from '../../../Shared/hooks/useTitle';

const AllBuyers = () => {
  useTitle('AllBuyers');

  const {data: buyers = [], refetch} = useQuery({
     queryKey: ['buyers'],
     queryFn: async() =>{
      const res = await fetch('http://localhost:5000/users/buyers');
      const data = await res.json();
      return data;
     }
  });

  const handleDelete = id =>{
    const proceed = window.confirm('Are you sure to cancel this buyer?')
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
    <h2 className="text-3xl ml-8 my-8 text-accent">All {buyers.length} buyers</h2>
    <div className="overflow-x-auto">
<table className="table w-full text-[0.6rem] md:text-[1.2rem] text-white">
   <thead>
      <tr>
        <th className='text-secondary text-center text-[0.6rem] md:text-[1rem]'>{buyers.length}  {buyers.length > 1 ? 'buyers' : 'buyer' }</th>
        <th className='text-secondary text-center text-[0.6rem] md:text-[1rem]'>Name</th>
        <th className='text-secondary text-center text-[0.6rem] md:text-[1rem]'>Email</th>
        <th className='text-secondary text-center text-[0.6rem] md:text-[1rem]'>Delete</th>
      </tr>
   </thead>
   <tbody>
       {
           buyers.map((buyer, i) => <tr key={buyer._id}>
            <th className='bg-gradient-to-l from-secondary to-accent text-center'>{i+1}</th>
            <td className='bg-gradient-to-l from-secondary to-accent text-center'>{buyer.name}</td>
            <td className='bg-gradient-to-l from-secondary to-accent text-center'>{buyer.email}</td>
            <td className='bg-gradient-to-l from-secondary to-accent text-center'><button onClick={() => handleDelete(buyer._id)}  className='btn btn-xs outline bg-red-600 hover:bg-white hover:text-red-500'>Delete</button></td>
          </tr>)
       }
    </tbody>
  </table>
</div>
</div>
  );
};

export default AllBuyers;