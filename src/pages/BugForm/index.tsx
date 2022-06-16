import React from "react";
import {
  BSCol,
  BSGrid,
  DatepickerGlobalStyle,
} from "@appquality/appquality-design-system";
import { PageTemplate } from "../../features/PageTemplate";
import { BugFormContainer } from "./BugFormContainer/BugFormContainer";

export default function BugForm() {
  return (
    <PageTemplate title={"Bug form"} route={"bug-form"} shouldBeLoggedIn>
      <DatepickerGlobalStyle />
      <BSGrid>
        <BSCol size="col-lg-9" className="aq-mb-3">
          <BugFormContainer />
        </BSCol>
        <BSCol size="col-lg-3"></BSCol>
      </BSGrid>
    </PageTemplate>
  );
}
