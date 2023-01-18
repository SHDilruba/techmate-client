import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import useAdmin from '../Shared/hooks/useAdmin';
import Navbar from '../Shared/Navbar/Navbar';

const DashboardLayout = () => {
  const {user} = useContext(AuthContext);
  const [isAdmin] = useAdmin(user?.email)
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
    <ul className="menu p-4 w-80 text-base-content bg-accent text-white text-xl pt-8">
      <li><Link to="/dashboard">My Orders</Link></li>
      <li><Link to="/dashboard/wishlist">My Wishlist</Link></li>
       {
          isAdmin && <>
              <li><Link to="/dashboard/allusers">All Users</Link></li>
              <li><Link to="/dashboard/managesellers">Manage  Sellers</Link></li>
          </>
       }
    </ul>  
  </div>
</div>
</div>
  );
};

export default DashboardLayout;