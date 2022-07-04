import styled from "styled-components";
import { Text } from "@appquality/appquality-design-system";
import { FileCard } from "src/pages/BugForm/FileUploader/FileCard/FileCard";
import { useField } from "formik";
import { useAppDispatch, useAppSelector } from "src/store";

import { useDeleteMediaMutation } from "src/services/tryberApi";
import { useEffect } from "react";
import { removeElementFromMedialist } from "src/pages/BugForm/bugFormSlice";
import { Trans, useTranslation } from "react-i18next";
import { addMessage } from "src/redux/siteWideMessages/actionCreators";

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
  const { t } = useTranslation();
  const [input, meta, helper] = useField("media");
  const isInvalid = () => {
    return typeof meta.error === "string" && meta.touched;
  };
  const [deleteMedia] = useDeleteMediaMutation();
  const onDelete = async (fileElement: FileElement) => {
    if (fileElement.status === "uploading") return;
    if (
      fileElement.status === "success" &&
      typeof fileElement.uploadedFileUrl === "string"
    ) {
      const data = deleteMedia({ body: { url: fileElement.uploadedFileUrl } });
      data.unwrap().catch((e) =>
        dispatch(
          addMessage(
            t("BUGFORM_UPLOAD_ERROR_GENERALERROR", {
              defaultValue: "Generic error",
            }),
            "danger"
          )
        )
      );
      return;
    }
    if (fileElement.status === "failed") {
      dispatch(removeElementFromMedialist({ id: fileElement.id }));
    }
  };
  useEffect(() => {
    helper.setValue(
      mediaList
        .filter((media) => media.uploadedFileUrl)
        .map((media) => media.uploadedFileUrl)
    );
  }, [mediaList]);

  if (mediaList.length <= 0) return null;
  return (
    <>
      <Text
        className={`${
          isInvalid() ? "aq-mt-2" : "aq-mt-3"
        } aq-mb-3 aq-text-primary`}
        small
      >
        <Trans
          i18nKey="{{num}} uploaded:::BUGFORM_UPLOAD_PROGRESS"
          values={{
            num: `${input.value.length}/${mediaList.length}`,
          }}
          defaults={"{{num}} uploaded"}
        />
      </Text>
      <StyledFileList>
        {mediaList.map((f) => (
          <FileCard
            key={f.id}
            className="file-list-card"
            fileElement={f}
            onDelete={f.status !== "uploading" ? () => onDelete(f) : undefined}
          />
        ))}
      </StyledFileList>
    </>
  );
};
