import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import logo2 from "../../assets/icons/logo2.jpeg"

const Navbar = () => {
 const {user, logOut} = useContext(AuthContext);

 const handleLogOut = () =>{
  logOut()
  .then(() =>{})
  .catch(error => console.log(error));
}
  const menuItems = <React.Fragment>
         <li className='hover:text-accent'><Link to="/home">HOME</Link></li>
         <li className='hover:text-accent'><Link to="/Blog">BLOG</Link></li>
         <li className='hover:text-accent'><Link to="/about">ABOUT</Link></li>
        { user?.uid ? 
        <>
         <li className='hover:text-accent'><Link to="/dashboard">DASHBOARD</Link></li>
         <li><button onClick={handleLogOut}>SIGN OUT</button></li>
        </>
        :
        <li className='hover:text-accent'><Link to="/login"><button className="btn btn-outline btn-secondary btn-sm">LOGIN</button></Link> </li>
         }
     </React.Fragment>

  return (
    <div className="navbar flex bg-base-100 justify-between">
    <div className="navbar-start">
      <div className="dropdown">
        <label tabIndex={0} className="btn btn-ghost  lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </label>
        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
          {menuItems}
        </ul>
      </div>
      <img className="w-16 h-10 rounded-md p-0.5 bg-gradient-to-r from-secondary to-accent shadow-4xl" src={logo2} alt="" />

      <Link to="/" className="font-serif  ml-2 text-2xl text-secondary-focus hover:text-accent  ">TechMate</Link>
    </div>
    <div className="navbar-center hidden lg:flex">
      <ul className="menu menu-horizontal p-0">
          {menuItems}
      </ul>
    </div>
       <label htmlFor="dashboard-drawer" tabIndex={2} className="btn btn-ghost lg:hidden">
       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </label>
    </div>
  );
};

export default Navbar;