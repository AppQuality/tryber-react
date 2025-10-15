import { Text } from "@appquality/appquality-design-system";
import { NodeViewWrapper } from "@tiptap/react";
import { Node as PMNode } from "prosemirror-model";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useDescription } from "./useDescription";

export default function MyComponent({ node }: { node: PMNode }) {
  const { t } = useTranslation();

  const { id } = useParams<{ id: string }>();
  const description = useDescription(id!);

  return (
    <NodeViewWrapper className="bug-type-description-node">
      <Text>{description}</Text>
    </NodeViewWrapper>
  );
}
