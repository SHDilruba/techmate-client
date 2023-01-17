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
import AdminRoute from "../../Routes/AdminRoute/AdminRoute";
import ManageSellers from "../../Pages/Dashboard/Dashboard/ManageSellers/ManageSellers";
import AllUsers from "../../Pages/Dashboard/Dashboard/AllUsers/AllUsers";
import Dashboard from "../../Pages/Dashboard/Dashboard/Dashboard";
import BookingModal from "../../components/BookingModal/BookingModal";

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
        path: '/products/:id',
        element: <PrivateRoute><BookingModal></BookingModal></PrivateRoute>
        // loader: ({params}) => fetch(`http://localhost:5000/products/${params.id}`)
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
        element: <Dashboard></Dashboard>
      },
      {
        path: '/dashboard/allusers',
        element: <AllUsers></AllUsers>
      },
      {
        path: '/dashboard/managesellers',
        element:
        <ManageSellers></ManageSellers>
      },
    ]
  }

])

export default router;