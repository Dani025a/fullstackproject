// src/pages/OrdersPage.tsx

import useOrder from '../hooks/useOrder';
import OrdersList from '../components/orders/OrderList';
import Cookies from 'js-cookie';


const Orders = () => {
  const userId = "2897";
  const { data: orders, isLoading, isError } = useOrder(userId, true);

  if (isLoading) return <div>Loading orders...</div>;
  if (isError) return <div>Error loading orders.</div>;

  return (
    <div>
        <h1>HI</h1>
        <OrdersList orders={orders || []}/>
    </div>
  );
};

export default Orders;
