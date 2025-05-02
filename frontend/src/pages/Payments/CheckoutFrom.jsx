// import { AppContext } from '@/context/AppProvider';
import { AuthContext } from '@/context/AuthProvider';
import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements} from '@stripe/react-stripe-js';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';

const CheckoutFrom = ({fees,doctorName,bookingId}) => {
    // const[paymentSuccess,setPaymentSuccess] = useState([])
    const stripe = useStripe();
    const elements = useElements();
    console.log(stripe,elements);
    const [paymentSuccess, setPaymentSuccess] = useState('');
    const [error, setError] = useState(null);
    const [clientSecret, setClientSecret] = useState('');    
    const navigate = useNavigate()          
    // const [appointments, setAppointments] = useState([]);
    // console.log(doctors);

    const{user} = useContext(AuthContext);

    useEffect(() => {
        if (!fees || !user?.email || !doctorName) return;
      
        fetch("http://localhost:5000/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fees }), // send `price`, not `amount`
        })
          .then(res => res.json())
          .then(data => {
            console.log("📦 Received client secret:", data.clientSecret);
            setClientSecret(data.clientSecret);
          })
          .catch(err => console.error("❌ Error fetching client secret:", err));
      }, [fees, user?.email, doctorName]);

    const handleSubmit =async (e) =>{
        e.preventDefault();
  
        if (!stripe || !elements) return;
      
        const card = elements.getElement(CardNumberElement);
        if (!card) return;
      
        const { error: methodError, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
          });

          if (methodError) {
            setError(methodError.message);
          } else {
            setError('');
            console.log("Payment method:", paymentMethod);
          }
          if (!clientSecret) {
            console.error("Client secret missing");
            return;
          }

          const{error: confirmError, paymentIntent} = await stripe.confirmCardPayment(clientSecret,{
            payment_method: {
                card,
                billing_details: {
                  email: user?.email || "anonymous",
                  name: user?.displayName || user?.name || "No Name"
                },
              },
              
          })
          if (confirmError) {
            console.log(confirmError.message);
            setError(confirmError.message);
          } else {
            if (paymentIntent.status === 'succeeded') {
              console.log(paymentIntent.id);
              setPaymentSuccess(paymentIntent.id);

              const payment = {
                transactionId: paymentIntent.id,
                amount: fees,
                email: user?.email,
                appointmentId: bookingId,
                name: doctorName,
                paymentTime: new Date().toISOString(),
                status: 'pending'
              };
              fetch('http://localhost:5000/payments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payment)
              })
                .then(res => res.json())
                .then(data => {
                  if (data?.insertedId && data?.deletedBooking === 1) {
                    Swal.fire({
                      position: "top-end",
                      icon: "success",
                      title: "✅ Payment completed and booking removed!",
                      showConfirmButton: false,
                      timer: 1500
                    });
                    navigate('/payment-success');
                  } else {
                    Swal.fire({
                      icon: "error",
                      title: "Oops...",
                      text: "Something went wrong with payment or booking deletion.",
                    });
                  }
                });
            }
            }
            
          
    }
    

  return (
    <div className='my-10'>
        <form onSubmit={handleSubmit} className="max-w-xl w-full bg-white p-8 rounded-2xl shadow-xl">
        <div className='flex justify-between'>
        <h2 className="text-2xl font-bold mb-6 text-center">Payment Details</h2>
        <span className="text-2xl font-bold mb-6 text-center">{fees}</span>
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-gray-700">Card Number</label>
          <CardNumberElement className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 " />
        </div>

        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label className="block mb-2 text-gray-700">Expiry Date</label>
            <CardExpiryElement className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400" />
          </div>
          <div className="flex-1">
            <label className="block mb-2 text-gray-700">CVC</label>
            <CardCvcElement className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400" />
          </div>
        </div>

        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}

        <button
          type="submit"
          disabled={!stripe || !clientSecret}
          className="w-full bg-purple-500 text-white py-3 rounded-md hover:bg-purple-600 transition-all disabled:bg-gray-400"
        >
          Pay Now
        </button>

        {paymentSuccess && (
          <p className="text-green-600 mt-4 text-center">🎉 Payment successful! ID: {paymentSuccess}</p>
        )}
      </form>
    </div>
  )
}

export default CheckoutFrom