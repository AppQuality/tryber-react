import {
  aqBootstrapTheme,
  BSCol,
  BSGrid,
} from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();

  return (
    <StyledPageTemplate>
      <PageTemplate
        route="preview-selection-form"
        title={t("_FORM_TITLE_", {
          defaultValue: "It's your time, apply now",
        })}
        subtitle={t("_FORM_PARAGRAPH_", {
          defaultValue:
            "Between you and the campaign there is this form: fill it in all its fields to have more selection possibilities. We will save this data for future campaigns.",
        })}
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
