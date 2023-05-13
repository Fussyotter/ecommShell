import {useContext} from 'react'
import {ProductContext} from '../context/product_context'
import {Csrf_context} from '../context/csrf_context'
import { Card, CardContent, CardActions, Button, Grid, Typography } from '@mui/material';



export default function FeaturedProducts (){
	const { products } = useContext(ProductContext);
	const { csrfToken } = useContext(Csrf_context);
	
	

	  const addToCart = (product_id, quantity) => {
			fetch(`http://localhost:8000/cart/add/${product_id}/`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'X-CsrfToken': csrfToken,
				},
				credentials: 'include',

				body: JSON.stringify({
					product_id: product_id,
					quantity: quantity || 1,
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
			<Grid container spacing={2}>
				{products.map((product) => (
					<Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
						<Card
							sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
							<CardContent sx={{ flexGrow: 1 }}>
								<Typography gutterBottom variant='h5' component='h2'>
									{product.title}
								</Typography>
								<Typography variant='body2' color='text.secondary'>
									{product.description}
								</Typography>
								<p>${product.regular_price}</p>
							</CardContent>
							<CardActions>
								<Button onClick={() => addToCart(product.id)}>
									Add to cart
								</Button>
							</CardActions>
						</Card>
					</Grid>
				))}
			</Grid>
		</div>
	);
}