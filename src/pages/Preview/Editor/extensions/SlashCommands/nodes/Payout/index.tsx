import { mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import Component from "./Component";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    payout: {
      insertPayout: () => ReturnType;
    };
  }
}

export const Payout = Node.create({
  name: "payout",
  group: "block",
  atom: true, // behaves like a single unit
  selectable: true,

  parseHTML() {
    return [{ tag: "payout" }];
  },

  renderHTML({ HTMLAttributes }) {
    return ["payout", mergeAttributes(HTMLAttributes)];
  },

  addCommands() {
    return {
      insertPayout:
        () =>
        ({ chain }) =>
          chain().insertContent({ type: this.name }).run(),
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(Component);
  },
});
