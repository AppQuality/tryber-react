import React from "react";
import { BSCol, BSGrid } from "@appquality/appquality-design-system";
import { PageTemplate } from "../../features/PageTemplate";
import { FileUploader } from "./FileUploader";

export default function BugForm() {
  return (
    <PageTemplate title={"Bug form"} route={"bug-form"} shouldBeLoggedIn>
      <BSGrid>
        <BSCol size="col-lg-9" className="aq-mb-3">
          <FileUploader />
        </BSCol>
        <BSCol size="col-lg-3"></BSCol>
      </BSGrid>
    </PageTemplate>
  );
}
