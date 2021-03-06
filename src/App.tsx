import React, { useState, useEffect } from "react";
import './assets/styles/global.sass';
import "./App.sass";
import Die from "./components/Die/Die";
import {nanoid} from "nanoid";
import Confetti from 'react-confetti';
import Background from "./components/Background/Background";

interface IDices {
  value: number;
  isHeld: boolean;
  id: string;
}

function App() {
  const [dices, setDices] = useState<IDices[]>(getNewDices());
  const [tenzies, setTenzies] = useState<boolean>(false);

  function getNewDices(): IDices[] {
    const newDices = [];

    for (let i = 0; i < 10; i++) {
      newDices.push(generateNewDice());
    }

    return newDices;
  }

  function generateNewDice() {
    return {
      value: Math.round(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function rollDice() {
    if(!tenzies) {
      setDices((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateNewDice();
        })
      );
    } else {
      setDices(getNewDices());
      setTenzies(false);
    }
  }

  function holdDice(id: string) {
    setDices((oldDices) => oldDices.map(die => {
      return die.id === id ? {...die, isHeld: !die.isHeld} : die;
    }))
  }

  useEffect(() => {
    const allHeld = dices.every(die => die.isHeld);
    const firstValue = dices[0].value;
    const allSameValue = dices.every(die => die.value === firstValue);
    
    if(allHeld && allSameValue) {
      setTenzies(true);
    }
  }, [dices]);

  return (
    <div className="App">
      <Background />
      <main className="dice">
        {tenzies && <Confetti />}
        <h1 className="dice__title center">кубики в общем</h1>
        <p className="dice__description center">собери все одинаковые числа</p>
        <div className="dice__container">
          {dices.map((dice) => {
            return (
              <Die
                key={dice.id}
                value={dice.value}
                isHeld={dice.isHeld}
                id={dice.id}
                holdDice={() => holdDice(dice.id)}
              />
            );
          })}
        </div>
        <button onClick={rollDice} className="btn btn-roll">
          {tenzies ? "сыграть снова" : "перемешать короче"}
        </button>
      </main>
    </div>
  );
}

export default App;
