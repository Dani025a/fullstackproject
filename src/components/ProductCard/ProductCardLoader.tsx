import React from 'react';
import './ProductCardLoader.css'
import imageLoader from '../../assets/imageLoarder.svg'

const ProductCardLoader = () => {
  return(
    <div className="website__productgrid-container_productcard loader">
      <div className="website__productgrid-container_productcard-image loader-image">
        <img src={imageLoader} alt="productgrid_image-loader" />
      </div>
      <div className="website__productgrid-container_productcard-content">
        <div className="loader-text" style={{width: '80%', height: '25px', marginBottom: '10px'}}></div>
        <div className="loader-text" style={{width: '50%', height: '20px'}}></div>
      </div>
      <div className="website__productgrid-container_productcard-buy">
        <div className="loader-button"></div>
      </div>
      <div className="website__productgrid-container_productcard-learnmore">
        <div className="loader-button"></div>
      </div>
    </div>
  );
};

export default ProductCardLoader;
