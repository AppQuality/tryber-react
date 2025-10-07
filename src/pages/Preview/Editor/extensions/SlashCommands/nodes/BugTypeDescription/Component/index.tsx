import { Text } from "@appquality/appquality-design-system";
import { NodeViewWrapper } from "@tiptap/react";
import { Node as PMNode } from "prosemirror-model";
import { useParams } from "react-router-dom"; // Import useParams to get the campaign ID
import { useDescription } from "./useDescription";

export default function MyComponent({ node }: { node: PMNode }) {
  const { id } = useParams<{ id: string }>();

  const description = useDescription(id!);

  return (
    <NodeViewWrapper className="bug-type-description-node">
      <Text>{description}</Text>
    </NodeViewWrapper>
  );
}
