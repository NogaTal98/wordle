import React from "react";
import logo from "../resources/wordle-logo.png";
import question from "../resources/question-mark.png";

function Header() {
    return (
        <div className="header">
            <div className="header-section">

            </div>
            <div className="header-section">
                <img src={logo} alt="Logo" className="logo"/>
            </div>
            <div className="header-section header-right">
                <img src={question} alt="Question" className="question"/>
            </div>
            {/* 
            <img src={question} alt="Question" className="question"/> */}
        </div>
    );
  }

  export default Header;