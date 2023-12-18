import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Cookies from 'js-cookie';
import { useShoppingCart } from '../context/ShoppingCartContext';
import useProductsCart from '../hooks/useProductsCart';
import "./paymentSuccess.css"
import axiosInstance from '../services/axiosInstance';

const PaymentSuccess = () => {
    const { cartItems, clearCart } = useShoppingCart();
    const userId = Cookies.get('id') || '';
    const { data: products, error, isLoading } = useProductsCart();
    const productsInCart = cartItems.map(cartItem => {
        const product = products?.find(p => p.id === cartItem.id);
        return {
          id: cartItem.id,
          quantity: cartItem.quantity,
          amount: product?.price
        };
    });

    const total = cartItems.reduce((total, cartItem) => {
        const item = products?.find(i => i.id === cartItem.id);
        return total + (item?.price || 0) * cartItem.quantity;
      }, 0);

    const [orderAdded, setOrderAdded] = useState(false);
    const navigate = useNavigate();


    const finalizeOrder = async () => {
        try {
            const response =  await axiosInstance.post('payments/finalize-order', {
                userId: userId,
                cartItems: productsInCart,
                totalPrice: total,
            });
        } catch (error) {
        }
    };


    const handleButtonClick = () => {
        finalizeOrder();
        navigate('/');
        clearCart()
    };

    return (
        <div className="payment-success-container">
            <div className="success-icon">&#10003;</div>
            <h2 className="heading">Payment Successful</h2>
            <p className="message">Your payment has been processed successfully.</p>
            <button onClick={handleButtonClick}>Continue to Home page</button>
        </div>
    );
};

export default PaymentSuccess;
