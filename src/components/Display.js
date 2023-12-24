import React, { useState } from "react";
import Board from "./Board";
import Keyboard from "./Keyboard";

function Display() {

  const [boardState, setBordState] = useState([["","","","",""]
                                              ,["","","","",""]
                                              ,["","","","",""]
                                              ,["","","","",""]
                                              ,["","","","",""]
                                              ,["","","","",""]]); 

  const [currentBox, setCurrentBox] = useState([0,0]);

  const handleKeyPress = (key) => {
    let newBoardState = boardState;
    if (key === "ENTER") {
      if (currentBox[0] !== 5 && currentBox[1]-1 === 4) {
        setCurrentBox([currentBox[0] + 1, 0]);
      }
      return;
    }
    if (key === "DELETE")  {
      if (currentBox[1]-1 < 0) {
        return;
      }
      setCurrentBox([currentBox[0],currentBox[1]-1])
      newBoardState[currentBox[0]][currentBox[1]-1] = "";
      setBordState(newBoardState);
      return;
    }
    if (currentBox[1] === 5) {
      return;
    }
    newBoardState[currentBox[0]][currentBox[1]] = key;
    setBordState(newBoardState);
    setCurrentBox([currentBox[0], currentBox[1] + 1]);
  }

  return (
    <div className="display">
      <Board state={boardState}/>
      <Keyboard pressKey={handleKeyPress}/>
    </div>
  );
}

export default Display;