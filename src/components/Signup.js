
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../firebase';

import login from "./img/login.webp";

function Signup() {

  const navigate = useNavigate();
  const [values, setValues] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmission = () =>{
    if(!values.first_name || !values.last_name || !values.email || !values.password){
      setErrorMsg("Fill all fields");
      return;
    }
    setErrorMsg("");
    
    setSubmitButtonDisabled(true);
    createUserWithEmailAndPassword(auth, values.email, values.password)
    .then(async (res) => {
      setSubmitButtonDisabled(false);
      const user = res.user;
      await updateProfile(user, {
        displayName: values.first_name, 
      });
      navigate('/');
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
                            <h2>Get Started</h2>
                            <h6>Already have an account?</h6>
                            <a href="login" class="toggle">Sign in</a>
                        </div>

                        <div class="actual-form">
                        <div class="input-wrap">
                                <input type="text" class="input-field" autocomplete="off" placeholder='First Name'
                                onChange={(event) =>
                                setValues((prev) => ({...prev, first_name: event.target.value }))
                              }
                                />
                            </div>
                            <div class="input-wrap">
                                <input type="text" class="input-field" autocomplete="off" placeholder='Last Name'
                                onChange={(event) =>
                                setValues((prev) => ({...prev, last_name: event.target.value }))
                              }
                                />
                            </div>
                            <div class="input-wrap">
                                <input type="email" class="input-field" autocomplete="off" placeholder='Email'
                                onChange={(event) =>
                                setValues((prev) => ({...prev, email: event.target.value }))
                              }
                                />
                            </div>
                            <div class="input-wrap">
                                <input type="password"  class="input-field" autocomplete="off" placeholder='Password'
                                onChange={(event) =>
                                setValues((prev) => ({...prev, password: event.target.value }))
                              }
                                />
                            </div>
                           
                            <b className='error'>{errorMsg}</b>
                            <input type="button" value="Sign Up" class="sign-btn" 
                            onClick={handleSubmission} disabled={submitButtonDisabled}
                            /> 
                        </div>
                    </form>
                </div>
                <div class="carousel">
                    <div class="images-wrapper">
                    <img src={login}  className="image img-1 show" alt="login" />
                    </div>
                </div>
            </div>
        </div>
      </main>
    </>
  )
}

export default Signup