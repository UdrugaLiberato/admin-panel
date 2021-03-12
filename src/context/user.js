import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { getUserRequest } from "./getUserRequest";

export const UserContext = createContext({
  setUserInfo: (user, status) => {},
});

const id = Cookies.get("_id") || null;
const accessToken = Cookies.get("_accessToken") || null;

export const getUserStatus = () => {
  return Cookies.get("_status");
};

export const getUserId = () => {
  return id;
};

export const getUserAccessToken = () => {
  return accessToken;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(getUserStatus());

  const setUserInfo = (status) => {
    setUser((prevState) => ({ ...prevState, status: status }));
  };

  useEffect(() => {
    if (getUserStatus() === true.toString())
      return getUserRequest(id, accessToken, setUser);
  }, []);
  return (
    <UserContext.Provider
      value={{
        user,
        setUserInfo,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
