import {
  aqBootstrapTheme,
  BSCol,
  BSGrid,
  Card,
  Datepicker,
  Field,
  FieldProps,
  FormikField,
  FormLabel,
} from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import i18n from "src/i18n";
import { getLanguageMessage } from "src/pages/BugForm/BugDetails/getLanguageMessage";
import { BugReplicability } from "src/pages/BugForm/BugDetails/select/BugReplicability";
import { BugSeverity } from "src/pages/BugForm/BugDetails/select/BugSeverity";
import { BugType } from "src/pages/BugForm/BugDetails/select/BugType";
import { Devices } from "src/pages/BugForm/BugDetails/select/Devices";
import { UseCase } from "src/pages/BugForm/BugDetails/select/UseCase";
import { TextareaField } from "src/pages/BugForm/BugDetails/TextareaField/TextareaField";
import { LabelWithHelper } from "src/pages/BugForm/LabelWithHelper/LabelWithHelper";
import useCampaignData from "src/pages/BugForm/useCampaignData";

interface BugDetailsProps {
  className?: string;
}

export const BugDetails = ({ className }: BugDetailsProps) => {
  const { t } = useTranslation();
  const { data } = useCampaignData();
  const isDesktop = window.matchMedia(
    `only screen and (min-width: ${aqBootstrapTheme.grid.breakpoints.lg})`
  ).matches;

  return (
    <Card
      className={className}
      title={
        <LabelWithHelper
          label={t("BUGFORM_BUGDTLS_TITLE", { defaultValue: "Bug Details" })}
          title={t("BUGTITLEDETAILS_TOOLTIP_TXT", {
            defaultValue: "Learn more",
          })}
          href={t("Bug details help article", {
            ns: "links",
          })}
        />
      }
    >
      {getLanguageMessage(data?.language)}
      <Field
        name="title"
        type="text"
        label={t("BUGFORM_BUGDTLS_BUGTITLE", { defaultValue: "Bug title" })}
        placeholder={t("BUGFORM_BUGDTLS_BUGTITLE_PLACEHOLDER", {
          defaultValue: "[Phase / Section] - Briefly Issue description",
        })}
      />
      <div className="aq-mb-3">
        <Devices />
      </div>
      <div className="aq-mb-3">
        <BugSeverity />
      </div>
      <div className="aq-mb-3">
        <BugType />
      </div>
      <div className="aq-mb-3">
        <BugReplicability />
      </div>
      <div className="aq-mb-3">
        <UseCase />
      </div>
      <TextareaField
        className="aq-mb-3"
        name="stepDescription"
        label={t("BUGFORM_BUGDTLS_STEPBYSTEP", {
          defaultValue: "Step-by-step description",
        })}
        placeholder={t("BUGFORM_BUGDTLS_STEPBYSTEP_PLACEHOLDER", {
          defaultValue: "1. \n2. \n3. ",
        })}
        height="7.15rem"
        autoResize={isDesktop}
      />
      <TextareaField
        className="aq-mb-3"
        name="expected"
        label={t("BUGFORM_BUGDTLS_EXPDRES", {
          defaultValue: "Expected result",
        })}
        placeholder={t("BUGFORM_BUGDTLS_EXPDRES_PLACEHOLDER", {
          defaultValue: "Write what you expected",
        })}
        height={isDesktop ? "4.15rem" : "5.65rem"}
        autoResize={isDesktop}
      />
      <TextareaField
        className="aq-mb-3"
        name="current"
        label={t("BUGFORM_BUGDTLS_OSBRVDRES", {
          defaultValue: "Observed result",
        })}
        placeholder={t("BUGFORM_BUGDTLS_OSBRVDRES_PLACEHOLDER", {
          defaultValue: "Write what you found",
        })}
        height={isDesktop ? "4.15rem" : "5.65rem"}
        autoResize={isDesktop}
      />
      <BSGrid>
        <BSCol size="col-6" className="aq-mb-3">
          <FormikField name="date">
            {({ field, form }: FieldProps) => (
              <>
                <FormLabel
                  htmlFor={"date"}
                  label={t("BUGFORM_BUGDTLS_DAY", {
                    defaultValue: "When did it happen",
                  })}
                />
                <Datepicker
                  key={field.value}
                  value={field.value}
                  id={"date"}
                  maxDate={new Date()}
                  locale={i18n.language}
                  placeholder={t("BUGFORM_BUGDTLS_DAY_PLACEHOLDER", {
                    defaultValue: "Pick a date",
                  })}
                  setText={t("Set")}
                  cancelText={t("Cancel")}
                  onChange={(v: { value: Date }) =>
                    form.setFieldValue(
                      "date",
                      v.value ? new Date(v.value) : new Date(),
                      true
                    )
                  }
                />
              </>
            )}
          </FormikField>
        </BSCol>
        <BSCol size="col-6">
          <FormikField name="time">
            {({ field, form }: FieldProps) => (
              <>
                <FormLabel
                  htmlFor={"time"}
                  label={t("BUGFORM_BUGDTLS_TIME", {
                    defaultValue: "What time did it happen",
                  })}
                />
                <Datepicker
                  key={field.value}
                  value={field.value}
                  id={"time"}
                  locale={"it"}
                  control="time"
                  placeholder={t("BUGFORM_BUGDTLS_TIME_PLACEHOLDER", {
                    defaultValue: "Pick a time",
                  })}
                  setText={t("Set")}
                  cancelText={t("Cancel")}
                  onChange={(v: { value: Date }) =>
                    form.setFieldValue(
                      "time",
                      v.value ? new Date(v.value) : new Date(),
                      true
                    )
                  }
                />
              </>
            )}
          </FormikField>
        </BSCol>
      </BSGrid>
      <TextareaField
        name="notes"
        label={t("BUGFORM_BUGDTLS_COMMENTS", {
          defaultValue: "Additional comments",
        })}
        placeholder={t("BUGFORM_BUGDTLS_COMMENTS_PLACEHOLDER", {
          defaultValue: "Anything else you'd like to add",
        })}
        height={isDesktop ? "2.65rem" : "5.65rem"}
        autoResize={isDesktop}
      />
    </Card>
  );
};
