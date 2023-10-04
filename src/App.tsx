import React, { useState } from 'react'
import { Navbar } from './components'
import './app.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Category } from './hooks/useCategories'
import { Store } from './pages/Store'
import Home from './pages/Home'
import ProductDetail from './components/ProductDetail/ProductDetail'
import { ShoppingCartProvider } from './context/ShoppingCartContext'
import { ShoppingCart } from './components/Cart/ShoppingCart'

const App = () => {

  return (
  <ShoppingCartProvider>
  <Router>
    <div className='App'>
        <div className='gradient__bg'>
          <Navbar/>
        </div>
      <Routes>
      <Route path="/" element={<Home/>}/>
        <Route path="/allproducts" element={<Store/>}/>
        <Route path="/aboutus" element={<ProductDetail/>}/>
        <Route path="/cart" element={<ShoppingCart/>}/>
      </Routes>
      </div>
    </Router>
    </ShoppingCartProvider>
  )
}

export default App 