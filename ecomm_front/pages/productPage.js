import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import Head from 'next/head';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function CheckoutPage() {
	const [sessionId, setSessionId] = useState('');
	const [products, setProducts] = useState('');
	const [price, setPrice] = useState('');
	const [image, setImage] = useState('');

	useEffect(() => {
		const fetchSession = async () => {
			const response = await fetch(`http://localhost:8000/api/checkout/bigshoe/`);
			const data = await response.json();
			setSessionId(data.session_id);
			setProducts(data.product)
			setPrice(data.price);
			setImage(data.image);
		};

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
				<h1>Products</h1>
				<p>{products}</p>
				<p>{price}</p>
				<img
					src={`http://localhost:8000${image}`}
					alt='product'
					style={{ width: '100%', maxWidth: '400px' }}
				/>
				<h1>Checkout Page</h1>
				<button onClick={handleClick} disabled={!sessionId}>
					Pay with Stripe
				</button>
			</div>
		</>
	);
}
