import React from "react";
import { DatepickerGlobalStyle } from "@appquality/appquality-design-system";
import { OutsideContainer, PageTemplate } from "src/features/PageTemplate";
import { BugFormContainer } from "src/pages/BugForm/BugFormContainer";
import { BugDetailsModal } from "src/pages/BugForm/BugDetails/BugDetailsModal/BugDetailsModal";
import { BugFormUnauthorized } from "./BugFormErrorPages/BugFormUnauthorized";
import { BugFormNoDevice } from "./BugFormErrorPages/BugFormNoDevice";
import useCampaignData from "./useCampaignData";
import Loading from "src/features/Loading";
import { useTranslation } from "react-i18next";

export default function BugForm() {
  const { data, isError, noDevice, isFetching, campaignId } = useCampaignData();
  const { t } = useTranslation();
  const route = `campaign/${campaignId}/bugform`;

  if (isFetching) {
    return (
      <PageTemplate route={route} shouldBeLoggedIn>
        <Loading />
      </PageTemplate>
    );
  }
  if (isError || !data?.hasBugForm) {
    return (
      <PageTemplate route={route} shouldBeLoggedIn>
        <BugFormUnauthorized />
      </PageTemplate>
    );
  }

  if (noDevice) {
    return (
      <PageTemplate route={route} shouldBeLoggedIn>
        <BugFormNoDevice />
      </PageTemplate>
    );
  }
  return (
    <PageTemplate
      title={t("BUGFORM_MAINTITLE", { defaultValue: "Bug form" })}
      heading={data?.title}
      route={route}
      shouldBeLoggedIn
    >
      <DatepickerGlobalStyle />
      <BugFormContainer />
      <OutsideContainer>
        <BugDetailsModal />
      </OutsideContainer>
    </PageTemplate>
  );
}
