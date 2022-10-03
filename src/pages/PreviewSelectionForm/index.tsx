import { BSCol, BSGrid } from "@appquality/appquality-design-system";
import { SelectionForm } from "./SelectionForm/SelectionForm";
import { SelectionFormHeader } from "./SelectionFormHeader";

export default function PreviewSelectionForm() {
  return (
    <BSGrid>
      <BSCol size="col-lg-9" className="aq-mb-3">
        <SelectionFormHeader
          title="È il tuo momento, candidati ora"
          subtitle="Tra te e la campagna c’è questo form: compilalo in tutti i suoi campi per avere maggiori possibilità di selezione. Salveremo questi dati per campagne future."
        />
        <SelectionForm />
      </BSCol>
      <BSCol size="col-lg-3"></BSCol>
    </BSGrid>
  );
}
