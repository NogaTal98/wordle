import React, { useEffect, useState } from "react";
import Board from "./Board";
import Keyboard from "./Keyboard";

function Display() {

  const word = "HELLO";

  const [boardState, setBordState] = useState([[["", ""],["", ""],["", ""],["", ""],["", ""]]
                                              ,[["", ""],["", ""],["", ""],["", ""],["", ""]]
                                              ,[["", ""],["", ""],["", ""],["", ""],["", ""]]
                                              ,[["", ""],["", ""],["", ""],["", ""],["", ""]]
                                              ,[["", ""],["", ""],["", ""],["", ""],["", ""]]
                                              ,[["", ""],["", ""],["", ""],["", ""],["", ""]]]); 
                                              
  const [keyBoardState, setKeyBordState] = useState({"Q":"","W":"","E":"","R":"","T":"","Y":"","U":"","I":"","O":"","P":"",
                                                      "A":"","S":"","D":"","F":"","G":"","H":"","J":"","K":"","L":"",
                                                      "Z":"","X":"","C":"","V":"","B":"","N":"","M":""})

  const [gameState, setGameState] = useState("playing"); // "playing", "win", "lose"

  const [currentBox, setCurrentBox] = useState([0,0]);

  const [englishWords, setenglishWords] = useState([]);

  useEffect(() => {
    var englishWordsFile = require(process.env.PUBLIC_URL + '../resources/EnglishWords.txt');
    fetch(englishWordsFile)
      .then((r) => r.text())
      .then((text) => {
        setenglishWords(text.split("\n"));
      });
  }, []);


  const handleKeyPress = (key) => {
    if (gameState === "playing") {
      let newBoardState = boardState;
      let newKeyBoardState = keyBoardState;
      let coppyWord = word;
      let guess = "";
      for (let i = 0; i < newBoardState[currentBox[0]].length; i++) {
        guess = guess + boardState[currentBox[0]][i][0];
      }
      if (key === "ENTER") {
        if (!englishWords.includes(guess.toLowerCase())) {
          return;
        }
        if (currentBox[0] !== 5 && currentBox[1]-1 === 4) {
          setCurrentBox([currentBox[0] + 1, 0]);
          
          for (let i = 0; i < word.length; i++) {
            let char = boardState[currentBox[0]][i][0];
            // corect letter and place
            if (char === word[i]) {
              newBoardState[currentBox[0]][i][1] = "correct";
              newKeyBoardState[char] = "correct";
              coppyWord = coppyWord.replace(char, "");
            }
            else if (coppyWord.indexOf(char) >= 0) {
              newBoardState[currentBox[0]][i][1] = "missed";
              if (newKeyBoardState[char] === "") {
                newKeyBoardState[char] = "missed";
              }
            }
            else {
              newBoardState[currentBox[0]][i][1] = "wrong";
              if (newKeyBoardState[char] === "") {
                newKeyBoardState[char] = "wrong";
              }
            }
            setKeyBordState(newKeyBoardState);
          }

          if (word === guess) {
            setGameState("win");
          }
          else if (currentBox[0] === 5 && word !== guess) {
            setGameState("lose");
          }
        }
        return;
      }
      if (key === "DELETE")  {
        if (currentBox[1]-1 < 0) {
          return;
        }
        setCurrentBox([currentBox[0],currentBox[1]-1])
        newBoardState[currentBox[0]][currentBox[1]-1] = ["",""];
        setBordState(newBoardState);
        return;
      }
      if (currentBox[1] === 5) {
        return;
      }
      newBoardState[currentBox[0]][currentBox[1]] = [key, "filled"];
      setBordState(newBoardState);
      setCurrentBox([currentBox[0], currentBox[1] + 1]);
    }
  }

  return (
    <div className="display">
      <Board state={boardState}/>
      <Keyboard states={keyBoardState} pressKey={handleKeyPress}/>
    </div>
  );
}

export default Display;