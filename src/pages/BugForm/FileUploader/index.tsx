import { Card, Dropzone, Text } from "@appquality/appquality-design-system";
import { shallowEqual, useSelector } from "react-redux";
import styled from "styled-components";
import { deleteMedia, uploadMedia } from "../../../redux/bugForm/actionCreator";
import { useAppDispatch } from "../../../redux/provider";
import { FileCard } from "./FileCard/FileCard";

const StyledFileList = styled.div`
  min-height: 6.5em;
  max-height: 10.5em;
  overflow: auto;
  margin: 1em 0;

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
    min-height: 4.3em;
    max-height: 7.3em;
  }
`;

const MAX_FILES = 5;

export const FileUploader = () => {
  const dispatch = useAppDispatch();
  const { mediaList } = useSelector(
    (state: GeneralState) => state.bugForm,
    shallowEqual
  );

  const uploadedMedia = mediaList.filter((f) => f.status === "success").length;

  const onAccepted = (acceptedFiles: File[]) => {
    const newList = [...acceptedFiles];
    mediaList.forEach((media) => {
      newList.forEach((f, i) => {
        if (f.name === media.fileName) {
          const newfile = new File(
            [newList[i]],
            f.name.replace(/(\.[\w\d_-]+)$/i, "_copy$1"),
            { type: newList[i].type }
          );
          newList.splice(i, 1, newfile);
        }
      });
    });
    dispatch(uploadMedia(newList));
  };

  return (
    <Card title={"Uploading media"}>
      <Dropzone
        description="Click here to upload your files or drag and drop!"
        accept={{
          "image/*": [],
          "audio/*": [],
          "video/*": [],
          "application/pdf": [],
          "application/zip": [],
        }}
        disabled={false}
        maxFilesText="You have reached the maximum number of files you can upload"
        onAccepted={onAccepted}
        onRejected={(fileRejections) =>
          console.error("fileRejections", fileRejections)
        }
      />
      {mediaList.length ? (
        <>
          <Text className="aq-mt-4 aq-text-primary" small>
            {`${uploadedMedia}/${mediaList.length} uploaded`}
          </Text>
          <StyledFileList>
            {mediaList.map((f) => (
              <FileCard
                key={f.fileName}
                className="file-list-card"
                filename={f.fileName}
                fileType={f.fileType}
                status={f.status}
                url={f.previewUrl}
                onDelete={
                  f.status !== "uploading"
                    ? () => dispatch(deleteMedia(f))
                    : undefined
                }
              />
            ))}
          </StyledFileList>
        </>
      ) : (
        <></>
      )}
    </Card>
  );
};
