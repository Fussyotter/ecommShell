import React, {useContext} from 'react';
import Carousel from 'react-material-ui-carousel';
import { ProductContext } from '../context/product_context';
import { Paper, Grid } from '@mui/material';


export default function ProductCarousel() {
	const { products } = useContext(ProductContext);
     const productGroups = [];
			for (let i = 0; i < products.length; i += 3) {
				productGroups.push(products.slice(i, i + 3));
			}
	return (
		<Grid container justifyContent='center' alignItems='center'padding={2}>
			<Grid item xs={6}>
				<Carousel indicators = {false}interval= {8000} style={{ width: '60%', height: '300px' }}>
					{productGroups.map((group, index) => (
						<Item key={index} group={group} />
					))}
				</Carousel>
			</Grid>
		</Grid>
	);
}
// image qualities
function Item({ group }) {
	return (
		<Paper>
			<Grid container justify='center'>
				{group.map((product) => (
					<Grid item xs={4}>
						<img
							src={product.product_image[0].image}
							alt={product.title}
							style={{
								maxWidth: '100%',
								maxHeight: '300px',
								objectFit: 'contain',
							}}
						/>
					</Grid>
				))}
			</Grid>
		</Paper>
	);
}
