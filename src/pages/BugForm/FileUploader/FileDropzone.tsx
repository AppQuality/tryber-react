import { Dropzone } from "@appquality/appquality-design-system";
import { useField } from "formik";
import { useEffect } from "react";
import { usePostUsersMeCampaignsByCampaignIdMediaMutation } from "src/services/tryberApi";
import { useAppDispatch, useAppSelector } from "src/store";
import {
  appendMediaList,
  updateMediaList,
} from "src/pages/BugForm/bugFormSlice";
import { createFilesElementList } from "src/pages/BugForm/createFilesElementList";
import useCampaignData from "src/pages/BugForm/useCampaignData";
import { useTranslation } from "react-i18next";

export const FileDropzone = () => {
  const { t } = useTranslation();
  const [createMedia, createMediaResults] =
    usePostUsersMeCampaignsByCampaignIdMediaMutation();
  const campaign = useCampaignData();
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
    if (!campaign.data) return;
    const data = createMedia({
      campaignId: campaign.data.id.toString(),
      // @ts-ignore
      body: formData,
    });
    dispatch(
      appendMediaList(
        createFilesElementList(files, "uploading", data.requestId)
      )
    );
  };

  return (
    <Dropzone
      description={t("BUGFORM_UPLOAD_DRAGDROP_TXT", {
        defaultValue: "Click here to upload your files or drag and drop!",
      })}
      accept={campaign.data?.validFileExtensions}
      disabled={false}
      onAccepted={(acceptedFiles) => uploadMedia(acceptedFiles)}
      onRejected={(fileRejections) => {
        const newFileList: File[] = [];
        fileRejections.forEach((f) => newFileList.push(f.file));
        const elements = createFilesElementList(newFileList, "failed");
        dispatch(appendMediaList(elements));
      }}
      danger={isInvalid()}
    />
  );
};
