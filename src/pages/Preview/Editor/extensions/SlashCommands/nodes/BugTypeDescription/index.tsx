import { mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import Component from "./Component";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    bugTypeDescription: {
      insertBugTypeDescription: () => ReturnType;
    };
  }
}

export const BugTypeDescription = Node.create({
  name: "bug_type_description",
  group: "block",
  atom: true, // behaves like a single unit
  selectable: true,

  parseHTML() {
    return [{ tag: "bug_type_description" }];
  },

  renderHTML({ HTMLAttributes }) {
    return ["bug_type_description", mergeAttributes(HTMLAttributes)];
  },

  addCommands() {
    return {
      insertBugTypeDescription:
        () =>
        ({ chain }) =>
          chain().insertContent({ type: this.name }).run(),
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(Component);
  },
});
