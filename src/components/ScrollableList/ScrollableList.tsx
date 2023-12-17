import React, { useRef } from 'react';
import './scrollableList.css';
import ScrollableProductCard from '../scrollableProductCard/ScrollableProductCard';
import useTopTenProducts from '../../hooks/useTopTenProducts'; 

export function ScrollableList() {
    const { data: productsData, isLoading, error } = useTopTenProducts();
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const { scrollLeft, clientWidth } = scrollContainerRef.current;
            const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
            scrollContainerRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!productsData) return <div>No products found.</div>;

    const products = Object.values(productsData);

    return (
        <div className="scrollable-list">
            <button className="scroll-left" onClick={() => scroll('left')}>‹</button>
            <div className="scroll-container" ref={scrollContainerRef}>
                {products.map(item => (
                    <ScrollableProductCard product={item} key={item.id}/>
                ))}
            </div>
            <button className="scroll-right" onClick={() => scroll('right')}>›</button>
        </div>
    );
};

export default ScrollableList;
