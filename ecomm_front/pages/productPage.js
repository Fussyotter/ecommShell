import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

export default function ProductPage({ product }) {
	const [loading, setLoading] = useState(false);

	const handleClick = async () => {
		setLoading(true);

		// Fetch the Stripe checkout session ID from the Django backend
		const response = await fetch(
			`http://localhost:8000/api/create-checkout-session/prodTest`
		);
		const data = await response.json();
		const sessionId = data.id;

		// Redirect the user to the Stripe checkout page
		const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
		const { error } = await stripe.redirectToCheckout({ sessionId });

		if (error) {
			console.error(error);
			setLoading(false);
		}
	};

	return (
		<div>
			<h1>{product.title}</h1>
			<p>{product.description}</p>
			<p>Price: ${product.regular_price}</p>
			<button disabled={loading} onClick={handleClick}>
				{loading ? 'Loading...' : 'Buy Now'}
			</button>
		</div>
	);
}
