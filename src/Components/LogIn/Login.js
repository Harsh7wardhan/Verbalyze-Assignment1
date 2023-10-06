import { signInWithEmailAndPassword } from 'firebase/auth';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { auth } from '../../FirebaseConfig'
import { useState } from 'react';
import './Login.css'
function Login() {

    const history = useNavigate();

    const [details, setDetails] = useState({
        fName: '',
        email: '',
    });

    
    const PostData = async () => {
        const { fName, email } = details;
        const res = await fetch("https://resp-form-default-rtdb.firebaseio.com//harshform.json",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    fName,
                    email,

                })
            })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        signInWithEmailAndPassword(auth, email, password)
            .then(data => {
                console.log("login data", data);
                // PostData();
                history('/home')
            })
            .catch((err) => {
                alert(err)
            })
    }
    return (
        <div className="signup-container">
            <h1>LOG IN</h1>
            <form onSubmit={(e) => handleSubmit(e)}>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" placeholder="Enter your email" onChange={(e) =>
                        setDetails({ ...details, fName: e.target.value })} />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" placeholder="Enter your password" onChange={(e) =>
                        setDetails({ ...details, email: e.target.value })} />
                </div>

                <button className="login-button">Log Up</button>

            </form>
        </div>
    )
}

export default Login
