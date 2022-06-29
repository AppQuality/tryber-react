import { Text } from "@appquality/appquality-design-system";
import styled from "styled-components";
import { ReactComponent as ImageIcon } from "src/pages/BugForm/FileUploader/FileType/assets/imageIcon.svg";
import { ReactComponent as DocumentIcon } from "src/pages/BugForm/FileUploader/FileType/assets/documentIcon.svg";
import { ReactComponent as VideoAudioIcon } from "src/pages/BugForm/FileUploader/FileType/assets/videoAudioIcon.svg";
import { useTranslation } from "react-i18next";

const StyledFileType = styled.div`
  .file-type {
    display: flex;
    align-items: center;
    min-width: max-content;
    &:not(last-child) {
      margin-right: 0.5em;
    }
  }

  @media (min-width: ${(p) => p.theme.grid.breakpoints.lg}) {
    .file-type {
      min-width: 10em;
      &:not(last-child) {
        margin-right: 0;
      }
    }
  }
`;

interface FileTypeProps {
  type: "image" | "document" | "audiovideo";
}

export const FileType = ({ type }: FileTypeProps) => {
  const { t } = useTranslation();

  const getType = () => {
    switch (type) {
      case "image":
        return (
          <>
            <ImageIcon
              title={t("BBUGFORM_UPLOAD_IMG_ICON", { defaultValue: "Image" })}
              className="aq-mr-2"
            />
            {t("BUGFORM_UPLOAD_IMG_TXT", { defaultValue: "Image" })}
          </>
        );
      case "audiovideo":
        return (
          <>
            <VideoAudioIcon
              title={t("BUGFORM_UPLOAD_VIDAUDIO_ICON", {
                defaultValue: "Video/Audio",
              })}
              className="aq-mr-2"
            />
            {t("BUGFORM_UPLOAD_VIDAUDIO_TXT", { defaultValue: "Video/Audio" })}
          </>
        );
      default:
        return (
          <>
            <DocumentIcon
              title={t("BUGFORM_UPLOAD_DOC_ICON", { defaultValue: "Document" })}
              className="aq-mr-2"
            />
            {t("BUGFORM_UPLOAD_DOC_TXT", { defaultValue: "Document" })}
          </>
        );
    }
  };

  return (
    <StyledFileType>
      <Text className="file-type aq-text-primary aq-mt-2" small>
        {getType()}
      </Text>
    </StyledFileType>
  );
};
