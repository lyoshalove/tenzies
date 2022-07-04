import React from 'react';
import './Die.sass';

interface IDie {
  value: number;
  isHeld: boolean;
  id: string;
  holdDice: () => void;
}

const Die = (props: IDie) => {
  const styles = {
    backgroundColor: props.isHeld ? "#8ac926" : "#fff",
  };

  return (
    <div className="die" style={styles} onClick={props.holdDice}>
      <h2 className="die__title">{props.value}</h2>
    </div>
  );
};

export default Die;