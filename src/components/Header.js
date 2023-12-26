import React, {useEffect, useState} from "react";
import logo from "../resources/wordle-logo.png";
import question from "../resources/question-mark.png";
import userIcon from "../resources/user.png";
import Window from "./Window";
import {auth} from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { addData } from "../services/database";


function Header() {

    const [user, setUser] = useState(null);

    const [active, setActive] = useState(false);
    const handleQuestion = () => {setActive(!active);}

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

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });
    }, []);

    return (
        <div className="header">
            <div className="header-section">
            </div>
            <div className="header-section">
                <img src={logo} alt="Logo" className="logo"/>
            </div>
            <div className="header-section header-right" >
                <img src={question} alt="Question" className="question" onClick={handleQuestion}/>
                <img src={userIcon} alt="User" className="userIcon" onClick={toggleUserWindow}/>
                <div className="userText" onClick={toggleUserWindow}>{user ? user.displayName : "Sign In"}</div>
            </div>

            <Window active={active} handleClose={handleQuestion}>
                <div className="headline">How To Play</div>
                <div className="subHeadline">Guess the Wordle in 6 tries.</div>
                <ul>
                    <li>Each guess must be a valid 5-letter word.</li>
                    <li>The color of the tiles will change to show how close your guess was to the word.</li>
                </ul>
            </Window>

            <Window active={signedUWindow} handleClose={toggleUserWindow}>
                {user ? <div>
                            <div>Welcome {user.displayName} </div> 
                            <button onClick={() => auth.signOut()}>Sign Out</button>
                        </div>: 
                        <div className="form">
                            <div className="signUp">
                                <div className="headline">Sign Up</div>
                                <label for="userName"><b>User Name</b></label>
                                <input type="text" placeholder="Enter User Name" name="userName" required onChange={handleUserNameSignUp} value={userNameSignUp} className="form-input"/>
                                <label for="email"><b>Email</b></label>
                                <input type="text" placeholder="Enter Email" name="email" required onChange={handleEmailSignUp} value={emailSignUp} className="form-input"/> 
                                <label for="psw"><b>Password</b></label>
                                <input type="password" placeholder="Enter Password" name="psw" required onChange={handlePasswordSignUp} value={passwordSignUp} className="form-input"/> 
                                <button type="submit" class="signupbtn" onClick={handleSubmitSignUp}>Sign Up</button> 
                            </div> 
                            <div className="or">- or -</div>
                            <div className="signIn">
                                <div className="headline">Sign In</div>
                                <label for="email"><b>Email</b></label>
                                <input type="text" placeholder="Enter Email" name="email" required onChange={handleEmailSignIn} value={emailSignIn} className="form-input"/> 
                                <label for="psw"><b>Password</b></label>
                                <input type="password" placeholder="Enter Password" name="psw" required onChange={handlePasswordSignIn} value={passwordSignIn} className="form-input"/> 
                                <button type="submit" class="signupbtn" onClick={handleSubmitSignIn}>Sign In</button> 
                            </div>  
                        </div>
                }
            </Window>
        </div>
    );
  }

  export default Header;