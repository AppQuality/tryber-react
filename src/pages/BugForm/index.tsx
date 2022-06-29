import React from "react";
import { DatepickerGlobalStyle } from "@appquality/appquality-design-system";
import { OutsideContainer, PageTemplate } from "src/features/PageTemplate";
import { BugFormContainer } from "src/pages/BugForm/BugFormContainer";
import { BugDetailsModal } from "src/pages/BugForm/BugDetails/BugDetailsModal/BugDetailsModal";
import { BugFormUnauthorized } from "./BugFormErrorPages/BugFormUnauthorized";
import useCampaignData from "./useCampaignData";
import Loading from "src/features/Loading";
import { useTranslation } from "react-i18next";

export default function BugForm() {
  const { data, isError, isFetching } = useCampaignData();
  const { t } = useTranslation();

  if (isFetching) {
    return (
      <PageTemplate route={"bug-form"} shouldBeLoggedIn>
        <Loading />
      </PageTemplate>
    );
  }
  if (isError || !data?.hasBugForm) {
    return (
      <PageTemplate route={"bug-form"} shouldBeLoggedIn>
        <BugFormUnauthorized />
      </PageTemplate>
    );
  }
  return (
    <PageTemplate
      title={t("BUGFORM_MAINTITLE", { defaultValue: "Bug form" })}
      route={"bug-form"}
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
