import React, { useEffect, useState, useContext } from 'react';
import { Csrf_context } from '../context/csrf_context';
import { useAuth } from '@/context/auth_context';
import {
	Box,
	List,
	ListItem,
	Collapse,
	ListItemText,
	IconButton,
	Grid,
	Drawer,
	Typography,
} from '@mui/material';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { ShoppingCart } from '@mui/icons-material';
import Link from 'next/link';

const Cart = () => {
	const [cart, setCart] = useState({ items: [], total: 0 });
	const [open, setOpen] = useState(false);
	const { csrfToken } = useContext(Csrf_context);
	const { currentUser } = useAuth();

	useEffect(() => {
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
				setCart(data);
			} else {
				console.error(`Error ${response.status}: ${response.statusText}`);
			}
		} catch (error) {
			console.error('Error:', error);
		}
	};
	const totalItemsInCart = cart.items.reduce(
		(sum, item) => sum + item.quantity,
		0
	);

	return (
		<div>
			<h2>
				<IconButton onClick={() => setOpen(!open)}>
					<ShoppingCart />
				</IconButton>
				({totalItemsInCart})
			</h2>
			<Drawer
				anchor='right'
				open={open}
				onClose={() => setOpen(false)}
				sx={{ '& .MuiPaper-root': { bgcolor: 'grey.300' } }}>
				<Box sx={{ width: 250, p: 2 }}>
					<Typography variant='h5' align='center'>
						Your Cart
					</Typography>
					<Box sx={{ mt: 1 }}>
						<List>
							<TransitionGroup>
								{cart.items.map((item) => (
									<CSSTransition key={item.id} timeout={500} classNames='item'>
										<ListItem>
											<Grid container>
												<Grid item xs={8}>
													<p>
														{item.product.title} : {item.quantity}
													</p>
												</Grid>
												<Grid item xs={4}>
													<p>${item.product.regular_price}</p>
												</Grid>
											</Grid>
										</ListItem>
									</CSSTransition>
								))}
							</TransitionGroup>
						</List>
					</Box>
					<Typography variant='h5' align='center'>
						Total: ${cart.total}
						<Link href='/checkout'>
							Checkout
						</Link>
					</Typography>
				</Box>
			</Drawer>
		</div>
	);
};

export default Cart;
