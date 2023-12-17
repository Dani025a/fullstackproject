import React from 'react'
import './productGrid.css'
import useProducts from "../../hooks/useProducts";
import ProductCard from '../ProductCard/ProductCard';
import { ProductQuery } from '../../pages/Store';
import ProductCardLoader from '../ProductCard/ProductCardLoader';
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from '../../utills/Spinner';


interface Props {
  productQuery: ProductQuery;
}



const ProductGrid = ({ productQuery }: Props) => {
  const { data, error, isLoading, fetchNextPage, hasNextPage } =
    useProducts(productQuery);


    const totalProductsCount = data?.pages.reduce((acc, page) => acc + (page.results?.length || 0), 0) || 0;


  if (error) return <div><p className="error-text">{error.message}</p></div>;
  
  return (
    <>
       <InfiniteScroll
      dataLength={totalProductsCount}
      next={() => fetchNextPage()}
      hasMore={hasNextPage || false}
      loader={<Spinner />}
    >
    {error && <p className="error-text">{error}</p>}
      <div className="website__productgrid section__padding">
        <div className="website__productgrid-container">
          <div className="website__productgrid-container_content">
            {isLoading && [...Array(20)].map((_, index) => (
              <ProductCardLoader key={index} />
            ))}
            {data?.pages.map((page, index) => (
               <React.Fragment key={index}>
                 {page.results.map((product) => (
              <ProductCard key={product.id} product={product}/>
            ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
      </InfiniteScroll>
    </>
  )
}

export default ProductGrid
