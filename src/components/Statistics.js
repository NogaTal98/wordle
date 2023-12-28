import React, { useState, useEffect } from "react";
import { getWinningPercentage, getGuessNumbers } from "../services/database";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title
  );

  export const options = {
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 0,
      },
    },
    responsive: true,
    plugins: {
        title: {
            display: true,
            text: 'GUESS DISTRIBUTION',
        },
    },
  };

  
const labels = ['1', '2', '3', '4', '5', '6'];

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
            {winningPercentage === 0 ? "You haven't played any games yet!" : 
            <Bar options={options} data={{
                                    labels,
                                    datasets: [
                                        {
                                        label: 'correct guesses',
                                        data: [guessNumbers["1"], guessNumbers["2"], guessNumbers["3"], guessNumbers["4"], guessNumbers["5"], guessNumbers["6"]],
                                        backgroundColor: '#787c7e',
                                        }
                                    ],
                                    }}
            />}
        </div> 
    );
  }
  export default Statistics;