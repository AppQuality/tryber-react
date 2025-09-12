import { Extension } from "@tiptap/core";
import { ReactRenderer } from "@tiptap/react";
import Suggestion from "@tiptap/suggestion";
import tippy, { Instance as TippyInstance } from "tippy.js";
import "tippy.js/dist/tippy.css";
import CommandsList from "./CommandList";

type Item = { title: string; onSelect: () => void };

export const SlashCommands = Extension.create({
  name: "slashCommands",

  addOptions() {
    return {
      suggestion: {
        char: "/",
        startOfLine: true,
        allowSpaces: false,
        items: ({ query, editor }: any) => {
          const all: Item[] = [
            {
              title: "Payout",
              onSelect: () => editor.commands.insertPayout(),
            },
          ];
          return all.filter((i) =>
            i.title.toLowerCase().includes(query.toLowerCase())
          );
        },
        render: () => {
          let component: ReactRenderer | null = null;
          let popup: TippyInstance[] = [];

          return {
            onStart: (props: any) => {
              component = new ReactRenderer(CommandsList, {
                props,
                editor: props.editor,
              });
              popup = tippy("body", {
                getReferenceClientRect: props.clientRect as any,
                content: component.element,
                showOnCreate: true,
                interactive: true,
                trigger: "manual",
                placement: "bottom-start",
              });
            },
            onUpdate(props: any) {
              component?.updateProps(props);
              popup[0].setProps({
                getReferenceClientRect: props.clientRect as any,
              });
            },
            onKeyDown(props: any) {
              if (props.event.key === "Escape") {
                popup[0].hide();
                return true;
              }
              // @ts-ignore
              return component?.ref?.onKeyDown?.(props) ?? false;
            },
            onExit() {
              popup.forEach((p) => p.destroy());
              component?.destroy();
              component = null;
            },
          };
        },
        command: ({ editor, range, props }: any) => {
          editor.chain().focus().deleteRange(range).run();
          (props as Item).onSelect();
        },
      },
    };
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ];
  },
});
