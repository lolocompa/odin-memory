import { useState, useEffect } from "react";
import "./App.css";
import { data } from "./components/data";
import { Score } from "./components/Score";
import { Cards } from "./components/Cards";

class card {
  constructor(id, image, name) {
    this.id = id;
    this.image = image;
    this.name = name;
    this.clicked = false;
  }
}

function randomize_order(array) {
  const new_array = [...array];
  for (let i = new_array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // Swap elements at i and j
    [new_array[i], new_array[j]] = [new_array[j], new_array[i]];
  }
  return new_array;
}

function App() {
  const [score, setscore] = useState(0);
  const [best_score, setbest_score] = useState(0);
  const [winMessage, setWinMessage] = useState(null);

  const [cards, setCards] = useState(
    data.map((item) => new card(item.id, item.image, item.name))
  );

  function reset_game() {
    setCards((prev_cards) => {
      const resetCards = prev_cards.map((card) => ({
        ...card,
        clicked: false,
      }));
      setscore(0);
      setscore(0);
      setWinMessage(null);
      const shuffled_array = randomize_order(resetCards);
      return shuffled_array;
    });
  }

  function handle_click(id) {
    const cardClicked = cards.find((card) => card.id === id && card.clicked);

    if (cardClicked) {
      setCards((prev_cards) => {
        const resetCards = prev_cards.map((card) => ({
          ...card,
          clicked: false,
        }));
        score > best_score ? setbest_score(score) : null;
        setscore(0);
        setWinMessage(null);
        const shuffled_array = randomize_order(resetCards);
        return shuffled_array;
      });
    } else {
      setCards((prev_cards) => {
        const updatedCards = prev_cards.map((card) =>
          card.id === id ? { ...card, clicked: true } : card
        );
        const shuffled_array = randomize_order(updatedCards);
        return shuffled_array;
      });
    }
    setscore((prevScore) => prevScore + 1);
    if (score === 9) {
      setWinMessage("You Win!");
    }
  }

  return (
    <div className="page">
      <img
        src="https://1000marcas.net/wp-content/uploads/2022/10/One-Piece-Logo.png"
        alt="One Piece Logo"
      />{" "}
      <Score score={score} best_score={best_score}></Score>
      <Cards cards={cards} handle_click={handle_click}></Cards>
      {winMessage && (
        <div className="win">
          <h1>{winMessage}</h1>
          <button onClick={reset_game}>Reset</button>
        </div>
      )}
    </div>
  );
}

export default App;
