import { Dropzone } from "@appquality/appquality-design-system";
import { addedDiscardedMedia } from "src/redux/bugForm/actionCreator";
import { BUG_FORM_SUPPORTED_TYPES } from "src/redux/bugForm/utils";
import { useField } from "formik";
import { useEffect } from "react";
import { usePostUsersMeCampaignsByCampaignIdMediaMutation } from "src/services/tryberApi";
import { useAppDispatch, useAppSelector } from "src/store";
import {
  appendMediaList,
  updateMediaList,
} from "src/pages/BugForm/bugFormSlice";
import { createFilesElementList } from "src/pages/BugForm/createFilesElementList";

export const FileDropzone = () => {
  const [createMedia, createMediaResults] =
    usePostUsersMeCampaignsByCampaignIdMediaMutation();
  const [input, meta, helper] = useField("media");

  const { mediaList } = useAppSelector((state) => state.bugForm);
  const dispatch = useAppDispatch();

  useEffect(() => {
    helper.setValue(getUploadedUrl(getSuccessMedia(mediaList)), true);
  }, [mediaList]);

  useEffect(() => {
    const { status, data, requestId } = createMediaResults;
    if (status === "fulfilled" && typeof data !== "undefined" && requestId) {
      dispatch(
        updateMediaList({
          data: data,
          requestId: requestId,
        })
      );
    }
  }, [createMediaResults]);

  const getSuccessMedia = (aMediaList: FileElement[]) => {
    return aMediaList.filter((f) => f.status === "success");
  };

  const getUploadedUrl = (aMediaList: FileElement[]) => {
    return aMediaList.map((f) => f.uploadedFileUrl);
  };

  const isInvalid = () => {
    return typeof meta.error === "string" && meta.touched;
  };

  const uploadMedia = async (files: File[]) => {
    const formData = new FormData();
    files.forEach((f) => formData.append("media", f));
    // @ts-ignore
    const data = createMedia({ campaignId: "3238", body: formData });
    dispatch(
      appendMediaList(
        createFilesElementList(files, "uploading", data.requestId)
      )
    );
  };

  return (
    <Dropzone
      description="Click here to upload your files or drag and drop!"
      accept={BUG_FORM_SUPPORTED_TYPES}
      disabled={false}
      maxFilesText="You have reached the maximum number of files you can upload"
      onAccepted={(acceptedFiles) => uploadMedia(acceptedFiles)}
      onRejected={(fileRejections) => {
        const newFileList: File[] = [];
        fileRejections.forEach((f) => newFileList.push(f.file));
        dispatch(addedDiscardedMedia(newFileList));
      }}
      danger={isInvalid()}
    />
  );
};
