import { Dropzone } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import { FileCard } from "src/pages/BugForm/FileUploader/FileCard/FileCard";
import { addMessage } from "src/redux/siteWideMessages/actionCreators";
import {
  useDeleteUsersMeCampaignsByCampaignIdTasksAndTaskIdMediaMediaIdMutation,
  useGetUsersMeCampaignsByCampaignIdQuery,
  useGetUsersMeCampaignsByCampaignIdTasksAndTaskIdMediaQuery,
  usePostUsersMeCampaignsByCampaignIdTasksAndTaskIdMediaMutation,
} from "src/services/tryberApi";
import { useAppDispatch, useAppSelector } from "src/store";
import styled from "styled-components";
import { createFilesElementList } from "./createFilesElementList";
import { appendMediaList, removeElementFromMedialist } from "./mediaSlice";
import { normalizeFileName } from "./normalizeFileName";

const StyledFileGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 32%);
  gap: 10px;
  margin-bottom: 10px;

  @media (max-width: ${(p) => p.theme.grid.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

export const MediaDropzone = ({
  taskId,
  campaignId,
}: {
  taskId: string;
  campaignId: string;
}) => {
  const { t } = useTranslation();
  const [createMedia] =
    usePostUsersMeCampaignsByCampaignIdTasksAndTaskIdMediaMutation();
  const { data: media } =
    useGetUsersMeCampaignsByCampaignIdTasksAndTaskIdMediaQuery({
      campaignId: campaignId,
      taskId: taskId,
    });
  const { data: campaign } = useGetUsersMeCampaignsByCampaignIdQuery({
    campaignId: campaignId,
  });
  const { mediaList } = useAppSelector((state) => state.mediaList);
  const [deleteMedia] =
    useDeleteUsersMeCampaignsByCampaignIdTasksAndTaskIdMediaMediaIdMutation();

  const onDelete = async (fileElement: {
    id: string;
    status: "success" | "failed";
  }) => {
    if (fileElement.status === "success") {
      try {
        await deleteMedia({
          campaignId,
          taskId,
          mediaId: fileElement.id,
        }).unwrap();
      } catch (e) {
        dispatch(
          addMessage(
            t("BUGFORM_UPLOAD_ERROR_GENERALERROR", {
              defaultValue: "Generic error",
            }),
            "danger"
          )
        );
      }
    } else {
      dispatch(removeElementFromMedialist({ id: fileElement.id }));
    }
  };
  const dispatch = useAppDispatch();

  const uploadMedia = async (files: File[]) => {
    files.forEach((f) => {
      const formData = new FormData();
      formData.append("media", f, normalizeFileName(f.name));
      if (!campaign) return;
      const data = createMedia({
        campaignId: campaign.id.toString(),
        taskId: taskId,
        // @ts-ignore
        body: formData,
      });
      dispatch(
        appendMediaList(
          createFilesElementList({
            files: [f],
            status: "uploading",
            taskId,
            uploadId: data.requestId,
          })
        )
      );
    });
  };

  return (
    <>
      <StyledFileGrid>
        {media?.items.map((m) => (
          <FileCard
            key={m.id}
            className="file-list-card"
            fileElement={{
              id: m.id.toString(),
              fileName: m.name,
              fileType: "",
              mimeType: "",
              status: "success",
            }}
            onDelete={() =>
              onDelete({
                id: m.id.toString(),
                status: "success",
              })
            }
          />
        ))}
        {mediaList
          .filter((m) => m.status !== "success")
          .map((m) => (
            <FileCard
              key={m.id}
              className="file-list-card"
              fileElement={{
                id: m.id.toString(),
                fileName: m.fileName,
                fileType: "",
                mimeType: "",
                status: m.status,
              }}
              onDelete={() =>
                m.status !== "uploading"
                  ? onDelete({
                      id: m.id,
                      status: m.status,
                    })
                  : undefined
              }
            />
          ))}
      </StyledFileGrid>
      <Dropzone
        description={t("BUGFORM_UPLOAD_DRAGDROP_TXT", {
          defaultValue: "Click here to upload your files or drag and drop!",
        })}
        accept={campaign?.validFileExtensions}
        disabled={false}
        onAccepted={(acceptedFiles) => uploadMedia(acceptedFiles)}
        onRejected={(fileRejections) => {
          const newFileList: File[] = [];
          fileRejections.forEach((f) => newFileList.push(f.file));
          const elements = createFilesElementList({
            files: newFileList,
            status: "failed",
            taskId,
          });
          dispatch(appendMediaList(elements));
        }}
        danger={false}
      />
    </>
  );
};
