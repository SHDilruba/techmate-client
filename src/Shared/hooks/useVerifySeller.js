import { useEffect, useState } from "react";

const useVerifySeller = email =>{
  const [isVerifiedSeller, setIsVerifiedSeller] = useState(false);
  const [isVerifyLoading, setIsVerifyLoading] = useState(true);
   useEffect(() => {
      if(email){
        fetch(`http://localhost:5000/users/verify/${email}`)
        .then(res => res.json())
        .then(data =>{
               console.log(data);
               setIsVerifiedSeller(data.isVerifiedSeller);
               setIsVerifyLoading(false);
        })
      }
   }, [email]);
   return [isVerifiedSeller, isVerifyLoading];
}

export default useVerifySeller;