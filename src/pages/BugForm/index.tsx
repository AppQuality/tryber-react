import React from "react";
import { DatepickerGlobalStyle } from "@appquality/appquality-design-system";
import { OutsideContainer, PageTemplate } from "../../features/PageTemplate";
import { BugFormContainer } from "./BugFormContainer/BugFormContainer";
import { BugDetailsModal } from "./BugFormContainer/BugDetails/BugDetailsModal/BugDetailsModal";

export default function BugForm() {
  return (
    <PageTemplate title={"Bug form"} route={"bug-form"} shouldBeLoggedIn>
      <DatepickerGlobalStyle />
      <BugFormContainer />
      <OutsideContainer>
        <BugDetailsModal />
      </OutsideContainer>
    </PageTemplate>
  );
}
