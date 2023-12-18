import React from 'react';
import { Order } from '../../hooks/useOrder';
import "./orderCard.css"

interface OrderCardProps {
    order: Order;
    onClick: () => void;
  }

  
  const OrderCard: React.FC<OrderCardProps> = ({ order, onClick }) => {
    return (
      <div className="order-card" onClick={onClick}>
      <h3>Order ID: {order.orderId}</h3>
      <p>Date: {new Date(order.date).toLocaleDateString()}</p>
      <p>Total Quantity: {order.totalQuantity}</p>
      <p>Total Price: ${order.totalPrice.toFixed(2)}</p>
      <p>Order Status: {order.orderStatus}</p>
      <div className="payment-details">
        <p>Payment ID: {order.payment.paymentId}</p>
        <p>Transaction Number: {order.payment.transactionNumber}</p>
        <p>Card Number: {order.payment.cardNumber}</p>
      </div>
    </div>
  );
};

export default OrderCard;