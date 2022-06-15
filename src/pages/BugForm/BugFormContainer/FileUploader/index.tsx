import { Card, Dropzone, Text } from "@appquality/appquality-design-system";
import { shallowEqual, useSelector } from "react-redux";
import styled from "styled-components";
import {
  addedDiscardedMedia,
  deleteMedia,
  uploadMedia,
} from "../../../../redux/bugForm/actionCreator";
import {
  BUG_FORM_SUPPORTED_TYPES,
  checkFileName,
} from "../../../../redux/bugForm/utils";
import { useAppDispatch } from "../../../../redux/provider";
import { FileCard } from "./FileCard/FileCard";
import { FileType } from "./FileType/FileType";

const StyledFileList = styled.div`
  min-height: 6.5em;
  overflow: auto;
  margin: 1em 0;

  .file-list-card {
    &:not(:last-child) {
      margin-bottom: 1em;
    }
  }

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: ${(p) => p.theme.grid.breakpoints.lg}) {
    min-height: 4.3em;
  }
`;

const StyledFilesTypes = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;

  @media (min-width: ${(p) => p.theme.grid.breakpoints.lg}) {
    justify-content: flex-start;
  }
`;

export const FileUploader = () => {
  const dispatch = useAppDispatch();
  const { mediaList } = useSelector(
    (state: GeneralState) => state.bugForm,
    shallowEqual
  );

  const uploadedMedia = mediaList.filter((f) => f.status === "success").length;

  return (
    <Card title={"Uploading media"}>
      <Text className="aq-text-primaryVariant">
        {"Load at least two media:"}
      </Text>
      <StyledFilesTypes className="aq-mb-3">
        <FileType type="image" />
        <FileType type="document" />
        <FileType type="audiovideo" />
      </StyledFilesTypes>
      <Dropzone
        description="Click here to upload your files or drag and drop!"
        accept={BUG_FORM_SUPPORTED_TYPES}
        disabled={false}
        maxFilesText="You have reached the maximum number of files you can upload"
        onAccepted={(acceptedFiles) =>
          dispatch(uploadMedia(checkFileName(mediaList, acceptedFiles)))
        }
        onRejected={(fileRejections) => {
          const newFileList: File[] = [];
          fileRejections.forEach((f) => newFileList.push(f.file));
          dispatch(addedDiscardedMedia(checkFileName(mediaList, newFileList)));
        }}
      />
      {mediaList.length ? (
        <>
          <Text className="aq-mt-3 aq-text-primary" small>
            {`${uploadedMedia}/${mediaList.length} uploaded`}
          </Text>
          <StyledFileList>
            {mediaList.map((f) => (
              <FileCard
                key={f.fileName}
                className="file-list-card"
                filename={f.fileName}
                fileType={f.fileType}
                mimeType={f.mimeType}
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
