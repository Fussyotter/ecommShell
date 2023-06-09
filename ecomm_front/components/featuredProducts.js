import { useContext, useState, useEffect } from 'react';
import { Search_context } from '@/context/search_context';
import { Csrf_context } from '../context/csrf_context';
import {
	Card,
	CardMedia,
	CardContent,
	CardActions,
	Button,
	Grid,
	Typography,
	Box,
} from '@mui/material';
import Link from 'next/link';
const PAGE_SIZE = 10;

export default function FeaturedProducts() {
	const { csrfToken } = useContext(Csrf_context);
	const { searchTerm } = useContext(Search_context);

	const [products, setProducts] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);

	const fetchProducts = (page, searchTerm) => {
		let endpoint = `http://localhost:8000/api/?page=${page}`;
		if (searchTerm) {
			endpoint += `&search=${searchTerm}`;
		}
		fetch(endpoint)
			.then((response) => response.json())
			.then((data) => {
				setProducts(data.results);
				setTotalPages(Math.ceil(data.count / PAGE_SIZE)); // calculate total pages
			})
			.catch(console.error);
	};

	const addToCart = (product_id, quantity) => {
		console.log('addToCart called', product_id, quantity);
		fetch(`http://localhost:8000/cart/add/${product_id}/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-CSRFToken': csrfToken,
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
	useEffect(() => {
		fetchProducts(currentPage, searchTerm);
	}, [currentPage, searchTerm]);
	return (
		<div>
			<h1>Featured Products</h1>
			<Grid container spacing={1}>
				{products.map((product, index) =>
					index % 3 === 2 ? (
						<Grid key={product.id} item xs={12} sm={6} md={4} lg={2}>
							<Card
								raised
								sx={{
									height: '100%',
									maxWidth: 345, // Increase the max width for every 3rd item
									boxShadow: 20,
									flexDirection: 'column',
									margin: '1em auto',
									padding: '1em .5em 0 .5em',
								}}>
								{product.product_image.length > 0 &&
									product.product_image[0].image && (
										<CardMedia
											component='img'
											height={150}
											alt={product.title}
											image={product.product_image[0].image}
										/>
									)}
								<CardContent sx={{ flexGrow: 1 }}>
									<Link href={`/${product.slug}`}>
										<Typography gutterBottom variant='h5' component='h2'>
											{product.title}
										</Typography>
									</Link>
									<Typography variant='body2' color='text.secondary'>
										{product.description}
										{product.product_image.image}
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
					) : (
						<Grid key={product.id} item xs={12} sm={6} md={4} lg={2}>
							<Card
								raised
								sx={{
									height: '100%',
									maxWidth: 280,
									boxShadow: 20,
									flexDirection: 'column',
									margin: '1em auto',
									padding: '1em .5em 0 .5em',
								}}>
								{product.product_image.length > 0 &&
									product.product_image[0].image && (
										<CardMedia
											component='img'
											height={150}
											alt={product.title}
											image={product.product_image[0].image}
										/>
									)}
								<CardContent sx={{ flexGrow: 1 }}>
									<Link href={`/${product.slug}`}>
										<Typography gutterBottom variant='h5' component='h2'>
											{product.title}
										</Typography>
									</Link>
									<Typography variant='body2' color='text.secondary'>
										{product.description}
										{product.product_image.image}
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
					)
				)}
			</Grid>
			<Box display='flex' justifyContent='center' mt={3}>
				<Button
					variant='contained'
					onClick={() => setCurrentPage((oldPage) => Math.max(oldPage - 1, 1))}>
					Previous Page
				</Button>
				<Button
					variant='contained'
					onClick={() =>
						setCurrentPage((oldPage) => Math.min(oldPage + 1, totalPages))
					}
					style={{ marginLeft: '10px' }}>
					Next Page
				</Button>
			</Box>
		</div>
	);
}
