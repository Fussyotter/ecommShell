import React from "react";

export const Search_context = React.createContext();

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = React.useState("");

  return (
    <Search_context.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </Search_context.Provider>
  );
}
