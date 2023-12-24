import React, { useState } from "react";
import Board from "./Board";
import Keyboard from "./Keyboard";

function Display() {

  // const [boardState, setBordState] = useState([["","","","",""]
  //                                             ,["","","","",""]
  //                                             ,["","","","",""]
  //                                             ,["","","","",""]
  //                                             ,["","","","",""]
  //                                             ,["","","","",""]]); 

  return (
    <div className="display">
      <Board />
      <Keyboard />
    </div>
  );
}

export default Display;