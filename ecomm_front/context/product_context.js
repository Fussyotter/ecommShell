// context/product_context.js
import { createContext, useState, useEffect } from 'react';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		async function fetchProducts() {
			const response = await fetch('http://localhost:8000/api/');
			const data = await response.json();
			setProducts(data);
		}

		fetchProducts();
	}, []);

	return (
		<ProductContext.Provider value={{ products }}>
			{children}
		</ProductContext.Provider>
	);
};
