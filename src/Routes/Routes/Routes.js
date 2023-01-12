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
        element: <Blog></Blog>,
        loader: () => fetch('http://localhost:5000/blog')
      },
      {
        path: '/category/:id',
        element: <CategoryProducts></CategoryProducts>,
        loader: ({params}) => fetch(`http://localhost:5000/category/${params.id}`)
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
        element: <div></div>
      }
    ]
  }

])

export default router;