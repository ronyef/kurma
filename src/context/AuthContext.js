import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { createContext, useReducer } from "react";
import { auth, db } from '../firebase/config'
import { doc, getDoc } from 'firebase/firestore'

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload}
    case 'LOGOUT':
      return { ...state, user: null }
    case 'AUTH_IS_READY':
      return { ...state, user: action.payload, authIsReady: true }
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false
  });

  // const getUserData = async () => {

  // }

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      const docRef = doc(db, 'users', user.uid )
      getDoc(docRef).then(snapshot => {
        dispatch({ type: 'AUTH_IS_READY', payload: {...user, ...snapshot.data()} })
        unsub()
      }).catch(error => {
        console.log(error.message)
      })
    })
  }, [])

  // console.log('AuthContext state:', state)

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
 