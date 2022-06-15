import { ReactComponent as UploadFile } from "./assets/uploadFile.svg";
import { ReactComponent as UploadAudio } from "./assets/uploadAudio.svg";
import { ReactComponent as UploadVideo } from "./assets/uploadVideo.svg";
import { ReactComponent as UploadSuccess } from "./assets/uploadSuccess.svg";
import { ReactComponent as UploadFailed } from "./assets/uploadFailed.svg";
import { ReactComponent as UploadTrash } from "./assets/uploadTrash.svg";
import { Card, Text } from "@appquality/appquality-design-system";
import { StyledFileCard, StyledUploading } from "./style";

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

  return (
    <StyledFileCard className={className}>
      <Card className={`file-card ${status}`} bodyClass="file-card-body">
        <div className="file-card-left">
          {getPreview()}
          <Text title={fileName} className="file-card-text aq-ml-3" small>
            <div className="file-info">{fileName}</div>
            <div className="file-error">
              {errorCode === 1 ? "File not supported" : ""}
            </div>
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
