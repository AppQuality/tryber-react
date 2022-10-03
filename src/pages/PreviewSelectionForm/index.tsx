import { BSCol, BSGrid } from "@appquality/appquality-design-system";
import { PageTemplate } from "src/features/PageTemplate";
import { SelectionForm } from "./SelectionForm/SelectionForm";

export default function PreviewSelectionForm() {
  return (
    <PageTemplate
      route="preview-selection-form"
      title="È il tuo momento, candidati ora"
      subtitle="Tra te e la campagna c’è questo form: compilalo in tutti i suoi campi per avere maggiori possibilità di selezione. Salveremo questi dati per campagne future."
      shouldBeLoggedIn
      showHeader={false}
      showSidebar={false}
    >
      <BSGrid>
        <BSCol size="col-lg-9" className="aq-mb-3">
          <SelectionForm />
        </BSCol>
      </BSGrid>
    </PageTemplate>
  );
}
