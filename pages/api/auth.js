import { valid } from '../../utils/valid'
import { auth, db } from '../../firebase/firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { collection, addDoc } from 'firebase/firestore'

export const createAccount = (userData, auth, router) => {
    const check = valid(userData)
    if (check.errLength > 0) return check.errMsg
    createUserWithEmailAndPassword(auth, userData.email, userData.password)
        .then(async (userCredentials) => {
            const docRef = await addDoc(collection(db, 'users'),
                {
                    name: userData.name,
                    email: userCredentials.user.email
                })
            console.log(docRef)
            router.push('/')
        }).catch((error) => console.log(error))
}

export const login = (userData, auth, router) => {
    signInWithEmailAndPassword(auth, userData.email, userData.password)
        .then(() => { router.push('/') })
        .catch(err => console.log(err))
}
