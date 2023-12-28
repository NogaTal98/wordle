import React, {useEffect, useState} from "react";
import logo from "../resources/wordle-logo.png";
import question from "../resources/question-mark.png";
import userIcon from "../resources/user.png";
import Window, { SignInWindow } from "./Window";
import {auth} from "../firebase";

function Header() {

    const [user, setUser] = useState(null);

    const [active, setActive] = useState(false);
    const handleQuestion = () => {setActive(!active);}

    const [signedUWindow, setSignedUWindow] = useState(false);
    const toggleUserWindow = () => {setSignedUWindow(!signedUWindow)}
    
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

            <SignInWindow active={signedUWindow} handleClose={toggleUserWindow}/>
        </div>
    );
  }

  export default Header;