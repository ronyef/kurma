import { signOut } from "firebase/auth"
import { auth } from '../firebase/config'
import { useAuthContext } from "./useAuthContext"

export const useLogout = () => {
    const { dispatch } = useAuthContext()

    const logout = () => {
        signOut(auth).then(() => {
            localStorage.removeItem('orders')
            dispatch({type: 'LOGOUT'})
        })
    }

    return { logout }
}


