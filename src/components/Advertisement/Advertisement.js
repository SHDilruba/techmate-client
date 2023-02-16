import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Advertisement = () => {
  const [advertisementProducts, setAdvertisementProducts] = useState([]);

  useEffect(() => {
    fetch("https://techmate-server2.vercel.app/advertisementProducts")
      .then((res) => res.json())
      .then((data) => setAdvertisementProducts(data));
  }, []);

  return (
    <>
    {advertisementProducts.length > 0 ?
     <>
       <div>    
         <div className="mx-4 md:mx-auto shadow-xl">
           <div className="carousel carousel-center rounded-lg mb-[3rem] mt-[6rem] md:my-[8rem]">
                    {
                       advertisementProducts?.map((product) =>(
                      <div key={product._id}>
                        {
                         !product.paid &&
                         <>
                          <Link to={`/productDetail/${product._id}`}>
                          <div className="carousel-item h-[14rem] w-[30.3rem] relative"> 
                             <img className="w-[29.4rem]" src={product?.img} alt="" />
                           <div className="absolute left-[9rem] top-[6rem] text-white bg-secondary rounded-md">
                              <p className="text-center ">Advertisement</p>
                              <button 
                                  className="btn btn-sm btn-outline bg-black text-[1.1rem] text-white font-semibold"
                                  >{product.name}
                           </button>
                           </div>
                          </div>
                       </Link>
                         </>
                        }
                       </div>
                   ))
                }
           </div>
         </div>
       </div>
     </>
     : 
    ('')
     }
   </>
  );
};

export default Advertisement;

