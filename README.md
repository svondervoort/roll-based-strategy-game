# Card Based Strategy Game

## Concept
Every player can add a select set of cards to the stacks.
There are 3 stacks: **Player**, **Movement** and **Action**.
After all players ended their card-adding turn a random card gets picked from each stack.
This create a game of random change which players can influence by adding specific cards to the stack to increase changes.

## Roadmap

### V1
- ~~Card stack logic~~
- ~~Logging of round~~
- ~~Player card stack~~
- ~~Card shuffle per player~~
- ~~Card stack per player~~
- ~~Card shuffle per player~~
- ~~Player stats~~
- ~~Enemy stats~~
- ~~Game mechanic~~
- ~~Add loss state~~
- Add win state
- Update log to include actions
- Enemy card logic
- Prevent dead enemies from taking actions
- Add health action(s)
- Add game start screen
- Add option to remove/add enemy players

### V2
- Add strategy logic/game board
- Add movement card stack

### V3
- Add multiplayer logic

## Tech Stack
React 19 + TypeScript + Tailwind CSS v4, built with Vite.

## Installation and running
``` bash
npm install
npm run dev
```

## Helpful resources
- [Kirupa - Auto-navigating our Grid using Breadth-First Search (BFS)](https://www.kirupa.com/data_structures_algorithms/auto_navigating_grid_using_bfs.htm)