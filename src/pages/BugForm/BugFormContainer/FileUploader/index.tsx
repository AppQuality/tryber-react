import { Card, Dropzone, Text } from "@appquality/appquality-design-system";
import { shallowEqual, useSelector } from "react-redux";
import styled from "styled-components";
import {
  addedDiscardedMedia,
  deleteMedia,
  uploadMedia,
} from "../../../../redux/bugForm/actionCreator";
import { BUG_FORM_SUPPORTED_TYPES } from "../../../../redux/bugForm/utils";
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

// TODO Parametro da prendere dalle API ???
export const MIN_FILES_NUMBER = 2;

export const FileUploader = () => {
  const dispatch = useAppDispatch();
  const { mediaList, showError } = useSelector(
    (state: GeneralState) => state.bugForm,
    shallowEqual
  );

  const uploadedMedia = mediaList.filter((f) => f.status === "success").length;
  const showMinFilesError = uploadedMedia < MIN_FILES_NUMBER && showError;

  return (
    <Card title={"Uploading media"}>
      <Text className="aq-text-primaryVariant">
        {`Upload a minimum number of ${MIN_FILES_NUMBER} files`}
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
        onAccepted={(acceptedFiles) => dispatch(uploadMedia(acceptedFiles))}
        onRejected={(fileRejections) => {
          const newFileList: File[] = [];
          fileRejections.forEach((f) => newFileList.push(f.file));
          dispatch(addedDiscardedMedia(newFileList));
        }}
      />
      {showMinFilesError && (
        <Text className="aq-mt-4 aq-text-danger" small>
          {`You need to upload at least ${MIN_FILES_NUMBER} files`}
        </Text>
      )}
      {mediaList.length ? (
        <>
          <Text
            className={`${
              showMinFilesError ? "aq-mt-2" : "aq-mt-3"
            } aq-mb-3 aq-text-primary`}
            small
          >
            {`${uploadedMedia}/${mediaList.length} uploaded`}
          </Text>
          <StyledFileList>
            {mediaList.map((f) => (
              <FileCard
                key={f.id}
                className="file-list-card"
                fileElement={f}
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