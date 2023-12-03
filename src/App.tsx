import React, { useState } from 'react'
import { Navbar } from './components'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Category } from './hooks/useCategories'
import { Store } from './pages/Store'
import Home from './pages/Home'
import ProductDetail from './components/ProductDetail/ProductDetail'
import { ShoppingCartProvider } from './context/ShoppingCartContext'
import { ShoppingCart } from './components/Cart/ShoppingCart'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import { isUserSignedIn } from "./utills/authUtils";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(isUserSignedIn());

  return (
  <ShoppingCartProvider>
  <Router>
    <div className='App'>
        <div className='gradient__bg'>
          <Navbar/>
        </div>
      <Routes>
      <Route path="/home" element={<Home/>}/>
        <Route path="/products" element={<Store/>}/>
        <Route path="/aboutus" element={<ProductDetail/>}/>
        <Route path="/cart" element={<ShoppingCart/>}/>
        {isLoggedIn ? (
              <>
                <Route path='/profile' element={<Store />} />
                <Route path='/orders' element={<ProductDetail />} />
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