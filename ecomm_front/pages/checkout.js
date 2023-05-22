import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import Head from 'next/head';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function CheckoutPage() {
	const [sessionId, setSessionId] = useState('');
	const [cart, setCart] = useState([]);
	const [total, setTotal] = useState(0);

	useEffect(() => {
		const fetchCart = async () => {
			const response = await fetch(`http://localhost:8000/cart/`, {
                credentials: 'include',
                });
			const data = await response.json();
			setCart(data.items);
			setTotal(data.total);
		};

		const fetchSession = async () => {
			const response = await fetch(`http://localhost:8000/cart/checkout/`, {
                credentials: 'include',
                });
			const data = await response.json();
			setSessionId(data.id);
		};

		fetchCart();
		fetchSession();
	}, []);

	const handleClick = async () => {
		const stripe = await stripePromise;
		const { error } = await stripe.redirectToCheckout({ sessionId });
		if (error) {
			console.error(error);
		}
	};

	return (
		<>
			<Head>
				<title>Checkout</title>
			</Head>
			<div>
				<h1>Your Cart</h1>
				{cart.map((item) => (
					<div key={item.id}>
						<p>{item.product.title}</p>
						<p>{item.quantity}</p>
						<p>{item.product.regular_price}</p>
					</div>
				))}
				<p>Total: {total}</p>
				<button onClick={handleClick} disabled={!sessionId}>
					Checkout with Stripe
				</button>
			</div>
		</>
	);
}
