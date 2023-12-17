// src/components/OrderDetails.tsx

import React from 'react';
import { useParams } from 'react-router-dom';
import useOrderDetails from '../../hooks/useOrderDetails';
import './ordersDetails.css';



const OrderDetails: React.FC = () => {
    const { orderId } = useParams<{ orderId: string }>();
    const { data: order, isLoading, isError } = useOrderDetails(orderId ?? '', true);
  console.log(order)
    if (isLoading) return <div>Loading order details...</div>;
    if (isError || !order) return <div>Unable to fetch order details.</div>;
    const paymentDetail = order.payment.paymentDetails[0];
    let statusClass = "";
    switch (order.orderStatus) {
        case "Order received":
            statusClass = "status-received";
            break;
        case "In Progress":
            statusClass = "status-in-progress";
            break;
        case "Order delivered":
            statusClass = "status-delivered";
            break;
        default:
            statusClass = "";
    }
    return (
      <div className="order-details-container">
        <h2>Order Details (ID: {orderId})</h2>
        <p>Total Price: ${order.totalPrice.toFixed(2)}</p>
        <p className={statusClass}>Status: {order.orderStatus}</p>
        <div className="payment-info">
          <h3>Payment Information</h3>
          <p>Payment ID: {order.payment.id}</p>
          <p>Transaction Number: {paymentDetail.transaction_number}</p>
          <p>Card Number: {paymentDetail.card_number}</p>
        </div>
        <div className="line-items">
          <h3>Line Items</h3>
          {order.lineItems.map((item) => (
            <div key={item.productId} className="line-item">
              <p>{item.name}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ${item.price}</p>
              <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default OrderDetails;
