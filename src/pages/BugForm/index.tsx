import React from "react";
import { DatepickerGlobalStyle } from "@appquality/appquality-design-system";
import { PageTemplate } from "src/features/PageTemplate";
import { BugFormContainer } from "src/pages/BugForm/BugFormContainer";
import { BugFormUnauthorized } from "./BugFormErrorPages/BugFormUnauthorized";
import useCampaignData from "./useCampaignData";
import Loading from "src/features/Loading";

export default function BugForm() {
  const { data, isError, isFetching } = useCampaignData();

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
    <PageTemplate title={"Bug form"} route={"bug-form"} shouldBeLoggedIn>
      <DatepickerGlobalStyle />
      <BugFormContainer />
    </PageTemplate>
  );
}
