import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { deckArray } from './components/deck';

function App() {
  const [middlePile, setMiddlePile] = useState([]);

  const [player, setPlayer] = useState({
    hand: [],
    faceDown: [],
    faceUp: [],
  });
  const [computer, setComputer] = useState({
    hand: [],
    faceDown: [],
    faceUp: [],
  });
  const [deck, setDeck] = useState([...deckArray]);

  useEffect(() => {
    drawCards(deck);
  }, []);

  const drawCards = (deck) => {
    const newPlayer = { hand: [], faceDown: [], faceUp: [] };
    const newComputer = { hand: [], faceDown: [], faceUp: [] };

    for (let i = 1; i <= 3; i++) {
      drawCardForPlayer(newPlayer.hand, deck);
      drawCardForPlayer(newPlayer.faceDown, deck);
      drawCardForPlayer(newPlayer.faceUp, deck);
      drawCardForPlayer(newComputer.hand, deck);
      drawCardForPlayer(newComputer.faceDown, deck);
      drawCardForPlayer(newComputer.faceUp, deck);
    }

    setPlayer(newPlayer);
    setComputer(newComputer);
    setDeck(deck);
  };

  function drawCardForPlayer(playerCategory) {
    let randomNumber = Math.floor(Math.random()*deck.length)
    let randomCard = deck[randomNumber];
    playerCategory.push(randomCard);
    deck.splice(randomNumber, 1);
  };

  function playerTurn(index, playerCard) {
    if (!middlePile) {
      setMiddlePile(...middlePile, playerCard)
    }
    player.hand.splice(index, 1);
  };

  return (
    <div className="App">
      <div>{middlePile}</div>
      {player.hand.map((card, index) => (
        <div key={card.index} onClick={playerTurn(index, card)}>{card.suits}, {card.card}</div>
      ))}
    </div>
  );
}

export default App;
