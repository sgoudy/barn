import { AuthContextProvider } from "../../context/index.jsx";
import Cookies from 'universal-cookie'
import { Navigate } from 'react-router-dom'

const cookies = new Cookies()
export default function AuthorizedContainer({ children }) {
    const isAuthenticated = cookies.get('boarder') !== undefined
    
    if (!isAuthenticated) {
        return <Navigate to="/" />
    }

    return (
        <AuthContextProvider>{children}</AuthContextProvider>
    )
}