import React from 'react';
import './SignUp.css';
import { auth } from '../../FirebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { signInWithGoogle } from '../../FirebaseConfig';
import { useState, useEffect } from 'react';
import { getDatabase, ref, set } from "firebase/database";

function SignUp() {

    const history = useNavigate();

    // useEffect(() => {
    //     fetchData();
    // }, []);

    const [details, setDetails] = useState({
        fName: '',
        email: '',
    });

    const handleGoogleSignIn = () => {
        signInWithGoogle().then(() => {
            // PostData();
            history('/home');
        }).catch((error) => {
            console.error(error);
        });
    }


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
        const name = e.target.name.value;


        function writeUserData(userId, name, email) {
            const db = getDatabase();
            set(ref(db, 'users/' + userId), {
              username: name,
              email: email,
            });
          }

        createUserWithEmailAndPassword(auth, email, password).then(data => {
            console.log("dd", data);
            PostData();
            history('/home')
        }).catch((err) => {
            alert(err)
        })
    }
    return (
        <div className="signup-container">
            <h1>SIGN IN</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" placeholder="Enter your name" onChange={(e) =>
                        setDetails({ ...details, fName: e.target.value })} />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" placeholder="Enter your email" onChange={(e) =>
                        setDetails({ ...details, email: e.target.value })} />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" placeholder="Enter your password" />
                </div>
                <div className='links'>
                    <Link to='/forgotpassword'>
                        <p >Forgot password</p>
                    </Link>
                    <Link to='/login'>
                        <p className="loginRedirect1">Already a user ?</p>
                    </Link>
                </div>

                <div className="buttonContainer">
                    <button className="signup-button">Sign In</button>
                    <button onClick={handleGoogleSignIn} className="login-with-google-btn">Sign in with Google</button>
                </div>

            </form>
        </div>
    );
}

export default SignUp;
