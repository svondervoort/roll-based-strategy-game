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
            className={`${index == 0 ? "" : "zoom-75"} flex flex-col items-start px-4 py-1`}
            data-time={timeFormatter.format(item.timestamp)}
          >
            <div className="flex rounded-lg overflow-hidden bg-white">
              <div
                className="h-9 border-y-2 border-s-2 flex shrink-0"
                style={{
                  borderColor: item.attacker.color,
                }}
              >
                <div
                  className="grow flex gap-1 items-center justify-center shrink-0 pe-4 ps-2"
                  style={{
                    backgroundColor: item.attacker.color,
                    clipPath:
                      "polygon(0 0, calc(100% - 8px) 0, 100% 50%, calc(100% - 8px) 100%, 0 100%)",
                  }}
                >
                  {item.attacker.icon}{" "}
                  <strong className="text-xs">{item.attacker.name}</strong>
                </div>
              </div>
              {/* <div className="grow-1 w-1/2">{ item.movementCard.icon} { item.movementCard.name }</div> */}
              <div
                className="h-9 flex gap-1 items-center w-1/2 justify-center border-y-2 px-2 grow"
                style={{ borderColor: item.attacker.color }}
              >
                {item.actionCard.icon}{" "}
                <span className="text-xs">{item.actionCard.name}</span>
              </div>
              <div
                className="h-9 flex shrink-0 border-y-2 border-e-2"
                style={{
                  borderColor: item.target.color,
                }}
              >
                <div
                  className="grow flex gap-1 items-center justify-center shrink-0 ps-4 pe-2"
                  style={{
                    backgroundColor: item.target.color,
                    clipPath:
                      "polygon(0 0, 100% 0, 100% 100%, 0 100%, 8px 50%)",
                  }}
                >
                  {item.target.icon}{" "}
                  <strong className="text-xs">{item.target.name}</strong>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
