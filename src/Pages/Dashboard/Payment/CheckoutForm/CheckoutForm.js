import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

const CheckoutForm = ({booking}) => {
  const { email, user_name, _id, resale_price, name } = booking;

 const [cardError, setCardError] = useState('');
  const [success, setSuccess] = useState('');
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const [clientSecret, setClientSecret] = useState("");

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    fetch("https://techmate-server2.vercel.app/create-payment-intent", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json", 
        authorization: `bearer ${localStorage.getItem('accessToken')}`
      },
      body: JSON.stringify({ resale_price }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [resale_price]);

const handleSubmit = async(event)=>{
  event.preventDefault();

  if (!stripe || !elements) {
    return;
  }

  const card = elements.getElement(CardElement);
  if (card == null) {
    return;
  }

  const {error, paymentMethod} = await stripe.createPaymentMethod({
    type: 'card',
    card
  });

  if (error) {
    console.log(error);
    setCardError(error.message);
  }
  else{
    setCardError('');
  }
  setSuccess('');
  setProcessing(true);

  const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user_name,
            email: email
         },
       },
     },
   );
   if(confirmError){
       setCardError(confirmError.message);
       return;
   }
   if(paymentIntent.status === "succeeded"){
       const payment = {
            resale_price,
            transactionId: paymentIntent.id,
            email,
            bookingId: _id
       }
       fetch('https://techmate-server2.vercel.app/payments', {
         method: 'POST',
         headers: {
          'content-type': 'application/json',
           authorization: `bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify(payment)
       })
       .then(res => res.json())
       .then(data => {
         if(data.insertedId){
          setSuccess('Congrats! Your payment is completed');
           setTransactionId(paymentIntent.id);
         }
       })
     }
      setProcessing(false);
}

const handleProductUpdate = name =>{
  fetch(`https://techmate-server2.vercel.app/products/paid/${name}`,{
      method: 'PUT',
      headers: {
         authorization: `bearer ${localStorage.getItem('accessToken')}`
      }
  })
   .then(res => res.json())
   .then (data => {
       if(data.modifiedCount > 0){
        toast.success('updated successfully')
       }
   })
 };

  return (
     <div>
     <form onSubmit={handleSubmit}  className='border-4 p-5 rounded-lg'>
    <CardElement
      options={{
        style: {
          base: {
            fontSize: '16px',
            color: '#424770',
            '::placeholder': {
              color: '#aab7c4',
            },
          },
          invalid: {
            color: '#9e2146',
          },
        },
      }}
    />
    <button 
     onClick={()=>handleProductUpdate(name)}  
    className='btn btn-sm mt-8 btn-accent' 
    type="submit"
    disabled={!stripe || !clientSecret || processing}
     >
      Pay
    </button>
  </form>

   <p className='text-red-500'>{cardError}</p>
    {
        success && <div className='text-center'>
           <p className='text-green-500 mt-5 mb-1 text-lg'>{success}</p>
           <p><span>Your transactionId:</span> <span className='font-bold text-accent'>{transactionId}</span></p>
        </div>
    } 
     </div>
  );
};

export default CheckoutForm;