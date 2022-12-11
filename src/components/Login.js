import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';

import sign from "./img/sign.webp";


function Login() {

    const navigate = useNavigate();
    const [values, setValues] = useState({
        email: "",
        password: "",
    });

    const [errorMsg, setErrorMsg] = useState("");
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

    const handleSubmission = () => {
        if ( !values.email || !values.password) {
            setErrorMsg("Fill all fields");
            return;
        }
        setErrorMsg("");

        setSubmitButtonDisabled(true);
        signInWithEmailAndPassword(auth, values.email, values.password)
            .then(async (res) => {
                setSubmitButtonDisabled(false);
                
                navigate('/Home');
            })
            .catch((err) => {
                setSubmitButtonDisabled(false);
                setErrorMsg(err.message)
            });
    };

    return (
        <>
            <main>
                <div className="box">
                    <div className="inner-box">
                        <div className="forms-wrap">
                            <form action="index.html" autocomplete="off" class="sign-in-form">

                                <div class="heading">
                                    <h2>Welcome Back</h2>
                                    <h6>Not registed yet?</h6>
                                    <a href="/signup" class="toggle">Sign Up</a>
                                </div>

                                <div class="actual-form">
                                    <div class="input-wrap">
                                        <label>
                                            <i class="zmdi zmdi-email"></i>
                                        </label>
                                        <input type="email" className="input-field" autocomplete="off"
                                            placeholder='Email'
                                            onChange={(event) =>
                                                setValues((prev) => ({...prev, email: event.target.value }))
                                              }
                                            />
                                    </div>
                                    <div className='input-wrap'>
                                        <label>
                                            <i class="zmdi zmdi-lock"></i>
                                        </label>
                                        <input type="password" className="input-field" autocomplete="off"
                                            placeholder='Password'
                                            onChange={(event) =>
                                                setValues((prev) => ({...prev, password: event.target.value }))
                                              }
                                               />
                                    </div>
                                    <b className='error'>{errorMsg}</b>
                                    <input type="button" value="Sign In" class="sign-btn"
                                        onClick={handleSubmission} disabled={submitButtonDisabled}
                                    />
                                </div>
                            </form>
                        </div>

                        <div class="carousel">
                            <div class="images-wrapper">
                                <img src={sign} className="image img-1 show" alt="sign" />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>

    )
}

export default Login