import React from 'react';
import { useShoppingCart } from "../../context/ShoppingCartContext";
import { CartItem } from "../CartItem/CartItem";
import useProductsCart from '../../hooks/useProductsCart';
import useUser from '../../hooks/useUser';
import Cookies from 'js-cookie';
import { useAuth } from '../../context/authContext';
import './shoppingCart.css'
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import axiosInstance from '../../services/axiosInstance';

const stripePromise = loadStripe('pk_test_51MxewLIbogLlViBWYXMMHLPASmenZNgs92h1tYJeX8PWMjBnxItjuuCbbY598Fua1SXno3Ur3GzRzLNgROTIPQDp00B2OmFhh5');


export function ShoppingCart() {
  const userId = Cookies.get('id') || '';
  const { cartItems } = useShoppingCart();
  const { data: products, error, isLoading } = useProductsCart();
  const { isLogged } = useAuth(); 
  const { data: user } = useUser(userId, isLogged);
  const total = cartItems.reduce((total, cartItem) => {
    const item = products?.find(i => i.id === cartItem.id);
    return total + (item?.price || 0) * cartItem.quantity;
  }, 0);
  const productsInCart = cartItems.map(cartItem => {
    const product = products?.find(p => p.id === cartItem.id);
    return {
      id: cartItem.id,
      name: product?.name || 'Unknown Product',
      quantity: cartItem.quantity,
      amount: product?.price
    };
  });

  console.log(productsInCart)

  const handlePayment = async () => {
    const stripe = await stripePromise;
    if (!stripe) {
      console.log('Stripe.js has not loaded properly.');
      return;
    }

    try {
      const { data: { sessionId } } = await axiosInstance.post('payments/create-checkout-session', {
        amount: total * 100,
        items: productsInCart,
      });

      const result = await stripe.redirectToCheckout({ sessionId });
      if (result.error) {
        console.log(result.error.message);
      }
    } catch (error) {
      console.error('Error initiating Stripe checkout:', error);
    }
  };

  return (
    <>
      {error && <p>{error.message}</p>}
      <div className="website__cartshop section__padding">
        <div className="website__cartshop-cartimes-container">
          <div className="website__cartshop-cartitems-container_content">
            {isLoading && <p>Loading...</p>}
            {cartItems.map(item => (
              <CartItem key={item.id} {...item} />
            ))}
          </div>
        </div>
        <div className='website__cartshop-userinfo-container'>
          <div className='website__cartshop-userinfo-container-content'>
            <h1>Shopping Cart</h1>
            {isLogged ? (
              <> 
                <h4>Name: {user?.firstName} {user?.lastName}</h4>
                <p>Address: {user?.Address.street_name} {user?.Address.street_number}, {user?.Address.zip_code}, {user?.Address.city}</p>
                <p>Total: ${total.toFixed(2)}</p>
                <button onClick={handlePayment}>Continue</button>
              </>
            ) : (
              <>
                <p>Sign in or sign up to continue the purchase</p>
                <button>Sign In</button>
                <button>Sign Up</button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}