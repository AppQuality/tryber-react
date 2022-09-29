import { BSCol, BSGrid } from "@appquality/appquality-design-system";
import { PreselectionForm } from "./PreselectionForm/PreselectionForm";
import { PreselectionHeader } from "./PreselectionHeader";

export default function PreselectionPage() {
  return (
    <BSGrid>
      <BSCol size="col-lg-9" className="aq-mb-3">
        <PreselectionHeader
          title="È il tuo momento, candidati ora"
          subtitle="Tra te e la campagna c’è questo form: compilalo in tutti i suoi campi per avere maggiori possibilità di selezione. Salveremo questi dati per campagne future."
        />
        <PreselectionForm />
      </BSCol>
      <BSCol size="col-lg-3"></BSCol>
    </BSGrid>
  );
}
