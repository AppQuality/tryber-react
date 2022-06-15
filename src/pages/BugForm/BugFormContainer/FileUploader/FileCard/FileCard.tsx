import { ReactComponent as UploadFile } from "./assets/uploadFile.svg";
import { ReactComponent as UploadAudio } from "./assets/uploadAudio.svg";
import { ReactComponent as UploadVideo } from "./assets/uploadVideo.svg";
import { ReactComponent as UploadSuccess } from "./assets/uploadSuccess.svg";
import { ReactComponent as UploadFailed } from "./assets/uploadFailed.svg";
import { ReactComponent as UploadTrash } from "./assets/uploadTrash.svg";
import { Card, Text } from "@appquality/appquality-design-system";
import { StyledFileCard, StyledUploading } from "./style";

interface FileCardProps {
  filename: string;
  status: "success" | "failed" | "uploading";
  fileType?: string;
  mimeType?: string;
  url?: string;
  className?: string;
  onDelete?: () => void;
}

export const FileCard = ({
  filename,
  status,
  fileType,
  mimeType,
  url,
  className,
  onDelete,
}: FileCardProps) => {
  const getPreview = () => {
    switch (fileType) {
      case "audio":
        return <UploadAudio />;
      case "video":
        return mimeType === "video/mp4" ||
          mimeType === "video/ogg" ||
          mimeType === "video/webm" ? (
          <video>
            <source src={url} type={mimeType} />
          </video>
        ) : (
          <UploadVideo />
        );
      case "image":
        return <img src={url} alt={filename} />;
      default:
        return <UploadFile />;
    }
  };

  return (
    <StyledFileCard className={className}>
      <Card className={`file-card ${status}`} bodyClass="file-card-body">
        <div className="file-card-left">
          {getPreview()}
          <Text className="file-info aq-ml-4" small>
            {filename}
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
