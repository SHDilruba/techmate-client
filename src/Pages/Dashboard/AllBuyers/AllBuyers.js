import { useQuery } from '@tanstack/react-query';
import React from 'react';
import DeleteButton from '../../../components/DeleteButton/DeleteButton';
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
    <h2 className="text-4xl ml-10 my-10 text-accent">All {buyers.length} buyers</h2>
     <div className="overflow-x-auto">
       <table className="table w-full text-white text-[0.4rem] md:text-[1.5rem]">
   <thead>
      <tr className='text-center'>
        <th className='bg-gradient-to-l from-secondary to-accent text-white text-[0.6rem] md:text-[1rem]'>{buyers.length}  {buyers.length > 1 ? 'buyers' : 'buyer' }</th>
        <th className='bg-gradient-to-l from-secondary to-accent text-white text-[0.6rem] md:text-[1rem]'>Name</th>
        <th className='bg-gradient-to-l from-secondary to-accent text-white  text-[0.6rem] md:text-[1rem]'>Email</th>
        <th className='bg-gradient-to-l from-secondary to-accent text-white text-[0.6rem] md:text-[1rem]'>Delete</th>
      </tr>
   </thead>
   <tbody>
       {
           buyers.map((buyer, i) => <tr className=' border-2 border-secondary h-[4rem]' key={buyer._id}>
            <th>{i+1}</th>
            <td className='border-2 border-secondary'>{buyer.name}</td>
            <td className='border-2 border-secondary'>{buyer.email}</td>
            <td onClick={() => handleDelete(buyer._id)}
               className='border-2 border-secondary'>
              <DeleteButton  className='btn btn-xs outline bg-red-600 hover:bg-white hover:text-red-500 text-white text-[0.4rem] md:text-[0.8rem]'>
                Delete</DeleteButton>
            </td>
         </tr>)
       }
    </tbody>
  </table>
</div>
</div>
  );
};

export default AllBuyers;