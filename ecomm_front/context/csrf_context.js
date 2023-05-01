import { createContext, useState, useEffect } from 'react';

export const Csrf_context = createContext();

export const CsrfProvider = ({ children }) => {
	const [csrfToken, setCsrfToken] = useState('');

	useEffect(() => {
		async function fetchCsrfToken() {
			const response = await fetch('http://localhost:8000/users/csrf/',
			{credentials: 'include',})
            .then((res) => {
                let csrfToken = res.headers.get('X-CSRFToken');
                setCsrfToken(csrfToken);
            })
            .catch((err) => {
                console.log(err);
            }
            );
		}

		fetchCsrfToken();
	}, []);

	return (
		<Csrf_context.Provider value={{ csrfToken, setCsrfToken }}>{children}</Csrf_context.Provider>
	);
};
