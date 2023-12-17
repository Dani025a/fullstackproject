import React from 'react';
import Brand from '../components/brands/Brand';
import ScrollableList from '../components/ScrollableList/ScrollableList';
import "./home.css";

const Home = () => {
  return (
    <div className='website__home-container'>
      <div className='website__home-container_text'>
        <h1>
          Welcome to the shop
        </h1>
      </div>
      <div className='website__home-container_centered-text'>
        <p>Best sold products</p>
      </div>
      <div className='website__home-container_scrollableList'>
        <ScrollableList />
      </div>
      <div className='website__home-container_centered-text'>
        <p>Our partners</p>
      </div>
      <Brand />
    </div>
  );
};

export default Home;
