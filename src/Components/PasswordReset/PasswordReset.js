import { sendPasswordResetEmail } from "firebase/auth";
import React from "react";
import { auth } from "../../FirebaseConfig";
import { useNavigate } from "react-router-dom";
import './PasswordReset.css'


function ForgotPassword() {
    const history = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        const emalVal = e.target.email.value;
        sendPasswordResetEmail(auth, emalVal).then(data => {
            alert("Check your gmail")
            history("/")
        }).catch(err => {
            alert(err.code)
        })
    }
    return (
        <div className="App">
            <h1 className="forgotPassword-heading">Forgot Password</h1>
            <form onSubmit={(e) => handleSubmit(e)} className="forgotPassword-form">
                <div className="boxId">
                    <label className="forgotPassword-label">EMAIL:</label>
                    <input name="email" className="forgotPassword-input" /><br /><br />
                </div>

                <button className="forgotPassword-button">Reset</button>
            </form>
        </div>
    )
}
export default ForgotPassword;