import { mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import Component from "./Component";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    howToApply: {
      insertHowToApply: () => ReturnType;
    };
  }
}

export const HowToApply = Node.create({
  name: "how_to_apply",
  group: "block",
  atom: true, // behaves like a single unit
  selectable: true,

  parseHTML() {
    return [{ tag: "how_to_apply" }];
  },

  renderHTML({ HTMLAttributes }) {
    return ["how_to_apply", mergeAttributes(HTMLAttributes)];
  },

  addCommands() {
    return {
      insertHowToApply:
        () =>
        ({ chain }) =>
          chain().insertContent({ type: this.name }).run(),
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(Component);
  },
});
