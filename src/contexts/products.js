import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

import { defaultQueryParameters } from '../components/Makeup';

export const productsContext = createContext({});

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [queryParameters, setQueryParameters] = useState('');
  const [hasFailed, setHasFailed] = useState(false);
  // Use useEffect to fetch products from the API and update the products state when the queryParameters state changes
  useEffect(() => {
    // Set isLoading state to true
    setIsLoading(true);
    // Make an API call using axios and the query parameters
    axios({
      url: `https://makeup-api.herokuapp.com/api/v1/products.json?${
        queryParameters || defaultQueryParameters
      }`,
    })
      .then(({ data }) => {
        // Update the products state with the data from the API response and set hasFailed state to false
        setProducts(data);
        setHasFailed(false);
      })
      .catch(() => {
        // If the API call fails, set hasFailed state to true
        setHasFailed(true);
      })
      .finally(() => {
        // Set isLoading state to false
        setIsLoading(false);
      });
  }, [queryParameters]);
  // Render the products context provider with the products, isLoading, setQueryParameters, and hasFailed values
  return (
    <productsContext.Provider
      value={{ products, isLoading, setQueryParameters, hasFailed }}
    >
      {children}
    </productsContext.Provider>
  );
};

export const useProductsStore = () => useContext(productsContext);
