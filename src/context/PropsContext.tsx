import React, { createContext, useContext, useMemo, useState } from "react";
import { BookData } from "../utils/constants";
import { BookInterface } from "../libs/types/types";

type PropsContextType = {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  booksData: BookInterface[];
  setBooksData: React.Dispatch<React.SetStateAction<BookInterface[]>>;
};

export const PropsContext = createContext<PropsContextType>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  booksData: BookData,
  setBooksData: () => {},
});

export const PropsProvider = ({ children }: { children: React.ReactNode }) => {
  const [booksData, setBooksData] = useState<BookInterface[]>(BookData);
  const storedIsAuthenticated = localStorage.getItem("isAuthenticated");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    storedIsAuthenticated ? JSON.parse(storedIsAuthenticated) : false
  );

  const obj = useMemo(
    () => ({
      isAuthenticated,
      setIsAuthenticated: (value: boolean) => {
        setIsAuthenticated(value);
        localStorage.setItem("isAuthenticated", JSON.stringify(value));
      },
      booksData,
      setBooksData,
    }),
    [isAuthenticated, booksData, setBooksData]
  );
  return (
    <PropsContext.Provider value={obj as PropsContextType}>
      {children}
    </PropsContext.Provider>
  );
};

export const useProps = () => useContext(PropsContext);
