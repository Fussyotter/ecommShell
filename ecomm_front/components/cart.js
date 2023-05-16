import React, { useEffect, useState, useContext } from 'react';
import { Csrf_context } from '../context/csrf_context';


const Cart = () => {
	const [cartItems, setCartItems] = useState([]);
    const { csrfToken } = useContext(Csrf_context);

	useEffect(() => {
		// Fetch cart items from the backend when the component mounts
		fetchCartItems();
	}, []);

	const fetchCartItems = async () => {
		try {
			const response = await fetch('http://localhost:8000/cart/', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'X-CSRFToken': csrfToken,
				},
			});
			const data = await response.json();
			setCartItems(data);
		} catch (error) {
			console.error('Error:', error);
		}
	};

	return (
		<div>
			<h2>Your Cart</h2>
			{cartItems.map((item) => (
				<div key={item.id}>
					<h3>{item.product.title}</h3>
					<p>Quantity: {item.quantity}</p>
				</div>
			))}
		</div>
	);
};

export default Cart;
