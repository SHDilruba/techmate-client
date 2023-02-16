import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData, useNavigation } from 'react-router-dom';
import Loading from '../../../Shared/Loading/Loading';
import CheckoutForm from './CheckoutForm/CheckoutForm';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK)
console.log(stripePromise);
const Payment = () => {
  const booking = useLoaderData();
  const {name, resale_price} = booking;
  const navigation = useNavigation()
  if(navigation.state === "loading") {
       return <Loading></Loading>
  }

  return (
    <>
     <div className='md:ml-[8rem] mt-[6rem] flex flex-col'>
       <h3 className='text-4xl'>Payment for <strong className='text-2xl text-secondary'>{name}</strong>
       </h3>
     <div className='flex flex-col text-center'>
        <p className='text-xl mt-12 bg-base-300 w-[26rem] p-2  rounded-md font-sans'>Please Pay <strong className='text-accent'>{resale_price}</strong> for your order</p>
        <div className='w-[26rem] mt-8'>
            <Elements stripe={stripePromise}>
                <CheckoutForm 
                    booking={booking}
                />
            </Elements>
        </div>
     </div>
   </div>
   </>
  );
};

export default Payment;