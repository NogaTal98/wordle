
import { useState } from 'react';
import Box from './Box';


function Board() {
    return (
      <div className="board">
        <div className="row">
            <Box />
            <Box />
            <Box />
            <Box />
            <Box />
        </div>
        <div className="row">
            <Box />
            <Box />
            <Box />
            <Box />
            <Box />
        </div>
        <div className="row">
            <Box />
            <Box />
            <Box />
            <Box />
            <Box />
        </div>
        <div className="row">
            <Box />
            <Box />
            <Box />
            <Box />
            <Box />
        </div>
        <div className="row">
            <Box />
            <Box />
            <Box />
            <Box />
            <Box />
        </div>
        <div className="row">
            <Box />
            <Box />
            <Box />
            <Box />
            <Box />
        </div>
      </div>
    );
  }

  export default Board;