import React, {useState} from "react";
import logo from "../resources/wordle-logo.png";
import question from "../resources/question-mark.png";
import Window from "./Window";

function Header() {

    const [active, setActive] = useState(false);
    const handleQuestion = () => {
        setActive(!active);
    }

    return (
        <div className="header">
            <div className="header-section">

            </div>
            <div className="header-section">
                <img src={logo} alt="Logo" className="logo"/>
            </div>
            <div className="header-section header-right" >
                <img src={question} alt="Question" className="question" onClick={handleQuestion}/>
            </div>
            {/* 
            <img src={question} alt="Question" className="question"/> */}



        <Window active={active} handleClose={handleQuestion}>
            <div className="headline">How To Play</div>
            <div className="subHeadline">Guess the Wordle in 6 tries.</div>
            <ul>
                <li>Each guess must be a valid 5-letter word.</li>
                <li>The color of the tiles will change to show how close your guess was to the word.</li>
            </ul>
        </Window>

        </div>
    );
  }

  export default Header;