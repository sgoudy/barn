import Cookies from 'universal-cookie'
import { createContext } from "react";

const cookies = new Cookies()
const AuthContext = createContext(null);

const AuthContextProvider = ({ children }) => {
  const userToken = cookies.get('boarder')
  
  const decodedUser = userToken ? userToken : null
  const isAuthenticated = userToken !== undefined
 
  return (
    <AuthContext.Provider
      value={{
        user: decodedUser,
        isAuthenticated: isAuthenticated
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider}