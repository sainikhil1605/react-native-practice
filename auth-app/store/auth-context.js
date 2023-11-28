import { createContext, useState } from "react";

export const AuthContext = createContext({
  token: "",
  isAuthenticatied: false,
  authenticate: () => {},
  logout: () => {},
});
const AuthContextProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(false);
  const authenticate = (token) => {
    setAuthToken(token);
  };

  const logout = () => {
    setAuthToken(null);
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
