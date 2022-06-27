import { Card, ErrorMessage, Text } from "@appquality/appquality-design-system";
import styled from "styled-components";
import { FileType } from "src/pages/BugForm/FileUploader/FileType/FileType";
import { FileDropzone } from "src/pages/BugForm/FileUploader/FileDropzone";
import { FileList } from "src/pages/BugForm/FileUploader/FileList";

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
      <FileDropzone />
      <FileList />
      <ErrorMessage name="media" />
    </Card>
  );
};
