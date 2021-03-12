import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { CATEGORYENDPOINTS, headers } from "../constants";

export const CategoriesContext = createContext();

export const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get(`${CATEGORYENDPOINTS.LIST}`, { headers })
      .then((res) => {
        if (res.data) {
          setCategories([...res.data.data]);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <CategoriesContext.Provider value={{ categories, setCategories }}>
      {children}
    </CategoriesContext.Provider>
  );
};
