import {useContext} from 'react'
import {ProductContext} from '../context/product_context'

export default function FeaturedProducts (){
	const { products } = useContext(ProductContext);
	return (
		<div>
			<h1>Featured Products</h1>
			<ul>
				{products.map((product) => (
					<li key={product.id}>
						<h2>{product.title}</h2>
						<p>{product.description}</p>
                        <p>{product.regular_price}</p>
					</li>
				))}
			</ul>
		</div>
	);
}