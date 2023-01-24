import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import Footer from '../Shared/Footer/Footer';
import useAdmin from '../Shared/hooks/useAdmin';
import useSeller from '../Shared/hooks/useSeller';
import Navbar from '../Shared/Navbar/Navbar';

const DashboardLayout = () => {
  const {user} = useContext(AuthContext);
  const [isAdmin] = useAdmin(user?.email)
  const [isSeller] = useSeller(user?.email)
  return (
    <div>
       <Navbar></Navbar>
       <div className="drawer drawer-mobile ">
  <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content ">
  <Outlet></Outlet>  
  </div> 
  <div className="drawer-side">
    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label> 
    <ul className="menu  p-4 w-80 bg-accent text-white text-xl pt-8">
      <li><Link to="/dashboard">My Orders</Link></li>
      <li><Link to="/dashboard/wishlist">My Wishlist</Link></li>
      {
          isSeller && <>
              <li><Link to="/dashboard/addProduct">Add Product</Link></li>
              <li><Link to="/dashboard/myProducts">My Products</Link></li>
          </>
       }
       {
          isAdmin && <>
              <li><Link to="/dashboard/allusers">All Users</Link></li>
              <li><Link to="/dashboard/users/sellers">All Sellers</Link></li>
              <li><Link to="/dashboard/users/buyers">All Buyers</Link></li>
          </>
       }      
    </ul>  
  </div>
</div>
<Footer></Footer>
</div>
  );
};

export default DashboardLayout;