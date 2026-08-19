import { useState } from "react";
import { CardsList } from "./components/CardsList";
import { LogList } from "./components/LogList";

import type { CardType } from "./types/CardType";
import type { LogType } from "./types/LogType";

function App() {

  const colors = [
    { color: "oklch(63.7% 0.237 25.331)", name: "Red" },
    { color: "oklch(76.8% 0.233 130.85)", name: "Green" },
    { color: "oklch(68.5% 0.169 237.323)", name: "Blue" },
    { color: "oklch(79.5% 0.184 86.047)", name: "Yellow" }
  ];

  const movements = [
    {icon: "🚶‍➡️", name: "Walk"},
    {icon: "🏃‍➡️", name: "Run"},
    {icon: "🦘", name: "Jump"},
    {icon: "🪄", name: "Teleport"}
];

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
    color: "oklch(55.4% 0.046 257.417)",
    visible: true,
    selected: false,
  };

  const initialColorCards: CardType[] = colors.map((color) =>
    createCard({ icon: "🧑‍🦱", name: color.name, color: color.color }),
  );

  const colorOptionCards: CardType[] = colors.map((color) =>
    createCard({ icon: "🧑‍🦱", name: color.name, color: color.color }),
  );

  const initialMovementCards: CardType[] = movements.map((movement) =>
    createCard({ icon: movement.icon, name: movement.name }),
  );

  const movementOptionCards: CardType[] = movements.map((movement) =>
    createCard({ icon: movement.icon, name: movement.name }),
  );

  const initialActionCards: CardType[] = actions.map((action) =>
    createCard({ icon: action.icon, name: action.name }),
  );

  const actionOptionCards: CardType[] = actions.map((action) =>
    createCard({ icon: action.icon, name: action.name }),
  );

  const [gameState, setGameState] = useState<string>("addCards");
  const [colorCards, setColorCards] = useState<CardType[]>(initialColorCards);
  const [movementCards, setMovementCards] = useState<CardType[]>(initialMovementCards);
  const [actionCards, setActionCards] = useState<CardType[]>(initialActionCards);
  const [logItems, setLogItems] = useState<LogType[]>([]);

  function createCard(overrides: Partial<CardType>): CardType {
    return {
      ...cardDefaults,
      ...overrides,
      id: crypto.randomUUID(),   // fresh unique id per card
    };
  }

  function addCard(card: CardType, type: string) {
    switch (type) {
      case "color":
        setColorCards((prev) => [...prev, createCard({ ...card, visible: false })]);
        break;
      case "movement":
        setMovementCards((prev) => [...prev, createCard({ ...card, visible: false })]);
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
    const movementPick = Math.floor(Math.random() * movementCards.length);
    setMovementCards((prev) =>
      prev.map((card, i) => (
        { ...card, visible: true, selected: i === movementPick }
      )),
    );
    const actionPick = Math.floor(Math.random() * actionCards.length);
    setActionCards((prev) =>
      prev.map((card, i) => ({ ...card, visible: true, selected: i === actionPick })),
    );

    setLogItems((prev) => [...prev, {
      playerCard: colorCards[colorPick],
      movementCard: movementCards[movementPick],
      actionCard: actionCards[actionPick]
    }])
  }

  function resetGame() {
    setColorCards(initialColorCards);
    setMovementCards(initialMovementCards);
    setActionCards(initialActionCards);
    setGameState("addCards");
  }

  return (
    <div className="flex gap-8 h-screen w-screen">
      <div className="flex flex-col gap-8 w-3/4 p-4">

        <div className="flex gap-8">
          <div className="shrink-0">
            <CardsList title="Add to Player Stack" cards={colorOptionCards} interactive={gameState === 'addCards'} gameState={gameState} onClick={(card) => addCard(card, "color")}></CardsList>
          </div>
          <div className="overflow-x-auto">
            <CardsList title="Player Stack" cards={colorCards} interactive={false} gameState={gameState}></CardsList>
          </div>
        </div>

        <div className="flex gap-8">
          <div className="shrink-0">
            <CardsList title="Add to Action Stack" cards={movementOptionCards} interactive={gameState === 'addCards'} gameState={gameState} onClick={(card) => addCard(card, "movement")}></CardsList>
          </div>
          <div>
            <CardsList title="Movement Stack" cards={movementCards} interactive={false} gameState={gameState}></CardsList>
          </div>
        </div>

        <div className="flex gap-8">
          <div className="shrink-0">
            <CardsList title="Add to Action Stack" cards={actionOptionCards} interactive={gameState === 'addCards'} gameState={gameState} onClick={(card) => addCard(card, "action")}></CardsList>
          </div>
          <div>
            <CardsList title="Action Stack" cards={actionCards} interactive={false} gameState={gameState}></CardsList>
          </div>
        </div>

        
        
        

        {gameState === "addCards" ? (
          <div className="flex flex-col gap-8 p-4 bg-gray-50">
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
      <div className="w-1/4 flex flex-col gap-4 border-l border-gray-500 overflow-x-hidden overflow-y-auto">
        <LogList items={logItems}></LogList>
      </div>
    </div>
  );
}

export default App;
