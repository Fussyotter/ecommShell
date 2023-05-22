import React from 'react';

const AuthContext = React.createContext();

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = React.useState(null);
	    React.useEffect(() => {
				fetch('http://localhost:8000/users/getCurrentUser/', {
					credentials: 'include',
				})
					.then((response) => response.json())
					.then((data) => setCurrentUser(data.username))
					.catch((error) => console.error(error));
			}, []);

	return (
		<AuthContext.Provider value={{ currentUser, setCurrentUser }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	return React.useContext(AuthContext);
}

export default AuthContext;
