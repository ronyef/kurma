import { useState, useEffect } from 'react'
import { signInWithEmailAndPassword } from "firebase/auth"
import { doc, getDoc } from 'firebase/firestore'
import { useHistory } from "react-router-dom";
import { auth, db } from '../firebase/config'
import { useAuthContext } from './useAuthContext';


export const useLogin = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [isCancelled, setIsCancelled] = useState(false)
    const history = useHistory()
    const { dispatch } = useAuthContext()

    const login = (email, password) => {
        setLoading(true)
        setError(null)

        signInWithEmailAndPassword(auth, email, password).then(async (user) => {
            const docRef = doc(db, 'users', user.user.uid)
            const userData = await getDoc(docRef)
            const userPayload = { ...user.user, ...userData.data() }
            console.log(userPayload)
            if (!isCancelled) {
                setLoading(false)
                setError(null)
            }
            dispatch({type: 'LOGIN', payload: userPayload})

        }).catch(error => {
            if (!isCancelled) {
                setLoading(false)
                setError(error.message)
            }
        })
    }

    useEffect(() => {
        return () => {
            setIsCancelled(true)
        }
    }, [])

    return { loading, error, login }
}
