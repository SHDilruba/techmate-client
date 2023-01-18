import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../../Layout/DashboardLayout";
import Main from "../../Layout/Main";
import Home from "../../Pages/Home/Home";
import Login from "../../Pages/Login/Login";
import SignUp from "../../Pages/SignUp/SignUp";
import Blog from "../../Pages/Blog/Blog";
import DisplayError from "../../Shared/DisplayError/DisplayError";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import CategoryProducts from "../../Pages/CategoryProducts/CategoryProducts";
import About from "../../Pages/About/About";
import AddProduct from "../../Pages/AddProduct/AddProduct";
import ManageSellers from "../../Pages/Dashboard/Dashboard/ManageSellers/ManageSellers";
import AllUsers from "../../Pages/Dashboard/AllUsers/AllUsers";
import MyOrders from "../../Pages/Dashboard/MyOrders/MyOrders";
import MyWishList from "../../Pages/Dashboard/MyWishList/MyWishList";
import Payment from "../../Pages/Dashboard/Payment/Payment";
import AdminRoute from "../AdminRoute/AdminRoute";

 const router = createBrowserRouter([
  {
    path: '/',
    element: <Main></Main>,
    errorElement: <DisplayError></DisplayError>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/home',
        element: <Home></Home>
      },
      {
        path: '*',
        element: <About></About>
      },
      {
        path: '/blog',
        element: <Blog></Blog>
      },
      {
        path: '/category/:id',
        element: <PrivateRoute><CategoryProducts></CategoryProducts></PrivateRoute>,
        loader: ({params}) => fetch(`http://localhost:5000/category/${params.id}`)
    },
    {
      path: '/addProduct',
      element: <PrivateRoute><AddProduct></AddProduct></PrivateRoute>,
      loader: () => fetch('http://localhost:5000/products')
    },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/signup',
        element: <SignUp></SignUp>
      }
    ]
  },
  {
    path: '/dashboard',
    element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    errorElement: <DisplayError></DisplayError>,
    children: [
      {
        path: '/dashboard',
        element: <MyOrders></MyOrders> 
      },
      {
        path: '/dashboard/wishlist',
        element: <MyWishList></MyWishList> 
      },
      {
        path: '/dashboard/allusers',
        element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
      },
      {
        path: '/dashboard/managesellers',
        element:
        <AdminRoute><ManageSellers></ManageSellers></AdminRoute>
      },
      {
        path: '/dashboard/payment/:id',
        element: <Payment></Payment>
      },
    ]
  }

])

export default router;