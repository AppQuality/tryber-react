import styled from "styled-components";
import { Text } from "@appquality/appquality-design-system";
import { FileCard } from "src/pages/BugForm/FileUploader/FileCard/FileCard";
import { useField } from "formik";
import { useAppDispatch, useAppSelector } from "src/store";
import { deleteMedia } from "src/pages/BugForm/bugFormSlice";

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

export const FileList = () => {
  const { mediaList } = useAppSelector((state) => state.bugForm);
  const dispatch = useAppDispatch();
  const [input, meta] = useField("media");
  const isInvalid = () => {
    return typeof meta.error === "string" && meta.touched;
  };
  if (mediaList.length <= 0) return null;
  return (
    <>
      <Text
        className={`${
          isInvalid() ? "aq-mt-2" : "aq-mt-3"
        } aq-mb-3 aq-text-primary`}
        small
      >
        {`${input.value.length}/${mediaList.length} uploaded`}
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
  );
};
