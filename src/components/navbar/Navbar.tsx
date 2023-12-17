import { useEffect, useState } from 'react'
import './navbar.css'
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri'
import logo from '../../assets/logo.svg';
import signin from '../../assets/signin.svg';
import cart from '../../assets/cart.svg';
import { useShoppingCart } from '../../context/ShoppingCartContext';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';


const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [toggleMenuSign, setToogleMenuSign] = useState(false);
  const {cartQuantity } = useShoppingCart()
  const [scrolled, setScrolled] = useState(false);

  const { isLogged, logout } = useAuth(); 
  const navigate = useNavigate();

  const handleSignOut = () => {
    navigate("/signin")
    logout();
  };

  const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 60) {
          setScrolled(true);
      } else {
          setScrolled(false);
      }
  };
  
  const openMenu = () => {
    setToggleMenu(true)
    setToogleMenuSign(false)
  }
  const openSignMenu = () => {
    setToggleMenu(false)
    setToogleMenuSign(true)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
}, []);

let navbarClasses = ['webshop__navbar', 'gradient__bg'];
if (scrolled) {
    navbarClasses.push('scrolled');
}

return (
  <div className={navbarClasses.join(' ')}>
    <div className="webshop__navbar">
      <div className="webshop__navbar-links">
        <div className="webshop__navbar-links_logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="webshop__navbar-links_container">
          <p><Link to="/">Home</Link></p>
          <p><Link to="/products">Products</Link></p>
          <p><Link to="/aboutus">About us</Link></p>
        </div>
      </div>
      <div className="webshop__navbar-signin ">
        {isLogged ? (
                    <>
                    {toggleMenuSign
                      ? <RiCloseLine color="#fff" size={27} onClick={() => setToogleMenuSign(false)} />
                      : <img src={signin} alt="Sign In" onClick={() => openSignMenu()} />}
                    {toggleMenuSign && (
                      <div className="webshop__navbar-menu_container scale-up-center">
                        <div className="webshop__navbar-menu_container-links">
                        <p><Link to="/profile">Profile</Link></p>
                        <p><Link to="/orders">Orders</Link></p>
                        <p onClick={handleSignOut}><Link to="/home">Sign Out</Link></p>
                        </div>
                      </div>
                    )}
                  </>
          
        ) : (
          <>
            {toggleMenuSign
              ? <RiCloseLine color="#fff" size={27} onClick={() => setToogleMenuSign(false)} />
              : <img src={signin} alt="Sign In" onClick={() => openSignMenu()} />}
            {toggleMenuSign && (
              <div className="webshop__navbar-menu_container scale-up-center">
                <div className="webshop__navbar-menu_container-links">
                  <p><Link to="/signin">Sign In</Link></p>
                  <p><Link to="/signup">Sign Up</Link></p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      <div className="webshop__navbar-cart">
        <Link to="/cart">
          <img src={cart} alt="Cart" />
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
              <p><Link to="/">Home</Link></p>
              <p><Link to="/products">Products</Link></p>
              <p><Link to="/aboutus">About us</Link></p>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);
};

export default Navbar;