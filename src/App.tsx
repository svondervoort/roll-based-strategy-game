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
  AiAction = "aiAction",
  PlayerAction = "playerAction",
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
  {icon: "👊", name: "Punch", hp: 5},
  {icon: "🔫", name: "Pistol", hp: 10},
  {icon: "🚀", name: "Rocket", hp: 20},
  {icon: "🌟", name: "Special", hp: 50}
];

const playerDefaults: Omit<PlayerType, "id"> = {
  icon: "🤖",
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
  hp: null,
};

const cardsMaxAmount = 6;

function App() {
  /********************************************************************************************************************************
   * 🗄️ Dynamic data and states
   *******************************************************************************************************************************/

  const initialColorCards = (players: PlayerType[]): CardType[] => players.map((player) =>
    createCard({ icon: player.icon, name: player.name, color: player.color, type: CardKind.Color, playerId: player.id }),
  );

  const initialMovementCards: CardType[] = movements.map((movement) =>
    createCard({ icon: movement.icon, name: movement.name, type: CardKind.Movement }),
  );

  const initialActionCards: CardType[] = actions.map((action) =>
    createCard({ icon: action.icon, name: action.name, type: CardKind.Action, hp: action.hp }),
  );

  const [gamePhase, setGamePhase] = useState<GamePhase>(GamePhase.Planning);
  const [players, setPlayers] = useState<PlayerType[]>(createPlayers());
  const [colorCards, setColorCards] = useState<CardType[]>(initialColorCards(players));
  const [movementCards, setMovementCards] = useState<CardType[]>(initialMovementCards);
  const [actionCards, setActionCards] = useState<CardType[]>(initialActionCards);
  const [playerCards, setPlayerCards] = useState<CardType[]>(() => generatePlayerCards());
  const [logItems, setLogItems] = useState<LogType[]>([]);

  const userPlayer = players.find((p) => p.kind === PlayerKind.User);

  /********************************************************************************************************************************
   * ▶️ Setup the Players (User and AI)
   *******************************************************************************************************************************/

  function createPlayers(): PlayerType[] {
    const players: PlayerType[] = [];

    players.push(createPlayer({ name: "You", icon: "🧑‍🦱", kind: PlayerKind.User, color: colors[0].color }))
    players.push(createPlayer({ name: "AI 1", color: colors[1].color }))
    players.push(createPlayer({ name: "AI 2", color: colors[2].color }))
    players.push(createPlayer({ name: "AI 3", color: colors[3].color }))

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
      cards.push(createCard({ icon: userPlayer?.icon, name: userPlayer?.name, color: userPlayer?.color, type: CardKind.Color, owner: Owner.Player, playerId: userPlayer?.id }))
    }
    // Fill remaining slots with Action Cards
    for (let i = 0; i < remainingCardsCount; i++) {
      // Select a random action from the possible actions
      const action = actions[randomInt(0, actions.length - 1)];
      cards.push(createCard({ icon: action.icon, name: action.name, type: CardKind.Action, owner: Owner.Player, hp: action.hp }))
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
    const pickedColorCard = colorCards[colorPick];
    setColorCards((prev) =>
      prev.map((card, i) => (
        { ...card, visible: true, selected: i === colorPick }
      )),
    );
    const pickedPlayer: PlayerType|undefined = players.find((p) => p.id === pickedColorCard.playerId);

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
    const pickedActionCard: CardType = actionCards[actionPick];

    // Update the log with the selected cards
    setLogItems((prev) => [{
      id: crypto.randomUUID(),
      timestamp: new Date(),
      playerCard: colorCards[colorPick],
      movementCard: movementCards[movementPick],
      actionCard: actionCards[actionPick]
    }, ...prev])

    /******************************************************************************************************************************
     * 🤖 AI Route - Attack lower HP first, else attack Player
     *****************************************************************************************************************************/
    if (pickedPlayer?.kind === PlayerKind.AI) {
      // Update gamePhase
      setGamePhase(GamePhase.AiAction);
      // Filter opponents
      const opponents = players.filter((p) => p.id !== pickedPlayer.id && p.hp > 0);
      // Check if there are opponents
      if (opponents.length === 0) return;
      // Find opponent with least health
      const target = opponents.reduce((lowest, p) => (p.hp < lowest.hp ? p : lowest));
      // Update players
      setPlayers((prev) =>
        prev.map((p) =>
          p.id === target.id ? { ...p, hp: Math.max(0, p.hp - (pickedActionCard.hp ?? 0)) } : p,
        ),
      );
      // Reset round after 5 seconds (for visual clarity that an AI has the action)
      setTimeout(() => (resetRound()), 1000);

    /******************************************************************************************************************************
     * 🧑‍🦱 Player Route - Let the player pick who to attack
     *****************************************************************************************************************************/
    } else if (pickedPlayer?.kind === PlayerKind.User) {
      // Update gamePhase
      setGamePhase(GamePhase.PlayerAction);
    }
  }

  /********************************************************************************************************************************
   * ▶️ Based on the color picked let the corresponding player do the action on another player
   *******************************************************************************************************************************/

  function doActionOnPlayer(player: PlayerType) {
    console.log('doActionOnPlayer', player);
    if (gamePhase !== GamePhase.PlayerAction) return;

    const pickedActionCard = actionCards.find((c) => c.selected);
    if (!pickedActionCard) return;

    setPlayers((prev) =>
      prev.map((p) =>
        p.id === player.id ? { ...p, hp: Math.max(0, p.hp - (pickedActionCard.hp ?? 0)) } : p,
      ),
    );

    // Reset to next round
    resetRound();
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
            <Player key={player.id} gamePhase={gamePhase} player={player} onClick={(player) => doActionOnPlayer(player)} />
          ))}
        </div>

        <LogList items={logItems}></LogList>
      </aside>

      { userPlayer && userPlayer.hp <= 0 ?
      <dialog className="flex items-center justify-center fixed inset-0 w-full h-full flex-col gap-4 bg-black/50 text-white">
          <span className="text-9xl">☠️</span>
          <strong className="text-2xl">You died</strong>
      </dialog>
      : '' }
    </main>
  );
}

export default App;
