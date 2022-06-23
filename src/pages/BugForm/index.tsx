import React from "react";
import { DatepickerGlobalStyle } from "@appquality/appquality-design-system";
import { PageTemplate } from "../../features/PageTemplate";
import { BugFormContainer } from "./BugFormContainer/BugFormContainer";

export default function BugForm() {
  return (
    <PageTemplate title={"Bug form"} route={"bug-form"} shouldBeLoggedIn>
      <DatepickerGlobalStyle />
      <BugFormContainer />
    </PageTemplate>
  );
}
