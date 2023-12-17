import React from 'react';
import { adidas, apple, chanel, hugo, versace } from './imports';
import './brand.css';

const Brand = () => (
    <div className="brand">
        <div className="brand-content">

            <div>
                <img src={adidas} alt="Adidas" />
            </div>
            <div>
                <img src={apple} alt="Apple" />
            </div>
            <div>
                <img src={chanel} alt="Chanel" />
            </div>
            <div>
                <img src={hugo} alt="Hugo" />
            </div>
            <div>
                <img src={versace} alt="Versace" />
            </div>
        </div>
    </div>
);

export default Brand;
