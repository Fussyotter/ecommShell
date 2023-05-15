import { createContext, useState, useEffect } from 'react';

export const Csrf_context = createContext();

export const CsrfProvider = ({ children }) => {
  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    async function fetchCsrfToken() {
      const csrftoken = getCookie('csrftoken');
      if (csrftoken) {
        setCsrfToken(csrftoken);
        return;
      }

      const response = await fetch('http://localhost:8000/users/csrf/', { credentials: 'include' });
      const newCsrfToken = response.headers.get('X-CSRFToken');
      setCsrfToken(newCsrfToken);

      document.cookie = `csrftoken=${newCsrfToken}; path=/`;
    }

    fetchCsrfToken();
  }, []);

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop().split(';').shift();
    }
  }

  function updateCsrfToken(token) {
			setCsrfToken(token);
			document.cookie = `csrftoken=${token}; path=/`;
		}


  return (
    <Csrf_context.Provider value={{ csrfToken, updateCsrfToken }}>
      {children}
    </Csrf_context.Provider>
  );
};
