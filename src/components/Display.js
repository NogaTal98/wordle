import React, { useEffect, useState } from "react";
import Board from "./Board";
import Keyboard from "./Keyboard";
import Window from "./Window";
import { getBoard, setBoard } from "../services/database";

function Display() {
  var englishWordsFile = require(process.env.PUBLIC_URL + '../resources/EnglishWords.txt');
  var possibleWordsFile = require(process.env.PUBLIC_URL + '../resources/PossibleWords.txt');

  const [boardState, setBordState] = useState([]); 
                                              
  const [keyBoardState, setKeyBordState] = useState({"Q":"","W":"","E":"","R":"","T":"","Y":"","U":"","I":"","O":"","P":"",
                                                      "A":"","S":"","D":"","F":"","G":"","H":"","J":"","K":"","L":"",
                                                      "Z":"","X":"","C":"","V":"","B":"","N":"","M":""})

  const [gameState, setGameState] = useState("playing"); // "playing", "win", "lose"

  const [currentBox, setCurrentBox] = useState([0,0]);

  const [englishWords, setEnglishWords] = useState([]);

  const [dailyWord, setDailyWord] = useState("");

  const [windowState, setWindowState] = useState(false);

  const date = new Date();
  const seed = date.getFullYear().toString() + date.getMonth().toString() + date.getDate().toString();

  useEffect(() => {
    getBoard().then((board) => {
      setBordState(board);
    });
    fetch(englishWordsFile)
      .then((r) => r.text())
      .then((text) => {
        setEnglishWords(text.split("\n"));
      });
      fetch(possibleWordsFile)
        .then((r) => r.text())
        .then((text) => {
          let words = text.split(/(\s+)/).filter( function(e) { return e.trim().length > 0; } );
          const seedrandom = require('seedrandom');
          const generator = seedrandom(seed);
          const randomNumber = generator();
          setDailyWord(words[Math.floor(randomNumber * words.length)].toUpperCase());
        });
  }, []);

  const handleKeyPress = (key) => {
    if (gameState === "playing") {
      let newBoardState = boardState;
      let newKeyBoardState = keyBoardState;
      let coppyWord = dailyWord;
      let guess = "";
      for (let i = 0; i < newBoardState[currentBox[0]].length; i++) {
        guess = guess + boardState[currentBox[0]][i][0];
      }
      console.log(dailyWord);
      if (key === "ENTER") {
        if (!englishWords.includes(guess.toLowerCase())) {
          return;
        }
        if (currentBox[0] <= 5 && currentBox[1]-1 === 4) {
          setCurrentBox([currentBox[0] + 1, 0]);
          
          for (let i = 0; i < dailyWord.length; i++) {
            let char = boardState[currentBox[0]][i][0];
            // correct letter and place 
            if (char === dailyWord[i]) {
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

          if (dailyWord === guess) {
            setGameState("win");
            setWindowState(true);
          }
          else if (currentBox[0] === 5 && dailyWord !== guess) {
            setGameState("lose");
            setWindowState(true);
          }
        }
        setBoard(newBoardState);
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

  const handleClose = () => {
    setWindowState(false);
  }

  return (
    <div className="display">
      <Board state={boardState}/>
      <Keyboard states={keyBoardState} pressKey={handleKeyPress}/>
      <Window active={windowState} handleClose={handleClose}>
        <div className="headline">{gameState === "win" ? "You Win" : "You Lose"}</div>
        <div className="subHeadline">The word was {dailyWord}.</div>
      </Window>
    </div>
  );
}

export default Display;