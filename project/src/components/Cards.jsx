import React from "react";

export const Cards = ({ cards, handle_click }) => {
  return (
    <div className="all_cards">
      {cards.map((card) => (
        <div key={card.id} className="card_box" onClick={() => handle_click(card.id)}>
          <img
            src={card.image}
            alt=""
            style={{ width: "200px", height: "220px" }}
          />
          <h3>{card.name}</h3>
        </div>
      ))}
    </div>
  );
};
