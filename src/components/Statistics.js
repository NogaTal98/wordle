import React, { useState, useEffect } from "react";
import { getWinningPercentage, getGuessNumbers } from "../services/database";

function Statistics({}) {
    const [winningPercentage, setWinningPercentage] = useState(0);
    const [guessNumbers, setGuessNumbers] = useState({});

    useEffect(() => {
        getWinningPercentage().then((percentage) => {
            setWinningPercentage(percentage);
        });
        getGuessNumbers().then((numbers) => {
            setGuessNumbers(numbers);
        });
    }, []);

    return (
        <div >
            your win-rate: {winningPercentage*100}%!
            <br/>
            your guess numbers:<br/>
            You guessed the wordle in one guess {guessNumbers["1"]} times.<br/>
            You guessed the wordle in two guesses {guessNumbers["2"]} times.<br/>
            You guessed the wordle in three guesses {guessNumbers["3"]} times.<br/>
            You guessed the wordle in four guesses {guessNumbers["4"]} times.<br/>
            You guessed the wordle in five guesses {guessNumbers["5"]} times.<br/>
            You guessed the wordle in six guesses {guessNumbers["6"]} times.
        </div>
    );
  }
  export default Statistics;