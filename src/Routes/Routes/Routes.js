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
import AddProduct from "../../Pages/Dashboard/AddProduct/AddProduct";
import AllUsers from "../../Pages/Dashboard/AllUsers/AllUsers";
import MyOrders from "../../Pages/Dashboard/MyOrders/MyOrders";
import MyWishList from "../../Pages/Dashboard/MyWishList/MyWishList";
import Payment from "../../Pages/Dashboard/Payment/Payment";
import AdminRoute from "../AdminRoute/AdminRoute";
import AllSeller from "../../Pages/Dashboard/AllSeller/AllSellers";
import AllBuyers from "../../Pages/Dashboard/AllBuyers/AllBuyers";
import SellerRoute from "../SellerRoute/SellerRoute";
import MyProducts from "../../Pages/Dashboard/MyProducts/MyProducts";
import AdsProductDetail from "../../Pages/AdsProductDetail/AdsProductDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <DisplayError></DisplayError>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "/home",
        element: <Home></Home>
      },
      {
        path: "*",
        element: <About></About>
      },
      {
        path: "/blog",
        element: <Blog></Blog>
      },
      {
        path: "/category/:id",
        element: (
          <PrivateRoute>
            <CategoryProducts></CategoryProducts>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/products/category/${params.id}`)
      },
      {
        path: "/productDetail/:id",
        element: (
          <PrivateRoute>
            <AdsProductDetail></AdsProductDetail>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/products/${params.id}`)
      },
      {
        path: "/login",
        element: <Login></Login>
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    errorElement: <DisplayError></DisplayError>,
    children: [
      {
        path: "/dashboard",
        element: <MyOrders></MyOrders>
      },
      {
        path: "/dashboard/wishlist",
        element: <MyWishList></MyWishList>
      },
      {
        path: "/dashboard/addProduct",
        element: (
          <SellerRoute>
             <AddProduct></AddProduct>
          </SellerRoute>
        )
      },
      {
        path: "/dashboard/myProducts",
        element: (
          <SellerRoute>
             <MyProducts></MyProducts>
          </SellerRoute>)
      },
      {
        path: "/dashboard/allusers",
        element: (
          <AdminRoute>
            <AllUsers></AllUsers>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/users/sellers",
        element: (
          <AdminRoute>
            <AllSeller></AllSeller>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/users/buyers",
        element: (
          <AdminRoute>
            <AllBuyers></AllBuyers>
          </AdminRoute>
        ),
      },
      {
        path: '/dashboard/payment/:id',
        element: <Payment></Payment>,
        loader: ({params}) => fetch(`http://localhost:5000/bookings/${params.id}`)
      },
    ],
  },
]);

export default router;

