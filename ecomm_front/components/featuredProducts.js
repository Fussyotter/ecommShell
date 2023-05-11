import {useContext} from 'react'
import {ProductContext} from '../context/product_context'
import {Csrf_context} from '../context/csrf_context'



export default function FeaturedProducts (){
	const { products } = useContext(ProductContext);
	const { csrfToken } = useContext(Csrf_context);
	
	

	  const addToCart = (productId) => {
			fetch(`http://localhost:8000/cart/add/${productId}/`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'X-CSRFToken': csrfToken, 
				},
				body: JSON.stringify({
					product_id: productId,
					quantity: 1,
				}),
			})
				.then((response) => response.json())
				.then((data) => {
					console.log('Product added to cart:', data);
					// TODO: Update state or show a success message
				})
				.catch((error) => {
					console.error('Error adding product to cart:', error);
					// TODO: Show an error message
				});
		};
	return (
		<div>
			<h1>Featured Products</h1>
			<ul>
				{products.map((product) => (
					<li key={product.id}>
						<h2>{product.title}</h2>
						<p>{product.id}</p>
						<p>{product.description}</p>
                        <p>{product.regular_price}</p>
						<button onClick={() => addToCart(product.id)}>Add to cart</button>
					</li>
				))}
			</ul>
		</div>
	);
}