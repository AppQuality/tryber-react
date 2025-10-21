import { Text } from "@appquality/appquality-design-system";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { MediaDropzone as UsecaseMediaDropzone } from "src/pages/Manual/UseCases/MediaDropzone";
import { setMediaList } from "src/pages/Manual/UseCases/mediaSlice";
import { useAppDispatch } from "src/store";

/*
/campaign/<campaignId>/file-dropzone/<taskId> 
*/

const FileDropzonePage = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { id: campaignIdParam, taskId: taskIdParam } = useParams<{
    id?: string;
    taskId?: string;
  }>();

  const taskId = taskIdParam ?? "";
  const campaignId = campaignIdParam ?? "";

  useEffect(() => {
    dispatch(setMediaList([]));
    return () => {
      dispatch(setMediaList([]));
    };
  }, [dispatch, campaignId, taskId]);

  if (!campaignId || !taskId) {
    return (
      <Text className="aq-text-danger" as="p">
        {t("USECASE_MEDIA_DROPZONE_MISSING_PARAMS", {
          defaultValue: "Missing campaign or task information.",
        })}
      </Text>
    );
  }

  return <UsecaseMediaDropzone taskId={taskId} campaignId={campaignId} />;
};

export default FileDropzonePage;
