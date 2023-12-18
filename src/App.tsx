import { Navbar } from './components'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Store } from './pages/Store'
import Home from './pages/Home'
import ProductDetail from './components/ProductDetail/ProductDetail'
import { ShoppingCartProvider } from './context/ShoppingCartContext'
import { ShoppingCart } from './components/Cart/ShoppingCart'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import { useAuth } from './context/authContext'
import AboutUs from './pages/AboutUs'
import { Profile } from './pages/Profile'
import Orders from './pages/Orders'
import OrderDetails from './components/ordersDetails/OrdersDetails'
import PaymentSuccess from './pages/PaymentSuccess'

const App = () => {
  const { isLogged } = useAuth(); 

  return (
  <ShoppingCartProvider>
  <Router>
    <div className='App'>
        <div className='gradient__bg'>
          <Navbar/>
        </div>
      <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/aboutus" element={<AboutUs/>}/>
        <Route path="/products" element={<Store/>}/>
        <Route path="/cart" element={<ShoppingCart/>}/>
        <Route path="/product/:name" element={<ProductDetail/>} />

        {isLogged ? (
              <>
                <Route path='/profile' element={<Profile />} />
                <Route path='/orders' element={<Orders/>} />
                <Route path="/order/:orderId" element={<OrderDetails/>} />
                <Route path="/payment-success" element={<PaymentSuccess />} /> 

              </>
            ) : (
              <>
                <Route path='/signin' element={<Signin />} />
                <Route path='/signup' element={<Signup />} />
              </>
            )}
      </Routes>
      </div>
    </Router>
    </ShoppingCartProvider>
  )
}

export default App 