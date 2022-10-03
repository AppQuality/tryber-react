import { PageTemplate } from "src/features/PageTemplate";

export default function PreviewSelectionForm() {
  return (
    <PageTemplate
      route="preview-selection-form"
      shouldBeLoggedIn
      showHeader={false}
      showSidebar={false}
    >
      <div>preview selection form</div>
    </PageTemplate>
  );
}
