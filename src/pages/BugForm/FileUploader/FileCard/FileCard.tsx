import { ReactComponent as UploadFile } from "src/pages/BugForm/FileUploader/FileCard/assets/uploadFile.svg";
import { ReactComponent as UploadAudio } from "src/pages/BugForm/FileUploader/FileCard/assets/uploadAudio.svg";
import { ReactComponent as UploadVideo } from "src/pages/BugForm/FileUploader/FileCard/assets/uploadVideo.svg";
import { ReactComponent as UploadSuccess } from "src/pages/BugForm/FileUploader/FileCard/assets/uploadSuccess.svg";
import { ReactComponent as UploadFailed } from "src/pages/BugForm/FileUploader/FileCard/assets/uploadFailed.svg";
import { ReactComponent as UploadTrash } from "src/pages/BugForm/FileUploader/FileCard/assets/uploadTrash.svg";
import { Card, Text } from "@appquality/appquality-design-system";
import {
  StyledFileCard,
  StyledUploading,
} from "src/pages/BugForm/FileUploader/FileCard/style";
import { useTranslation } from "react-i18next";

interface FileCardProps {
  fileElement: FileElement;
  className?: string;
  onDelete?: () => void;
}

export const FileCard = ({
  fileElement,
  className,
  onDelete,
}: FileCardProps) => {
  const { fileName, status, fileType, mimeType, previewUrl, errorCode } =
    fileElement;
  const { t } = useTranslation();

  const getPreview = () => {
    switch (fileType) {
      case "audio":
        return <UploadAudio />;
      case "video":
        return mimeType === "video/mp4" ||
          mimeType === "video/ogg" ||
          mimeType === "video/webm" ? (
          <video>
            <source src={previewUrl} type={mimeType} />
          </video>
        ) : (
          <UploadVideo />
        );
      case "image":
        return <img src={previewUrl} alt={fileName} />;
      default:
        return <UploadFile />;
    }
  };

  const getError = () => {
    switch (errorCode) {
      case "FILE_TOO_BIG":
        return t("BUGFORM_UPLOAD_ERROR_FILETOOBIG", {
          defaultValue: "Maximum file size exceeded",
        });
      case "INVALID_FILE_EXTENSION":
        return t("BUGFORM_UPLOAD_ERROR_FILENOTSUPPORTED", {
          defaultValue: "File not supported",
        });
      case "GENERIC_ERROR":
        return t("BUGFORM_UPLOAD_ERROR_GENERALERROR", {
          defaultValue: "Generic error",
        });
      default:
        return "";
    }
  };

  return (
    <StyledFileCard className={className}>
      <Card className={`file-card ${status}`} bodyClass="file-card-body">
        <div className="file-card-left">
          {getPreview()}
          <Text title={fileName} className="file-card-text aq-ml-3" small>
            <div className="file-info">{fileName}</div>
            <div className="file-error">{getError()}</div>
          </Text>
        </div>
        <div className="file-card-right">
          {status === "success" ? (
            <UploadSuccess className="aq-mr-2" />
          ) : status === "failed" ? (
            <UploadFailed className="aq-mr-2" />
          ) : (
            <StyledUploading className="aq-mr-2" />
          )}
          {onDelete && (
            <UploadTrash className="file-delete" onClick={onDelete} />
          )}
        </div>
      </Card>
    </StyledFileCard>
  );
};
