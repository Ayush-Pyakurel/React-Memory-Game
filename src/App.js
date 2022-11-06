import { useState } from 'react';
import './App.css';

const cardItems = [
  { src: '/img/helmet-1.png' },
  { src: '/img/potion-1.png' },
  { src: '/img/ring-1.png' },
  { src: '/img/scroll-1.png' },
  { src: '/img/shield-1.png' },
  { src: '/img/sword-1.png' },
];

function App() {
  //useState to hold the state of cards
  const [cards, setCards] = useState([]);

  //useState to hold the state of the turn user tried to arrange the cards
  const [turns, setTurns] = useState(0);

  //function to shuffle the cards
  const suffleCards = () => {
    //duplicating the array twice and storing in suffleCards array
    const suffleCards = [...cardItems, ...cardItems]
      .sort(() => Math.random() - 0.5)
      .map((cards) => {
        return { ...cards, id: Math.random() };
      });

    setCards(suffleCards);
    setTurns(0);
  };

  console.log(cards, turns);

  return (
    <div className='App'>
      <h1>Magic Match</h1>
      <button onClick={suffleCards}>New Game</button>
    </div>
  );
}

export default App;
