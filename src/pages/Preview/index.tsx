import { BSCol, BSGrid } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { PageTemplate } from "src/features/PageTemplate";
import { useGetUsersMeCampaignsByCampaignIdPreviewQuery } from "src/services/tryberApi";
import SelectBox from "./SelectionBox";

const Preview = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const { data } = useGetUsersMeCampaignsByCampaignIdPreviewQuery(
    { campaignId: id },
    { skip: !id }
  );

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <PageTemplate
      title={`CP${id} - Preview`}
      heading={t("Page Preview")}
      route={`campaigns/${id}/preview`}
      shouldBeLoggedIn
    >
      <BSGrid>
        <BSCol size="col-lg-9 aq-order-1 aq-order-0-lg ">
          <div>{data.content}</div>
          <SelectBox />
        </BSCol>
        <BSCol size="col-lg-3"> </BSCol>
      </BSGrid>
    </PageTemplate>
  );
};

export default Preview;
