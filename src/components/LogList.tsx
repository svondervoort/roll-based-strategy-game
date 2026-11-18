import type { LogType } from "../types/LogType";

import { timeFormatter } from "../helpers/Helpers";

export function LogList({ items }: { items: LogType[] }) {
  return (
    <div className="flex flex-col shrink min-h-0">
      <h2 className="p-4 mb-0 shrink-0">Log</h2>
      <ul className="flex flex-col gap-1 overflow-x-hidden overflow-y-auto min-h-0">
        {items.map((item, index) => (
          <li
            key={index}
            className="flex flex-col px-4 py-1"
            data-time={timeFormatter.format(item.timestamp)}
          >
            <div
              className="flex gap-4 items-center rounded-lg overflow-hidden bg-white border"
              style={{ borderColor: item.attacker.color }}
            >
              <div
                className="h-8 w-10 flex items-center justify-center shrink-0 pe-1"
                style={{
                  backgroundColor: item.attacker.color,
                  clipPath:
                    "polygon(0 0, 32px 0, 40px 16px, 32px 32px, 0 32px)",
                }}
              >
                {item.attacker.icon}
              </div>
              {/* <div className="grow-1 w-1/2">{ item.movementCard.icon} { item.movementCard.name }</div> */}
              <div className="grow-1 w-1/2 text-center">
                {item.actionCard.icon}{" "}
                <span className="text-xs">{item.actionCard.name}</span>
              </div>
              <div
                className="h-8 w-10 flex items-center justify-center shrink-0 ps-1"
                style={{
                  backgroundColor: item.target.color,
                  clipPath: "polygon(0 0, 40px 0, 40px 32px, 0 32px, 8px 16px)",
                }}
              >
                {item.target.icon}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
