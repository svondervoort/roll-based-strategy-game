import { useState } from "react";

import { CardsList } from "./components/CardsList";
import { GameControls } from "./components/GameControls";
import { LogList } from "./components/LogList";
import { Player } from "./components/Player";

import { randomInt } from "./helpers/Helpers";

import { CardKind, type CardType } from "./types/CardType";
import type { LogType } from "./types/LogType";
import { PlayerKind, type PlayerType } from "./types/PlayerType";

/********************************************************************************************************************************
 * 🗄️ Fixed data
 *******************************************************************************************************************************/

export enum GamePhase {
  Planning = "planning",
  Picking = "picking",
  Action = "action",
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

const playerDefaults: Omit<PlayerType, "id"> = {
  icon: "🧑‍🦱",
  name: "",
  color: colors[0].color,
  hp: 100,
  maxHp: 100,
  kind: PlayerKind.AI,
};

const cardDefaults: Omit<CardType, "id"> = {
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
  /********************************************************************************************************************************
   * 🗄️ Dynamic data and states
   *******************************************************************************************************************************/

  const initialColorCards = (players: PlayerType[]): CardType[] => players.map((player) =>
    createCard({ icon: player.icon, name: player.name, color: player.color, type: CardKind.Color }),
  );

  const initialMovementCards: CardType[] = movements.map((movement) =>
    createCard({ icon: movement.icon, name: movement.name, type: CardKind.Movement }),
  );

  const initialActionCards: CardType[] = actions.map((action) =>
    createCard({ icon: action.icon, name: action.name, type: CardKind.Action }),
  );

  const [gamePhase, setGamePhase] = useState<GamePhase>(GamePhase.Planning);
  const [players, setPlayers] = useState<PlayerType[]>(createPlayers());
  const [colorCards, setColorCards] = useState<CardType[]>(initialColorCards(players));
  const [movementCards, setMovementCards] = useState<CardType[]>(initialMovementCards);
  const [actionCards, setActionCards] = useState<CardType[]>(initialActionCards);
  const [playerCards, setPlayerCards] = useState<CardType[]>(() => generatePlayerCards());
  const [logItems, setLogItems] = useState<LogType[]>([]);

  /********************************************************************************************************************************
   * ▶️ Setup the Players (User and AI)
   *******************************************************************************************************************************/

  function createPlayers(): PlayerType[] {
    const players: PlayerType[] = [];

    players.push(createPlayer({ name: "You", kind: PlayerKind.User, color: colors[0].color }))
    players.push(createPlayer({ name: "AI 1", icon: "🤖", color: colors[1].color }))
    players.push(createPlayer({ name: "AI 2", icon: "🤖", color: colors[2].color }))
    players.push(createPlayer({ name: "AI 3", icon: "🤖", color: colors[3].color }))

    return players;
  }

  /********************************************************************************************************************************
   * ▶️ Creates Player objects with default and overwrites
   *******************************************************************************************************************************/

  function createPlayer(overrides: Partial<PlayerType>): PlayerType {
    return {
      ...playerDefaults,
      ...overrides,
      id: crypto.randomUUID(),   // fresh unique id per card
    };
  }

  /********************************************************************************************************************************
   * ▶️ Generate a random collection of Player Cards
   *******************************************************************************************************************************/

  function generatePlayerCards (): CardType[] {
    const userPlayer: PlayerType | undefined = players.find((p) => p.kind === PlayerKind.User);
    const cards: CardType[] = [];
    const playerCardsCount = randomInt(1, (cardsMaxAmount/2));
    const remainingCardsCount = cardsMaxAmount - playerCardsCount;
    // Create Player Cards
    for (let i = 0; i < playerCardsCount; i++) {
      cards.push(createCard({ icon: userPlayer?.icon, name: userPlayer?.name, color: userPlayer?.color, type: CardKind.Color, owner: Owner.Player }))
    }
    // Fill remaining slots with Action Cards
    for (let i = 0; i < remainingCardsCount; i++) {
      // Select a random action from the possible actions
      const action = actions[randomInt(0, actions.length - 1)];
      cards.push(createCard({ icon: action.icon, name: action.name, type: CardKind.Action, owner: Owner.Player }))
    }

    return cards;
  }

  /********************************************************************************************************************************
   * ▶️ Creates Card objects with default and overwrites
   *******************************************************************************************************************************/

  function createCard(overrides: Partial<CardType>): CardType {
    return {
      ...cardDefaults,
      ...overrides,
      id: crypto.randomUUID(),   // fresh unique id per card
    };
  }

  /********************************************************************************************************************************
   * ▶️ Update Player Cards with the Selected states
   *******************************************************************************************************************************/

  function selectCard(card: CardType) {
    setPlayerCards((prev) =>
      prev.map((c) => (c.id === card.id ? { ...c, selected: !c.selected } : c)),
    );
  }

  /********************************************************************************************************************************
   * ▶️ Add selected Player Cards to the Game Card Stacks
   *******************************************************************************************************************************/

  function planningCards(cards: CardType[]) {
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
    setGamePhase(GamePhase.Picking);
  }

  /********************************************************************************************************************************
   * ▶️ Picks a random Card from each Game Stack and updates the Log
   *******************************************************************************************************************************/

  function pickCards() {
    // Get a random number of all color cards and set that number to selected
    const colorPick = Math.floor(Math.random() * colorCards.length);
    setColorCards((prev) =>
      prev.map((card, i) => (
        { ...card, visible: true, selected: i === colorPick }
      )),
    );

    // Get a random number of all movement cards and set that number to selected
    const movementPick = Math.floor(Math.random() * movementCards.length);
    setMovementCards((prev) =>
      prev.map((card, i) => (
        { ...card, visible: true, selected: i === movementPick }
      )),
    );

    // Get a random number of all action cards and set that number to selected
    const actionPick = Math.floor(Math.random() * actionCards.length);
    setActionCards((prev) =>
      prev.map((card, i) => ({ ...card, visible: true, selected: i === actionPick })),
    );

    // Update the log with the selected cards
    setLogItems((prev) => [{
      id: crypto.randomUUID(),
      timestamp: new Date(),
      playerCard: colorCards[colorPick],
      movementCard: movementCards[movementPick],
      actionCard: actionCards[actionPick]
    }, ...prev])

    // Update gamePhase
    setGamePhase(GamePhase.Action);
  }

  /********************************************************************************************************************************
   * ▶️ Based on the color picked let the corresponding player do the action on another player
   *******************************************************************************************************************************/

  function doActionOnPlayer() {
    
  }

  /********************************************************************************************************************************
   * ▶️ Reset all Card stacks for a new round
   *******************************************************************************************************************************/

  function resetRound() {
    setColorCards(initialColorCards(players));
    setMovementCards(initialMovementCards);
    setActionCards(initialActionCards);
    setPlayerCards(generatePlayerCards());
    setGamePhase(GamePhase.Planning);
  }

  /********************************************************************************************************************************
   * 🖼️ Renders the app
   *******************************************************************************************************************************/

  return (
    <main className="flex h-screen w-screen">
      <section className="w-3/4 flex flex-col">
        <div className="flex grow gap-8">
          <div className="flex w-1/2 items-center justify-center">
            <CardsList title="Color Stack" owner={Owner.Game} cards={colorCards} interactive={false} gamePhase={gamePhase}></CardsList>
          </div>
          <div className="flex w-1/2 items-center justify-center">
            <CardsList title="Action Stack" owner={Owner.Game} cards={actionCards} interactive={false} gamePhase={gamePhase}></CardsList>
          </div>
        </div>
        <div className="border-t border-gray-500 bg-gray-50">
          <div className="flex flex-col gap-8 p-4">
            <GameControls gamePhase={gamePhase} onPlanning={() => planningCards(playerCards.filter(card => card.selected))} onPicking={pickCards} onResetRound={resetRound} />
          </div>

          <div className="p-4">
            <CardsList title="Player Cards" owner={Owner.Player} cards={playerCards} interactive={gamePhase === GamePhase.Planning} gamePhase={gamePhase} onClick={(card) => selectCard(card)}></CardsList>
          </div>
        </div>
      </section>
      <aside className="w-1/4 flex flex-col border-l border-gray-500">
        <div>
          <h2 className="p-4">Players</h2>
          {players.map((player) => (
            <Player key={player.id} player={player} />
          ))}
        </div>

        <LogList items={logItems}></LogList>
      </aside>
    </main>
  );
}

export default App;
