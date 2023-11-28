import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const AuthContext = createContext({
  token: "",
  isAuthenticatied: false,
  authenticate: () => {},
  logout: () => {},
});
const AuthContextProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(false);

  const logout = () => {
    AsyncStorage.removeItem("token");
    setAuthToken(null);
  };
  const authenticate = (token) => {
    AsyncStorage.setItem("token", token);
    setAuthToken(token);
  };
  return (
    <AuthContext.Provider
      value={{
        token: authToken,
        isAuthenticatied: !!authToken,
        authenticate,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
