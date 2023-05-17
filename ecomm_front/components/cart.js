import React, { useEffect, useState, useContext } from 'react';
import { Csrf_context } from '../context/csrf_context';
import { useAuth } from '@/context/auth_context';


const Cart = () => {
    const [cart, setCart] = useState({ items: [], total: 0 });
	const { csrfToken } = useContext(Csrf_context);
	const {currentUser} = useAuth();

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
                credentials: 'include',
			});
			if (response.ok) {
				const data = await response.json();
				setCart(data); // Make sure to set to data.items, because you're sending items field from the backend
			} else {
				console.error(`Error ${response.status}: ${response.statusText}`);
			}
		} catch (error) {
			console.error('Error:', error);
		}
	};

	return (
		<div>
			<h2>Your Cart</h2>
			{cart.items.map((item) => (
				<div key={item.id}>
					<h3>{item.product.title}: {item.quantity}</h3>
					<p>Price: ${item.product.regular_price}</p>
				</div>
			))}
			<h3>Total: ${cart.total}</h3>
		</div>
	);
};

export default Cart;
