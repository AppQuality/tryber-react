import { Dropzone } from "@appquality/appquality-design-system";
import { useField } from "formik";
import { useEffect } from "react";
import { usePostUsersMeCampaignsByCampaignIdMediaMutation } from "src/services/tryberApi";
import { useAppDispatch, useAppSelector } from "src/store";
import { appendMediaList } from "src/pages/BugForm/bugFormSlice";
import { createFilesElementList } from "src/pages/BugForm/createFilesElementList";
import useCampaignData from "src/pages/BugForm/useCampaignData";

export const FileDropzone = () => {
  const [createMedia, createMediaResults] =
    usePostUsersMeCampaignsByCampaignIdMediaMutation();
  const campaign = useCampaignData();
  const [input, meta, helper] = useField("media");

  const { mediaList } = useAppSelector((state) => state.bugForm);
  const dispatch = useAppDispatch();

  useEffect(() => {
    helper.setValue(getUploadedUrl(getSuccessMedia(mediaList)), true);
  }, [mediaList]);

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
      description="Click here to upload your files or drag and drop!"
      accept={campaign.data?.validFileExtensions}
      disabled={false}
      maxFilesText="You have reached the maximum number of files you can upload"
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
