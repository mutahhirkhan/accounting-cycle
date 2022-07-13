import { useState, useEffect } from 'react'
import { projectAuth, projectStorage,projectFirestore } from '../firebase/config'
import { useAuthContext } from './useAuthContext'
import { useNavigate } from 'react-router-dom'

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()
  const history=useNavigate()
  const signup = async (email, password, displayName,thumbnail) => {
    setError(null)
    setIsPending(true)
  
    try {
      // signup
      const res = await projectAuth.createUserWithEmailAndPassword(email, password)

      if (!res) {
        throw new Error('Could not complete signup')
      }

      // upload user thumbnail
      const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}`
      const img = await projectStorage.ref(uploadPath).put(thumbnail)
      const imgUrl = await img.ref.getDownloadURL()

      // add display AND PHOTO_URL name to user
      await res.user.updateProfile({ displayName, photoURL: imgUrl })
         // create a user document
         await projectFirestore.collection('users').doc(res.user.uid).set({          //specific user collection
          email: email,
          displayName: displayName,
          imgUrl: imgUrl,
          time:res.user.metadata.creationTime
        })
       // dispatch login action
       dispatch({ type: 'LOGIN', payload: res.user })
      // if(res.user.email==="sudofyproject@gmail.com"){
      //   history('/dashboard')
      // }
      // else if(res.user.email!=="sudofyproject@gmail.com"){
      //   history('/')
      // }
     

      if (!isCancelled) {
        setIsPending(false)
        setError(null)
      }
    } 
    catch(err) {
      if (!isCancelled) {
        setError(err.message)
        setIsPending(false)
      }
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { signup, error, isPending }
}