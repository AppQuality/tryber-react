import { Card, ErrorMessage, Text } from "@appquality/appquality-design-system";
import styled from "styled-components";
import { FileType } from "src/pages/BugForm/FileUploader/FileType/FileType";
import { FileDropzone } from "src/pages/BugForm/FileUploader/FileDropzone";
import { FileList } from "src/pages/BugForm/FileUploader/FileList";
import useCampaignData from "src/pages/BugForm/useCampaignData";
import { Trans, useTranslation } from "react-i18next";

const StyledFilesTypes = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  .file-type-margin {
    margin-right: 23.5px;
  }
  @media (min-width: ${(p) => p.theme.grid.breakpoints.lg}) {
    .file-type-margin {
      margin-right: 32px;
    }
  }
`;

export const FileUploader = () => {
  const { data } = useCampaignData();
  const { t } = useTranslation();

  return (
    <Card
      title={t("BUGFORM_UPLOAD_TITLE", { defaultValue: "Uploading media" })}
    >
      <Text className="aq-text-primaryVariant">
        <Trans
          i18nKey="Upload a minimum number of {{num}} files:::BUGFORM_UPLOAD_TXT"
          values={{
            num: data?.minimumMedia || 0,
          }}
          tOptions={{ count: data?.minimumMedia }}
          count={data?.minimumMedia}
          defaults={"Upload a minimum number of {{num}} files"}
        />
      </Text>
      <StyledFilesTypes className="aq-mb-3">
        <FileType className="file-type-margin" type="image" />
        <FileType className="file-type-margin" type="audiovideo" />
        <FileType type="document" />
      </StyledFilesTypes>
      <FileDropzone />
      <FileList />
      <ErrorMessage name="media" />
    </Card>
  );
};
