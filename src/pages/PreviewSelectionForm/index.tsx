import {
  aqBootstrapTheme,
  BSCol,
  BSGrid,
} from "@appquality/appquality-design-system";
import { PageTemplate } from "src/features/PageTemplate";
import styled from "styled-components";
import { SelectionForm } from "./SelectionForm/SelectionForm";

const StyledPageTemplate = styled.div`
  background-color: ${aqBootstrapTheme.colors.purple100};
  .preview-selection-form {
    max-width: 100%;
    padding: 0 16px;
  }
`;

export default function PreviewSelectionForm() {
  return (
    <StyledPageTemplate>
      <PageTemplate
        route="preview-selection-form"
        title="È il tuo momento, candidati ora"
        subtitle="Tra te e la campagna c’è questo form: compilalo in tutti i suoi campi per avere maggiori possibilità di selezione. Salveremo questi dati per campagne future."
        containerClass="aq-pt-1 preview-selection-form"
        shouldBeLoggedIn
        showHeader={false}
        showSidebar={false}
      >
        <BSGrid>
          <BSCol size="col-lg-8" className="aq-mb-3">
            <SelectionForm />
          </BSCol>
        </BSGrid>
      </PageTemplate>
    </StyledPageTemplate>
  );
}
