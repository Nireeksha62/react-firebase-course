import { useState } from 'react';
import { auth,googleProvider } from '../config/firebase'
import { createUserWithEmailAndPassword ,signInWithPopup,signOut} from 'firebase/auth';
export const Auth=()=>{
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("")

    //console.log(auth?.currentUser?.email)
    //console.log(auth?.currentUser?.photoURL)

    const signIn= async() =>{
        try{
        await createUserWithEmailAndPassword(auth,email,password);
        }catch(err){
            console.error(err);
        }
    }
    const signInWithGoogle= async() =>{
        try{
        await signInWithPopup(auth,googleProvider);
        }catch(err){
            console.error(err);
        }
    }
    const logOut= async() =>{
        try{
        await signOut(auth);
        }catch(err){
            console.error(err);
        }
    }
    return(
        <div>
            <input placeholder="Email ..."
            onChange={(e)=>setEmail(e.target.value)}/>
            <input type='password' placeholder="Password ..."
            onChange={(e)=>setPassword(e.target.value)}/>
            <button onClick={signIn}>Sign in</button>

            <button onClick={signInWithGoogle}>Sign in with google</button>
            <br></br><button onClick={logOut}>Log Out</button>
        </div>
    )
}