import { createContext, useContext, useState, useEffect } from "react";
import booksData from "./booksData.json";

const BooksContext = createContext();

export const BooksProvider = ({ children }) => {
  const [data, setData] = useState({ categorias: [], productos: [] });

  useEffect(() => {
    setData(booksData);
  }, []);

  return (
    <BooksContext.Provider value={{ data, setData }}>
      {children}
    </BooksContext.Provider>
  );
};

export const useBooks = () => {
  return useContext(BooksContext);
};
