import React from 'react';
import { Link } from 'react-router-dom';
import { useShoppingCart } from "../../context/ShoppingCartContext";
import { CartItem } from "../CartItem/CartItem";
import useProducts from "../../hooks/useProducts";
import { isUserSignedIn } from "../../utills/authUtils";
import useSignIn from '../../hooks/useSignIn';
import { Console } from 'console';


export function ShoppingCart() {
  const { cartItems } = useShoppingCart();
  const { data: products, error, isLoading } = useProducts({
    product: null,
    category: null,
    sortOrder: "",
    searchText: "",
  });

  const isLoggedIn = isUserSignedIn();
  const { user } = useSignIn();

  console.log(localStorage.getItem('token'))
  return (
    <>
      {error && <p>{error.message}</p>}
      <div className="website__productgrid section__padding">
        <div className="website__productgrid-container">
          <div className="website__productgrid-container_userinfo">
            {isLoggedIn ? (
              <div>
                <p>{`Welcome, ${user?.firstName} ${user?.lastName}`}</p>
                <p>{`Welcome, ${user?.firstName} ${user?.lastName}`}</p>
              </div>
            ) : (
              <div>
                <Link to="/signin">
                  <button>Sign In</button>
                </Link>
                <Link to="/signup">
                  <button>Sign Up</button>
                </Link>
              </div>
            )}
          </div>
          <div className="website__productgrid-container_content">
            {isLoading}
            {cartItems.map((item) => (
              <CartItem key={item.id} {...item} />
            ))}
            <div>
              Total: $
              {cartItems.reduce((total, cartItem) => {
                const item = products?.find((i) => i.id === cartItem.id);
                return total + (item?.price || 0) * cartItem.quantity;
              }, 0)}
            </div>
            {isLoggedIn ? (
              <button>Continue</button>
            ) : (
              <button disabled={!isLoggedIn}>
                Continue
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
