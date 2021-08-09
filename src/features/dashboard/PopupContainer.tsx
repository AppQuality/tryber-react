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
import API from "../../utils/api";

export default ({
  open = true,
  showExpired = false,
  onClose,
}: {
  open?: boolean;
  showExpired?: boolean;
  onClose: () => void;
}) => {
  const { popups } = usePopups({ showExpired });
  if (!popups.length) return null;

  let i = 1;
  return (
    <Modal isOpen={open} onClose={onClose}>
      {popups.map((p) => {
        return (
          <ModalBody
            onShow={() => {
              if (p.id) {
                API.myPopupsById({ popupId: p.id }).catch((e) => {
                  if (e.statusCode !== 404) {
                    alert(e.message);
                  }
                });
              }
            }}
          >
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
              <Frame data={p.content}></Frame>
            </Editor>
          </ModalBody>
        );
      })}
    </Modal>
  );
};
