import React, {Children, useRef, useState} from 'react';
import useOnClickOutside from './clickOutside-hook';
import close from "../resources/close.png";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { addData } from '../services/database';
import Statistics from './Statistics';

function Window({children, active, handleClose}) {
  const windowRef = useRef();
  useOnClickOutside(windowRef, () => handleClose());

  if (active) {
    return (
      <div className="screen">
        <div className="window" ref={windowRef}>
          <img src={close} alt="Close" className="close" onClick={handleClose}/>
          {Children.map(children, child => {
            return (
              <div>
                {child}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
    else {
      return (
        <></>
      );
    }
}

export function SignInWindow({active, handleClose}) {
  const [signedUWindow, setSignedUWindow] = useState(false);
  const toggleUserWindow = () => {setSignedUWindow(!signedUWindow)}

  const [userNameSignUp, setUserNameSignUp] = useState("");
  const handleUserNameSignUp = (event) => {setUserNameSignUp(event.target.value);}

  const [emailSignUp, setEmailSignUp] = useState("");
  const handleEmailSignUp = (event) => {setEmailSignUp(event.target.value);}

  const [passwordSignUp, setPasswordSignUp] = useState("");
  const handlePasswordSignUp = (event) => {setPasswordSignUp(event.target.value);}

  const [emailSignIn, setEmailSignIn] = useState("");
  const handleEmailSignIn = (event) => {setEmailSignIn(event.target.value);}

  const [passwordSignIn, setPasswordSignIn] = useState("");
  const handlePasswordSignIn = (event) => {setPasswordSignIn(event.target.value);}

  const handleSubmitSignUp = () => {
    createUserWithEmailAndPassword(auth, emailSignUp, passwordSignUp)
    .then((userCredential) => {
      // Signed up 
      updateProfile(auth.currentUser, {
        displayName: userNameSignUp
        }).then(() => {
          addData().then(() => {
            setUserNameSignUp("");
            setEmailSignUp("");
            setPasswordSignUp("");
            toggleUserWindow();
          }).catch((error) => {
            const errorMessage = error.message;
            alert(errorMessage);
          });    
        }).catch((error) => {
          const errorMessage = error.message;
          alert(errorMessage);
        });
      })
      .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
  }
  
  const handleSubmitSignIn = () => {
    signInWithEmailAndPassword(auth, emailSignIn, passwordSignIn)
    .then((userCredential) => {
      setEmailSignIn("");
      setPasswordSignIn("");
      toggleUserWindow();
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
  }

  return (<Window active={active} handleClose={handleClose}>
  {auth.currentUser ? 
    <div>
      <div className='headline'>Welcome {auth.currentUser.displayName} </div> 
      <Statistics/>
      <button onClick={() => auth.signOut()}>Sign Out</button>
    </div> : 

    <div className="form">
      <div className="signUp">
          <div className="headline">Sign Up</div>
          <label><b>User Name</b></label>
          <input type="text" placeholder="Enter User Name" name="userName" required onChange={handleUserNameSignUp} value={userNameSignUp} className="form-input"/>
          <label><b>Email</b></label>
          <input type="text" placeholder="Enter Email" name="email" required onChange={handleEmailSignUp} value={emailSignUp} className="form-input"/> 
          <label><b>Password</b></label>
          <input type="password" placeholder="Enter Password" name="psw" required onChange={handlePasswordSignUp} value={passwordSignUp} className="form-input"/> 
          <button type="submit" className="signupbtn" onClick={handleSubmitSignUp}>Sign Up</button> 
      </div> 
      <div className="or">- or -</div>
      <div className="signIn">
          <div className="headline">Sign In</div>
          <label><b>Email</b></label>
          <input type="text" placeholder="Enter Email" name="email" required onChange={handleEmailSignIn} value={emailSignIn} className="form-input"/> 
          <label><b>Password</b></label>
          <input type="password" placeholder="Enter Password" name="psw" required onChange={handlePasswordSignIn} value={passwordSignIn} className="form-input"/> 
          <button type="submit" className="signinbtn" onClick={handleSubmitSignIn}>Sign In</button> 
      </div>  
  </div>
  }
  </Window>);
}

export default Window;
