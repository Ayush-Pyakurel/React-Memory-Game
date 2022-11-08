import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './Components/SingleCard';

const cardItems = [
  { src: '/img/helmet-1.png', matched: false },
  { src: '/img/potion-1.png', matched: false },
  { src: '/img/ring-1.png', matched: false },
  { src: '/img/scroll-1.png', matched: false },
  { src: '/img/shield-1.png', matched: false },
  { src: '/img/sword-1.png', matched: false },
];

function App() {
  //useState to hold the state of cards
  const [cards, setCards] = useState([]);

  //useState to hold the state of the turn user tried to arrange the cards
  const [turns, setTurns] = useState(0);

  //useState to hold the state of the user choice of two different card to compare
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  //function to shuffle the cards
  const suffleCards = () => {
    //duplicating the array twice and storing in suffleCards array
    const suffleCards = [...cardItems, ...cardItems]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(suffleCards);
    setTurns(0);
  };

  //handle choice of the user
  const handleChoiceClick = (card) => {
    choiceOne ? setChoiceTwo(() => card) : setChoiceOne(() => card);
  };

  //compare two selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCard) => {
          return prevCard.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        console.log('those card dont match');
        resetTurn();
      }
    }
  }, [choiceOne, choiceTwo]);
  console.log(cards);

  //reset choice and also increase the turn
  const resetTurn = () => {
    setChoiceOne(() => null);
    setChoiceTwo(() => null);
    setTurns((prev) => prev + 1);
  };

  return (
    <div className='App'>
      <h1>Magic Match</h1>
      <button onClick={suffleCards}>New Game</button>

      <div className='card-grid'>
        {cards.map((card) => {
          return (
            <SingleCard
              card={card}
              key={card.id}
              handleChoiceClick={handleChoiceClick}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
