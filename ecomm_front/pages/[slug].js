import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function ProductPage() {
	const router = useRouter();
	const { slug } = router.query;

	const [product, setProduct] = useState(null);

useEffect(() => {
	if (!slug) return;
	fetch(`http://localhost:8000/api/products/${slug}/`)
		.then((response) => response.json())
		.then(setProduct)
		.catch(console.error);
}, [slug]);

	if (!product) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<h1>{product.title}</h1>
			<img src={product.product_image[0].image} alt={product.title} />
			<p>{product.description}</p>
			<p>${product.regular_price}</p>
		</div>
	);
}
