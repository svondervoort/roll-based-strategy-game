import { useState } from "react";

import { CardsList } from "./components/CardsList";
import { GameControls } from "./components/GameControls";
import { LogList } from "./components/LogList";

import { randomInt } from "./helpers/Helpers";

import { CardKind, type CardType } from "./types/CardType";
import type { LogType } from "./types/LogType";

export enum GameState {
  SelectCards = "selectCards",
  AddCards = "addCards",
  CardsPicked = "cardsPicked",
}

export enum Owner {
  Player = "player",
  Game = "game",
}

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
  type: CardKind.Default,
  owner: Owner.Game,
};

const cardsMaxAmount = 6;

function App() {
  const initialColorCards: CardType[] = colors.map((color) =>
    createCard({ icon: "🧑‍🦱", name: color.name, color: color.color, type: CardKind.Color }),
  );

  const initialMovementCards: CardType[] = movements.map((movement) =>
    createCard({ icon: movement.icon, name: movement.name, type: CardKind.Movement }),
  );

  const initialActionCards: CardType[] = actions.map((action) =>
    createCard({ icon: action.icon, name: action.name, type: CardKind.Action }),
  );

  const [gameState, setGameState] = useState<GameState>(GameState.SelectCards);
  const [colorCards, setColorCards] = useState<CardType[]>(initialColorCards);
  const [movementCards, setMovementCards] = useState<CardType[]>(initialMovementCards);
  const [actionCards, setActionCards] = useState<CardType[]>(initialActionCards);
  const [playerCards, setPlayerCards] = useState<CardType[]>(() => generatePlayerCards());
  const [logItems, setLogItems] = useState<LogType[]>([]);

  function generatePlayerCards (): CardType[] {
    const cards = [];
    const playerCardsCount = randomInt(1, (cardsMaxAmount/2));
    const remainingCardsCount = cardsMaxAmount - playerCardsCount;
    // Create Player Cards
    for (let i = 0; i < playerCardsCount; i++) {
      cards.push(createCard({ icon: "🧑‍🦱", name: colors[0].name, color: colors[0].color, type: CardKind.Color, owner: Owner.Player }))
    }
    // Fill remaining slots with Action Cards
    for (let i = 0; i < remainingCardsCount; i++) {
      // Select a random action from the possible actions
      const action = actions[randomInt(0, actions.length - 1)];
      cards.push(createCard({ icon: action.icon, name: action.name, type: CardKind.Action, owner: Owner.Player }))
    }

    return cards;
  }

  function createCard(overrides: Partial<CardType>): CardType {
    return {
      ...cardDefaults,
      ...overrides,
      id: crypto.randomUUID(),   // fresh unique id per card
    };
  }

  function selectCard(card: CardType) {
    setPlayerCards((prev) =>
      prev.map((c) => (c.id === card.id ? { ...c, selected: !c.selected } : c)),
    );
  }

  function addCards(cards: CardType[]) {
    console.log(playerCards);
    for (let i = 0; i < cards.length; i++) {
      switch (cards[i].type) {
        case "color":
          setColorCards((prev) => [...prev, createCard({ ...cards[i], visible: false, selected: false, owner: Owner.Game })]);
          break;
        case "movement":
          setMovementCards((prev) => [...prev, createCard({ ...cards[i], visible: false, selected: false, owner: Owner.Game })]);
          break;
        case "action":
          setActionCards((prev) => [...prev, createCard({ ...cards[i], visible: false, selected: false, owner: Owner.Game })]);
          break;
      }
    }
    setGameState(GameState.AddCards);
  }

  function pickCard() {
    console.log(playerCards);
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

    setGameState(GameState.CardsPicked);
  }

  function resetGame() {
    setColorCards(initialColorCards);
    setMovementCards(initialMovementCards);
    setActionCards(initialActionCards);
    setPlayerCards(generatePlayerCards());
    setGameState(GameState.SelectCards);
  }

  return (
    <div className="flex h-screen w-screen">
      <div className="w-3/4 flex flex-col">
        <div className="flex grow gap-8">
          <div className="flex w-1/2 items-center justify-center">
          <CardsList title="Color Stack" owner={Owner.Game} cards={colorCards} interactive={false} gameState={gameState}></CardsList>
          </div>
          <div className="flex w-1/2 items-center justify-center">
            <CardsList title="Action Stack" owner={Owner.Game} cards={actionCards} interactive={false} gameState={gameState}></CardsList>
          </div>
        </div>
        <div className="border-t border-gray-500">
          <div className="p-4">
            <CardsList title="Player Cards" owner={Owner.Player} cards={playerCards} interactive={gameState === GameState.SelectCards} gameState={gameState} onClick={(card) => selectCard(card)}></CardsList>
          </div>


          <div className="flex flex-col gap-8 p-4 bg-gray-50">
            <GameControls gameState={gameState} onAddCards={() => addCards(playerCards.filter(card => card.selected))} onPickCard={pickCard} onReset={resetGame} />
          </div>
        </div>
      </div>
      <div className="w-1/4 flex flex-col gap-4 border-l border-gray-500 overflow-x-hidden overflow-y-auto">
        <LogList items={logItems}></LogList>
      </div>
    </div>
  );
}

export default App;
