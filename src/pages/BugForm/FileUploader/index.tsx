import { Card, Dropzone } from "@appquality/appquality-design-system";
import { shallowEqual, useSelector } from "react-redux";
import styled from "styled-components";
import { uploadMedia } from "../../../redux/bugForm/actionCreator";
import { useAppDispatch } from "../../../redux/provider";
import { FileCard } from "./FileCard/FileCard";

const StyledFileList = styled.div`
  height: 11.5em;
  overflow: auto;
  margin-top: 1em;
  padding: 1em 0;

  .file-list-card {
    &:not(:last-child) {
      margin-bottom: 1em;
    }
    .file-card {
      box-shadow: 0px 4px 6px -2px rgb(0 0 0 / 25%);
    }
  }

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: ${(p) => p.theme.grid.breakpoints.lg}) {
    height: 8.5em;
  }
`;

const MAX_FILES = 5;

export const FileUploader = () => {
  const dispatch = useAppDispatch();
  const { mediaList } = useSelector(
    (state: GeneralState) => state.bugForm,
    shallowEqual
  );

  const validMedia = mediaList.filter(
    (f) => f.status === "success" || f.status === "uploading"
  ).length;

  return (
    <Card title={"Uploading media"}>
      <Dropzone
        description="Click here to upload your files or drag and drop!"
        accept={{ "image/*": [], "audio/*": [], "video/*": [] }}
        disabled={false}
        maxFiles={MAX_FILES - validMedia}
        maxFilesText="You have reached the maximum number of files you can upload"
        onAccepted={(acceptedFiles) => dispatch(uploadMedia(acceptedFiles))}
        onRejected={(fileRejections) =>
          console.error("fileRejections", fileRejections)
        }
      />
      {mediaList.length ? (
        <StyledFileList>
          {mediaList.map((f) => (
            <FileCard
              key={f.fileName}
              className="file-list-card"
              filename={f.fileName}
              fileType={f.fileType}
              status={f.status}
              url={f.previewUrl}
              onDelete={f.status !== "uploading" ? () => null : undefined}
            />
          ))}
        </StyledFileList>
      ) : (
        <></>
      )}
    </Card>
  );
};
