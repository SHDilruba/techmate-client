import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Advertisement = () => {
  const [advertisement, setAdvertisement] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/advertisementProducts")
      .then((res) => res.json())
      .then((data) => setAdvertisement(data));
  }, []);

  return (
   <>
     {advertisement.length > 0 ? (
       <div className="my-28 mx-8
       lg:mx-auto">
          <h2 className="text-3xl text-center text-secondary-focus font-sans font-semibold mb-7 mx-auto">
            Advertisement
          </h2>
            <div className="bg-secondary rounded-lg py-1 mx-auto px-2 shadow-xl">
              <div className="carousel carousel-center rounded-box bg-base-300">
               {advertisement.map((product) => (
                 <>
                  <Link to={`/productDetail/${product._id}`}>
                     <div className="carousel-item h-[14rem] w-[26rem]">
                        <img className="w-[26rem]" src={product?.img} alt="" />
                     </div>
                  </Link>
                </>
              ))}
            </div>
          </div>
        </div>
      ) 
      : 
      ( "" )
      }
    </>
  );
};

export default Advertisement;
