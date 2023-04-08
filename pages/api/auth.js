import { valid } from '../../utils/valid'
import { auth, db } from '../../firebase/firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { collection, addDoc } from 'firebase/firestore'
import { toast } from 'react-hot-toast'

export const createAccount = (userData, auth, router) => {
    const check = valid(userData)
    if (check.errLength > 0) {
        toast.error(check.errMsg)
        return check.errMsg
    }
    createUserWithEmailAndPassword(auth, userData.email, userData.password)
        .then(async (userCredentials) => {
            const docRef = await addDoc(collection(db, 'users'),
                {
                    name: userData.name,
                    email: userCredentials.user.email
                })
            console.log(docRef)
            toast.success('Account created successfully')
            router.push('/')
        }).catch((error) => {
            console.log(error); toast.error('Account creation failed')
        })
}

export const login = (userData, auth, router) => {
    signInWithEmailAndPassword(auth, userData.email, userData.password)
        .then(() => {
            toast.success('Login successful');
            router.push('/')
        })
        .catch(err => {
            toast.error('Login failed');
            console.log(err)
        })
}
