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
  const [currentTurn, setCurrentTurn] = useState('');

  useEffect(() => {
    drawCards(deck);
  }, []);

  const drawCards = (deck) => {
    const newPlayer = { hand: [], faceDown: [], faceUp: [] };
    const newComputer = { hand: [], faceDown: [], faceUp: [] };

    for (let i = 1; i <= 4; i++) {
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
    setCurrentTurn('player');
  };

  function drawCardForPlayer(playerCategory) {
    let randomNumber = Math.floor(Math.random()*deck.length)
    let randomCard = deck[randomNumber];
    playerCategory.push(randomCard);
    deck.splice(randomNumber, 1);
  };

  const playerTurn = (index, playerCard) => {
    console.log(deck);
    setMiddlePile((prevPile) => [...prevPile, playerCard]);

    setPlayer((prevPlayer) => {
      const newHand = [...prevPlayer.hand];
      newHand.splice(index, 1);
      return { ...prevPlayer, hand: newHand };
    });
    drawCardForPlayer(player.hand);
    console.log(deck);
    setCurrentTurn('cpu');
  };

  

  return (
    <div className="App">
      <h1>Pile</h1>
      <div>{middlePile.map((card, index) => (
        <div key={index}>{card.suits}, {card.card}</div>
      ))}</div>
      <h1>Player hand</h1>
      {player.hand.map((card, index) => (
        <div key={card.index} onClick={() => playerTurn(index, card)}>{card.suits}, {card.card}</div>
      ))}
      <h1>Who's turn it is</h1>
      <div>{currentTurn}</div>
    </div>
  );
}

export default App;
