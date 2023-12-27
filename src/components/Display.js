import React, { useEffect, useState } from "react";
import Board from "./Board";
import Keyboard from "./Keyboard";
import Window from "./Window";
import { getBoard, updateDataBaseBoard } from "../services/database";
import {paintRow, paintKeyBoard} from "../services/gameUtility";
import { auth } from "../firebase";

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

  const [, updateState] = useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  function timeout(delay) {
    return new Promise( res => setTimeout(res, delay) );
  }

  const updateBoard = (word) => {
    getBoard(word).then((board) => {
      setBordState(board.concat());
      for (let i = 0; i < board.length; i++) {
        if (board[i][0][0] === "") {
          setCurrentBox([i,0]);
          break;
        }
      }
    });
  }

  const updateKeyBoard = () => {
    getBoard(dailyWord).then((board) => {
      setKeyBordState(paintKeyBoard(board));
    });
  }

  useEffect(() => {
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
        let word = words[Math.floor(randomNumber * words.length)].toUpperCase();
        setDailyWord(word);
        return word;
      }).then((word) => {
        updateBoard(word);
        auth.onIdTokenChanged(() => {
          updateBoard(word);
          updateKeyBoard();
        });
      });
      
    
  }, []);

  const handleKeyPress = async (key) => {
    if (gameState === "playing") {
      let newBoardState = boardState;
      let guess = "";
      for (let i = 0; i < newBoardState[currentBox[0]].length; i++) {
        guess = guess + boardState[currentBox[0]][i][0];
      }
      console.log("daily word is "+dailyWord);
      
      if (key === "ENTER") {
        if (!englishWords.includes(guess.toLowerCase())) {
          return;
        }

        if (currentBox[0] <= 5 && currentBox[1]-1 === 4) {
          setCurrentBox([currentBox[0] + 1, 0]);
          let row = paintRow(boardState[currentBox[0]], dailyWord);

          // animation
          for (let i = 0; i < newBoardState[currentBox[0]].length; i++) {
            newBoardState[currentBox[0]][i] = row[i];
            newBoardState[currentBox[0]][i][2] = true;
            setBordState(newBoardState)
            forceUpdate();
            await timeout(300);
          }
          setKeyBordState(paintKeyBoard(newBoardState));

          if (dailyWord === guess) {
            setGameState("win");
            setWindowState(true);
          }
          else if (currentBox[0] === 5 && dailyWord !== guess) {
            setGameState("lose");
            setWindowState(true);
          }
        }
        console.log("new board " + newBoardState);
        updateDataBaseBoard(newBoardState);
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