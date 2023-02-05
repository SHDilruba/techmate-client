import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import DeleteButton from '../../../components/DeleteButton/DeleteButton';

const AllUsers = () => {

  const {data: users = [], refetch} = useQuery({
     queryKey: ['users'],
     queryFn: async() =>{
      const res = await fetch('http://localhost:5000/users');
      const data = await res.json();
      return data;
     }
  });

const handleMakeAdmin = id =>{
  fetch(`http://localhost:5000/users/admin/${id}`,{
      method: 'PUT',
      headers: {
         authorization: `bearer ${localStorage.getItem('accessToken')}`
      }
  })
   .then(res => res.json())
   .then (data => {
       if(data.modifiedCount > 0){
         toast.success('Maked Admin successfully')
         refetch();
       }
   })
};

const handleMakeSeller = id =>{
  fetch(`http://localhost:5000/users/seller/${id}`,{
      method: 'PUT',
      headers: {
         authorization: `bearer ${localStorage.getItem('accessToken')}`
      }
  })
   .then(res => res.json())
   .then (data => {
    console.log(data);
       if(data.modifiedCount > 0){
         toast.success('Maked Seller successfully')
         refetch();
       }
   })
};

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
    <div className='mb-20'>
      <h2 className="text-4xl ml-10 my-10 text-accent">All Users</h2>
      <div className="overflow-x-auto">
        <table className="table w-full text-[0.4rem] md:text-[1.2rem]">
            <thead>
                  <tr className='text-[0.6rem] md:text-[1rem]  text-center'>
                      <th className='hidden md:block bg-gradient-to-l from-secondary to-accent text-white'>{users.length}  {users.length > 1 ? 'users' : 'user' }</th>
                      <th className=' bg-gradient-to-l from-secondary to-accent text-white'>Name</th>
                      <th className=' bg-gradient-to-l from-secondary to-accent text-white'>Email</th>
                      <th className=' bg-gradient-to-l from-secondary to-accent text-white'>Make Admin</th>
                      <th className='hidden md:block bg-gradient-to-l from-secondary to-accent text-white'>Make Seller</th>
                      <th className=' bg-gradient-to-l from-secondary to-accent text-white'>Delete</th>
                  </tr>
            </thead>
            <tbody className='text-center'>
                 {
                    users.map((user, i) => <tr className='h-[4rem] border-2 border-secondary'  key={user._id}>
                      <th className='hidden md:block'>{i+1}</th>
                      <td className='border-2 border-secondary'>{user.name}</td>
                      <td className='border-2 border-secondary'>{user.email}</td>
                      <td className='border-2 border-secondary'>{ user?.role !== 'admin' ? 
                        <button onClick={() => handleMakeAdmin(user._id)} className='btn btn-xs btn-accent rounded text-white outline text-[0.4rem] md:text-[0.8rem]'>Make</button>
                         :
                        <div className='text-accent'>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 22 22" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mx-auto">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                         </svg>
                     </div>
                      }</td>
                      <td className='hidden md:block'>{ user?.role !== 'seller' 
                      ? <button onClick={() => handleMakeSeller(user._id)} className='btn btn-xs btn-accent rounded text-white text-[0.4rem] md:text-[0.8rem]'>Make</button>
                      :
                      <div className='text-accent'>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 22 22" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mx-auto">
                     <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                     </svg>
                   </div>
                    }
                      </td>
                      <td onClick={() => handleDelete(user._id)}
                      className='border-2 border-secondary text-center'>
                        <DeleteButton
                      >Delete</DeleteButton>
                      </td>
                  </tr>)
                  }
           </tbody>
       </table>
    </div>
</div>
  );
};

export default AllUsers;