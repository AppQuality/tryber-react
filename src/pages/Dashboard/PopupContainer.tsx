import { Modal, ModalBody, Title } from "@appquality/appquality-design-system";
import { Editor, Frame } from "@appquality/craft-blocks";
import { useTranslation } from "react-i18next";
import API from "src/utils/api";
import { usePopups } from "./effects/usePopups";
import SetPopupAsSeenButton from "./SetPopupAsSeenButton";

const PopupContainer = ({
  open = true,
  showExpired = false,
  onClose,
}: {
  open?: boolean;
  showExpired?: boolean;
  onClose: () => void;
}) => {
  const { popups } = usePopups({ showExpired });
  const popupResolver = async () => {
    try {
      const data = await API.me();
      return {
        Profile: {
          name: data.name || "",
          surname: data.surname || "",
          id: data.id || "",
        },
      };
    } catch (e) {
      return {
        Profile: {
          name: "",
          surname: "",
          id: "",
        },
      };
    }
  };
  const { t } = useTranslation();
  if (!popups.length) return null;

  const expirePopup = (id: number) => {
    API.myPopupsById({ popupId: id }).catch((e) => {
      if (e.statusCode !== 404) {
        alert(e.message);
      }
    });
  };
  let i = 1;

  return (
    <Modal isOpen={open} onClose={onClose} title={t("Messages for you")}>
      {popups.map((p) => {
        return (
          <ModalBody
            prevText={t("Previous")}
            nextText={i === popups.length ? t("Close") : t("Next")}
            onShow={() => p.id && p.once && expirePopup(p.id)}
          >
            <Title size="s">
              {i++}/{popups.length} {p.title}
            </Title>
            <Editor
              enabled={false}
              context={{
                resolveDynamicContent: true,
                resolver: popupResolver,
              }}
            >
              <Frame data={p.content} />
            </Editor>
            {!showExpired && !p.once && p.id && (
              <SetPopupAsSeenButton id={p.id} />
            )}
          </ModalBody>
        );
      })}
    </Modal>
  );
};

export default PopupContainer;
