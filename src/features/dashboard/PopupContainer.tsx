import { usePopups } from "../../store/usePopups";
import {
  Editor,
  Button,
  Container,
  Text,
  Wysiwyg,
  ButtonContainer,
  Frame,
} from "@appquality/craft-blocks";
import { Modal, ModalBody, Title } from "@appquality/appquality-design-system";
import { useState } from "react";

export default () => {
  const [isOpen, setIsOpen] = useState(true);
  const { popups } = usePopups();

  if (!popups.length) return null;

  let i = 1;
  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      {popups.map((p) => {
        return (
          <ModalBody>
            <Title size="s">
              {i++}/{popups.length}
            </Title>
            <Editor
              enabled={false}
              resolver={{
                Button,
                Container,
                Text,
                Wysiwyg,
                ButtonContainer,
              }}
            >
              <Frame json={p.content}></Frame>
            </Editor>
          </ModalBody>
        );
      })}
    </Modal>
  );
};
