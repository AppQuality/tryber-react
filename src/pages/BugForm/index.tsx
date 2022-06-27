import React from "react";
import { DatepickerGlobalStyle } from "@appquality/appquality-design-system";
import { PageTemplate } from "src/features/PageTemplate";
import { BugFormContainer } from "src/pages/BugForm/BugFormContainer";

export default function BugForm() {
  return (
    <PageTemplate title={"Bug form"} route={"bug-form"} shouldBeLoggedIn>
      <DatepickerGlobalStyle />
      <BugFormContainer />
    </PageTemplate>
  );
}
