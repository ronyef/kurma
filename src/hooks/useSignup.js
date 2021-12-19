import { useState, useEffect } from "react";
import { auth, db } from "../firebase/config";
import { createUserWithEmailAndPassword, updateProfile, updatePhoneNumber } from "firebase/auth";
import { doc, setDoc } from 'firebase/firestore'
import { useAuthContext } from '../hooks/useAuthContext'

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext()

  const signup = (email, password, name, phone, address, kel, zone) => {
    setLoading(true);
    setError(null);

    createUserWithEmailAndPassword(auth, email, password).then(
      async (res) => {
        await updateProfile(res.user, {
          displayName: name,
        })

        await setDoc(doc(db, 'users', res.user.uid), {
            phone,
            address,
            kelurahan: kel,
            zona: zone
        })

        if(!isCancelled) {
            setLoading(false)
            setError(null)
        }

        dispatch({type: 'LOGIN', payload: {...res.user, phone, address, kelurahan: kel, zona: zone}})
      }
      ,
      (err) => {
        if (!isCancelled) {
          setLoading(false);
          setError(err.message);
        }
      }
    )
  };

  useEffect(() => {
    return () => {
      setIsCancelled(true);
    };
  }, []);

  return { loading, error, signup };
};
