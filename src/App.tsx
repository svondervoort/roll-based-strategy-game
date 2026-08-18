import { useState } from "react";
import { CardsList } from "./components/CardsList";
import { LogList } from "./components/LogList";

import type { CardType } from "./types/CardType";
import type { LogType } from "./types/LogType";

function App() {

  const colors = ["red", "blue", "green", "yellow"];
  const actions = [
    {icon: "👊", name: "Punch"},
    {icon: "🔫", name: "Pistol"},
    {icon: "🚀", name: "Rocket"},
    {icon: "🌟", name: "Special"}
];

  const cardDefaults: CardType = {
    id: "",
    icon: "⁉️",
    name: "",
    color: "black",
    visible: true,
    selected: false,
  };

  const initialColorCards: CardType[] = colors.map((color) =>
    createCard({ icon: "🧑‍🦱", name: color, color: color }),
  );

  const colorOptionCards: CardType[] = colors.map((color) =>
    createCard({ icon: "🧑‍🦱", name: color, color: color }),
  );

  const initialActionCards: CardType[] = actions.map((action) =>
    createCard({ icon: action.icon, name: action.name }),
  );

  const actionOptionCards: CardType[] = actions.map((action) =>
    createCard({ icon: action.icon, name: action.name }),
  );

  const [gameState, setGameState] = useState<string>("addCards");
  const [colorCards, setColorCards] = useState<CardType[]>(initialColorCards);
  const [actionCards, setActionCards] = useState<CardType[]>(initialActionCards);
  const [logItems, setLogItems] = useState<LogType[]>([]);

  function createCard(overrides: Partial<CardType>): CardType {
    return {
      ...cardDefaults,
      id: crypto.randomUUID(),   // fresh unique id per card
      ...overrides,
    };
  }

  function addCard(card: CardType, type: string) {
    switch (type) {
      case "color":
        setColorCards((prev) => [...prev, createCard({ ...card, visible: false })]);
        break;
      case "action":
        setActionCards((prev) => [...prev, createCard({ ...card, visible: false })]);
        break;
    }
  }

  function pickCard() {
    setGameState("cardPicked");
    const colorPick = Math.floor(Math.random() * colorCards.length);
    setColorCards((prev) =>
      prev.map((card, i) => (
        { ...card, visible: true, selected: i === colorPick }
      )),
    );
    const actionPick = Math.floor(Math.random() * actionCards.length);
    setActionCards((prev) =>
      prev.map((card, i) => ({ ...card, visible: true, selected: i === actionPick })),
    );

    setLogItems((prev) => [...prev, {
      playerCard: colorCards[colorPick],
      actionCard: actionCards[actionPick]
    }])
  }

  function resetGame() {
    setColorCards(initialColorCards);
    setActionCards(initialActionCards);
    setGameState("addCards");
  }

  return (
    <div className="flex gap-8 h-screen w-screen">
      <div className="flex flex-col gap-8 w-3/4 p-4">
        <CardsList title="Player Stack" cards={colorCards} interactive={false} gameState={gameState}></CardsList>
        <CardsList title="Action Stack" cards={actionCards} interactive={false} gameState={gameState}></CardsList>

        {gameState === "addCards" ? (
          <div className="flex flex-col gap-8 p-4 bg-gray-50">
            
            <CardsList title="Add to Player Stack" cards={colorOptionCards} interactive={true} gameState={gameState} onClick={(card) => addCard(card, "color")}></CardsList>
            <CardsList title="Add to Action Stack" cards={actionOptionCards} interactive={true} gameState={gameState} onClick={(card) => addCard(card, "action")}></CardsList>

            <button type="button" onClick={() => pickCard()} className="p-4 border-2 cursor-pointer">
              Pick card
            </button>
          </div>
        ) : (
          <button type="button" onClick={() => resetGame()} className="p-4 border-2 cursor-pointer">
            Reset game
          </button>
        )}
      </div>
      <div className="w-1/4 flex flex-col gap-4 border-l border-gray-500 p-4 overflow-x-hidden overflow-y-auto">
        <LogList items={logItems}></LogList>
      </div>
    </div>
  );
}

export default App;
