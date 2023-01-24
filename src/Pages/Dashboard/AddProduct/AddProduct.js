import React, { useContext, useEffect, useState } from "react";
import useTitle from "../../../Shared/hooks/useTitle";
import toast from "react-hot-toast";
import { AuthContext } from "../../../contexts/AuthProvider";
import useVerifySeller from '../../../Shared/hooks/useVerifySeller';
import Footer from "../../../Shared/Footer/Footer";

const AddProduct = () => {
  useTitle('addProduct');
  const {user} = useContext(AuthContext);
  const [isVerifiedSeller] = useVerifySeller(user?.email) 

  var showDate = new Date();
  var displayTodaysDate =
    showDate.getDate() +
    "/" +
    (showDate.getMonth() + 1) +
    "/" +
    showDate.getFullYear();

  const handleAddProduct = (event) => {
    event.preventDefault();
    const form = event.target;
    const category_id = form.category_id.value;
    const img = form.img.value;
    const seller_name = form.seller_name.value;
    const seller_quality = form.seller_quality.value;
    const email = form.email.value;
    const name = form.name.value;
    const description = form.description.value;
    const used = form.used.value;
    const condition = form.condition.value;
    const location = form.location.value;
    const mobile = form.mobile.value;
    const resale_price = form.resale_price.value;
    const original_price = form.original_price.value;
    const date = form.date.value;

    const product = {
      category_id,
      img,
      name,
      description,
      used,
      condition,
      location,
      mobile,
      resale_price,
      original_price,
      published_date: date,
      seller_name,
      seller_quality,
      email
    };

    console.log(product);

    fetch("http://localhost:5000/addProduct", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((er) => console.error(er));
    toast.success("Product added successfully");
    event.target.reset();
  };

  return (
    <div id="add-product" className=" pt-6 pb-3 container mx-auto">
      <h1 className="text-4xl text-accent text-center">Add Your Product</h1>
      <div className="review-form pt-5 mt-5 container text-center w-3/5 mx-auto">
        <form
          onSubmit={handleAddProduct}
          className="pt-10 pb-12 w-full bg-base-300 rounded-lg"
        >
          <div className="mx-auto">
            <input
              name="seller_name"
              type="text"
              className="form-control mx-auto text-center text-2xl w-2/3 text-secondary pt-2"
              placeholder="seller Name" defaultValue={user?.displayName} readOnly
            />           
              { isVerifiedSeller &&
                   <input
                   name="seller_quality"
                   type="text"
                   className="form-control mx-auto w-2/3 text-center text-[1rem] text-accent pb-1"
                   defaultValue= 'verified' readOnly
                   />
                  }      
              <input
                name="email"
                type="email"
                className="form-control text-center w-2/3 mx-auto bg-accent text-white py-1"
                placeholder="email" defaultValue={user?.email} readOnly
                />
          </div>   
          <div className="mb-5 mt-8">
            <input
              name="category_id"
              type="text"
              className="form-control text-center py-3 w-3/4 mx-auto"
              placeholder="category_id"
            />
          </div>
          <div className="mb-5">
            <input
              name="img"
              type="url"
              className="form-control text-center py-3 w-3/4 mx-auto"
              placeholder="photo URL"
            />
          </div>
          <div className="mb-5 ">
            <input
              name="name"
              type="text"
              className="form-control text-center py-3 w-3/4 mx-auto"
              placeholder="product title"
            />
          </div>
          <div className="mb-5 ">
            <input
              name="description"
              type="text"
              className="form-control text-center py-3 w-3/4 mx-auto"
              placeholder="description"
            />
          </div>
          <div className="mb-5">
            <input
              name="used"
              type="text"
              className="form-control text-center py-3 w-3/4 mx-auto"
              placeholder="used"
            />
          </div>
          <div className="mb-5">
            <input
              name="condition"
              type="text"
              className="form-control text-center py-3 w-3/4 mx-auto"
              placeholder="condition"
            />
          </div>
          <div className="mb-5">
            <input
              name="location"
              type="text"
              className="form-control text-center py-3 w-3/4 mx-auto"
              placeholder="location"
            />
          </div>
          <div className="mb-5">
            <input
              name="mobile"
              type="text"
              className="form-control text-center py-3 w-3/4 mx-auto"
              placeholder="mobile no"
            />
          </div>
          <div className="mb-5">
            <input
              name="resale_price"
              type="text"
              className="form-control text-center py-3 w-3/4 mx-auto"
              placeholder="resale_price"
            />
          </div>
          <div className="mb-5">
            <input
              name="original_price"
              type="text"
              className="form-control text-center py-3 w-3/4 mx-auto"
              placeholder="original-price"
            />
          </div>
          <div className="text-center pb-3">
            <input
              name="date"
              type="text"
              className="form-control text-center py-3 w-3/4 mx-auto mb-3"
              value={displayTodaysDate}
              readOnly
            />
          </div>
          <button
            className="btn btn-accent w-2/4 mt-3 mb-4 py-2 text-white hover:bg-secondary"
            type="submit"
          >
            Add Product
          </button>
        </form>
      </div>
      <Footer></Footer>
   </div>
  );
};

export default AddProduct;
