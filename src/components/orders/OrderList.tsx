// src/components/OrdersList.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Order } from '../../hooks/useOrder';
import './orderList.css';
import OrderCard from '../orcerCard/OrderCard';

interface OrdersListProps {
  orders: Order[];
}

const OrdersList: React.FC<OrdersListProps> = ({ orders }) => {
  const navigate = useNavigate();

  const handleCardClick = (orderId: string) => {
    navigate(`/order/${orderId}`);
  };

  return (
    <div className='order-list'>
      {orders.map(order => (
        <OrderCard key={order.orderId} order={order} onClick={() => handleCardClick(order.orderId.toString())} />
      ))}
    </div>
  );
};

export default OrdersList;
