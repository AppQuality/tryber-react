import { Text } from "@appquality/appquality-design-system";
import styled from "styled-components";
import { ReactComponent as ImageIcon } from "src/pages/BugForm/FileUploader/FileType/assets/imageIcon.svg";
import { ReactComponent as DocumentIcon } from "src/pages/BugForm/FileUploader/FileType/assets/documentIcon.svg";
import { ReactComponent as VideoAudioIcon } from "src/pages/BugForm/FileUploader/FileType/assets/videoAudioIcon.svg";

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
  const getType = () => {
    switch (type) {
      case "image":
        return (
          <>
            <ImageIcon className="aq-mr-2" />
            Image
          </>
        );
      case "audiovideo":
        return (
          <>
            <VideoAudioIcon className="aq-mr-2" />
            Video/Audio
          </>
        );
      default:
        return (
          <>
            <DocumentIcon className="aq-mr-2" />
            Document
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
