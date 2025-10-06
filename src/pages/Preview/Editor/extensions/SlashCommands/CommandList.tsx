import { Pill } from "@appquality/appquality-design-system";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";

export type Item = { title: string; onSelect: () => void };

type Props = {
  items: Item[];
  command: (item: Item) => void;
};

const CommandsList = forwardRef<any, Props>(({ items, command }, ref) => {
  const [index, setIndex] = useState(0);

  useEffect(() => setIndex(0), [items]);

  const select = (i: number) => {
    const item = items[i];
    if (item) command(item);
  };

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }: { event: KeyboardEvent }) => {
      if (event.key === "ArrowUp") {
        setIndex((i) => (i + items.length - 1) % items.length);
        return true;
      }
      if (event.key === "ArrowDown") {
        setIndex((i) => (i + 1) % items.length);
        return true;
      }
      if (event.key === "Enter") {
        select(index);
        return true;
      }
      return false;
    },
  }));

  return (
    <div>
      {items.map((item, i) => (
        <div
          key={item.title}
          style={{
            cursor: "pointer",
            marginBottom: 4,
          }}
          onMouseEnter={() => setIndex(i)}
          onMouseDown={(e) => {
            e.preventDefault();
            select(i);
          }}
        >
          <Pill type={i === index ? "primary" : "secondary"}>{item.title}</Pill>
        </div>
      ))}
    </div>
  );
});

export default CommandsList;
