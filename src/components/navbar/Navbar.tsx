import { useContext, useState } from 'react'
import './navbar.css'
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri'
import logo from '../../assets/logo.svg';
import signin from '../../assets/signin.svg';
import cart from '../../assets/cart.svg';
import { useShoppingCart } from '../../context/ShoppingCartContext';
import { useHref } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [toggleMenuSign, setToogleMenuSign] = useState(false);
  const { openCart, cartQuantity } = useShoppingCart()

  
  const openMenu = () => {
    setToggleMenu(true)
    setToogleMenuSign(false)
  }
  const openSignMenu = () => {
    setToggleMenu(false)
    setToogleMenuSign(true)
  }

  return (
    <div className="webshop__navbar">
      <div className="webshop__navbar-links">
        <div className="webshop__navbar-links_logo">
          <img src={logo} />
        </div>
        <div className="webshop__navbar-links_container">
          <p><a href="/">Home</a></p>
          <p><a href="/allproducts">Products</a></p>
          <p><a href="/aboutus">About us</a></p>
        </div>
      </div>
      <div className="webshop__navbar-signin ">
      {toggleMenuSign
          ? <RiCloseLine color="#fff" size={27} onClick={() => setToogleMenuSign(false)} />
          : <img src={signin} onClick={() => openSignMenu()} />}
        {toggleMenuSign && (
        <div className="webshop__navbar-menu_container scale-up-center">
          <div className="webshop__navbar-menu_container-links">
          <p><a href="/signin">Sign In</a></p>
          <p><a href="/signup">Sign Up</a></p>
          </div>
        </div>
        )}
      </div>
      <div className="webshop__navbar-cart">
        <Link to={"/cart"}>
        <img src={cart}/>
      <p>{cartQuantity}</p>
        </Link>
      </div>
      <div className="webshop__navbar-menu">
        {toggleMenu
          ? <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
          : <RiMenu3Line color="#fff" size={27} onClick={() => openMenu()} />}
        {toggleMenu && (
        <div className="webshop__navbar-menu_container scale-up-center">
          <div className="webshop__navbar-menu_container-links">
          <p><a href="/">Home</a></p>
          <p><a href="/products">Products</a></p>
          <p><a href="/aboutus">About us</a></p>
          </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;