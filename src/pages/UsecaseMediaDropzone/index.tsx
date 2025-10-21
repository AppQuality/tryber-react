import { Card, Text } from "@appquality/appquality-design-system";
import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";

import { MediaDropzone as UsecaseMediaDropzone } from "src/pages/Manual/UseCases/MediaDropzone";
import { setMediaList } from "src/pages/Manual/UseCases/mediaSlice";
import { useAppDispatch } from "src/store";

/*
/campaign/<campaignId>/file-dropzone?taskId=<taskId> 
*/

const Wrapper = styled.main`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${(p) => p.theme.grid.gutter};
  background: ${(p) => p.theme.colors.white};
`;

const InnerCard = styled(Card)`
  width: 100%;
  max-width: 680px;
`;

const FileDropzonePage = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { id: campaignIdParam } = useParams<{ id?: string }>();
  const location = useLocation();

  const searchParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );
  const taskId = searchParams.get("taskId") ?? "";
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
