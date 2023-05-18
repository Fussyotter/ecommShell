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
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const Cart = () => {
	const [cart, setCart] = useState({ items: [], total: 0 });
	const [open, setOpen] = useState(false);
	const { csrfToken } = useContext(Csrf_context);
	const { currentUser } = useAuth();

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
			<h2>Your Cart {cart.items.length}</h2>
			<IconButton onClick={() => setOpen(!open)}>
				<ExpandMoreIcon />
			</IconButton>
			<Box sx={{ mt: 1 }}>
				<List>
					<TransitionGroup>
						{cart.items.map((item) => (
							<CSSTransition key={item.id} timeout={500} classNames='item'>
								<Collapse in={open}>
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
								</Collapse>
							</CSSTransition>
						))}
					</TransitionGroup>
				</List>
			</Box>
			<h3>Total: ${cart.total}</h3>
		</div>
	);
};

export default Cart;
