import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

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
    <div>
      <h2 className="text-3xl ml-5 my-8 text-accent">All Users</h2>
      <div className="overflow-x-auto">
        <table className="table w-full text-[0.6rem] md:text-[1.2rem] text-white">
            <thead>
                  <tr>
                      <th className='text-secondary text-center text-[0.6rem] md:text-[1rem]'>{users.length}  {users.length > 1 ? 'users' : 'user' }</th>
                      <th className='text-secondary text-center text-[0.6rem] md:text-[1rem]'>Email</th>
                      <th className='text-secondary text-center text-[0.6rem] md:text-[1rem]'>Name</th>
                      <th className='text-secondary text-center text-[0.6rem] md:text-[1rem]'>Admin</th>
                      <th className='text-secondary text-center text-[0.6rem] md:text-[1rem]'>Seller</th>
                      <th className='text-secondary text-center text-[0.6rem] md:text-[1rem]'>Delete</th>
                  </tr>
            </thead>
            <tbody>
                 {
                    users.map((user, i) => <tr key={user._id}>
                      <th className=' bg-gradient-to-l from-secondary to-accent text-center'>{i+1}</th>
                      <td className=' bg-gradient-to-l from-secondary to-accent text-center'>{user.email}</td>
                      <td className=' bg-gradient-to-l from-secondary to-accent text-center'>{user.name}</td>
                      <td className=' bg-gradient-to-l from-secondary to-accent text-center'>{ user?.role !== 'admin' && <button onClick={() => handleMakeAdmin(user._id)} className='btn btn-xs btn-outline bg-white outline'>Make Admin</button>}</td>
                      <td className=' bg-gradient-to-l from-secondary to-accent text-center'>{ user?.role !== 'seller' && <button onClick={() => handleMakeSeller(user._id)} className='btn btn-xs btn-outline bg-white outline'>Make seller</button>}</td>
                      <td className=' bg-gradient-to-l from-secondary to-accent text-center'><button onClick={() => handleDelete(user._id)}  className='btn btn-xs outline bg-red-600 hover:bg-white hover:text-red-500'>Delete</button></td>
                  </tr>)
                  }
           </tbody>
       </table>
    </div>
</div>
  );
};

export default AllUsers;