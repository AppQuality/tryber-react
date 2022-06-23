import React from "react";
import { DatepickerGlobalStyle } from "@appquality/appquality-design-system";
import { PageTemplate } from "../../features/PageTemplate";
import { BugFormContainer } from "./BugFormContainer/BugFormContainer";
import { BugFormNoDevice } from "./BugFormNoDevice/BugFormNoDevice";

export default function BugForm() {
  return (
    <PageTemplate title={"Bug form"} route={"bug-form"} shouldBeLoggedIn>
      <DatepickerGlobalStyle />
      <BugFormNoDevice />
    </PageTemplate>
  );
}
