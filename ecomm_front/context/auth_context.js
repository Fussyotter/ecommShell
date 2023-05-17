import React from 'react';

const AuthContext = React.createContext();

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = React.useState(null);

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
