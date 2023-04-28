import React from 'react';

const Header = () => {
	return (
		<header>
			<h1>Company Name</h1>
			<nav>
				<ul>
					<li>Login</li>
					<li>Sign Up</li>
				</ul>
			</nav>
			<form>
				<input type='text' placeholder='Search' />
				<button type='submit'>Search</button>
			</form>
		</header>
	);
};

export default Header;
