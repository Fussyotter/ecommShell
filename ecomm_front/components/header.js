import React from 'react';
import Link from 'next/link';

const Header = () => {
	return (
		<header>
			<h1>Company Name</h1>
			<nav>
			
			</nav>
			<div>
				<Link href='/productPage' variant='body2'>
					{"Don't have an account? Sign Up"}
				</Link>

			</div>
			
			<form>
				<input type='text' placeholder='Search' />
				<button type='submit'>Search</button>
			</form>
		</header>
	);
};

export default Header;
