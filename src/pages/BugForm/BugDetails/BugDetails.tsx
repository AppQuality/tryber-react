import {
  aqBootstrapTheme,
  BSCol,
  BSGrid,
  Card,
  Datepicker,
  Field,
  FormLabel,
  Select,
} from "@appquality/appquality-design-system";
import i18n from "src/i18n";
import { useTranslation } from "react-i18next";
import { LabelWithHelper } from "src/pages/BugForm/LabelWithHelper/LabelWithHelper";
import { TextareaField } from "src/pages/BugForm/BugDetails/TextareaField/TextareaField";
import { BugSeverity } from "src/pages/BugForm/BugDetails/select/BugSeverity";
import { BugType } from "src/pages/BugForm/BugDetails/select/BugType";
import { BugReplicability } from "src/pages/BugForm/BugDetails/select/BugReplicability";
import { UseCase } from "src/pages/BugForm/BugDetails/select/UseCase";

interface BugDetailsProps {
  className?: string;
}

export const BugDetails = ({ className }: BugDetailsProps) => {
  const { t } = useTranslation();
  const isDesktop = window.matchMedia(
    `only screen and (min-width: ${aqBootstrapTheme.grid.breakpoints.lg})`
  ).matches;

  return (
    <Card
      className={className}
      title={
        <LabelWithHelper
          label={t("BUGFORM_BUGDTLS_TITLE", { defaultValue: "Bug Details" })}
          href={t("Bug details help article", {
            ns: "links",
          })}
        />
      }
    >
      <Field
        name="title"
        type="text"
        label={t("BUGFORM_BUGDTLS_BUGTITLE", { defaultValue: "Bug title" })}
        placeholder={t("BUGFORM_BUGDTLS_BUGTITLE_PLACEHOLDER", {
          defaultValue: "[Phase / Section] - Briefly Issue description",
        })}
      />
      <div className="aq-mb-3">
        <Select
          name="device"
          value={[]}
          options={[]}
          label={t("BUGFORM_BUGDTLS_TESTDVC", { defaultValue: "Test device" })}
          placeholder={t("BUGFORM_BUGDTLS_TESTDVC_PLACEHOLDER", {
            defaultValue: "Select device",
          })}
          menuTargetQuery="body"
          onChange={() => null}
          noOptionsMessage={() => t("__SELECT_DEFAULT_NO_OPTION")}
        />
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
          defaultValue: "1.\n2.\n3.",
        })}
        height="8.8rem"
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
        height="7rem"
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
        height="7rem"
        autoResize={isDesktop}
      />
      <BSGrid>
        <BSCol size="col-6" className="aq-mb-3">
          <FormLabel
            htmlFor={"date"}
            label={t("BUGFORM_BUGDTLS_DAY", {
              defaultValue: "When did it happen",
            })}
          />
          <Datepicker
            id={"date"}
            locale={i18n.language}
            placeholder={t("BUGFORM_BUGDTLS_DAY_PLACEHOLDER", {
              defaultValue: "Pick a date",
            })}
            setText={t("Set")}
            cancelText={t("Cancel")}
            onCancel={() => null}
            onChange={() => null}
          />
        </BSCol>
        <BSCol size="col-6">
          <FormLabel
            htmlFor={"time"}
            label={t("BUGFORM_BUGDTLS_TIME", {
              defaultValue: "What time did it happen",
            })}
          />
          <Datepicker
            id={"time"}
            locale={i18n.language}
            control="time"
            placeholder={t("BUGFORM_BUGDTLS_TIME_PLACEHOLDER", {
              defaultValue: "Pick a time",
            })}
            setText={t("Set")}
            cancelText={t("Cancel")}
            onCancel={() => null}
            onChange={() => null}
          />
        </BSCol>
      </BSGrid>
      <Field
        name="notes"
        type="text"
        label={t("BUGFORM_BUGDTLS_COMMENTS", {
          defaultValue: "Additional comments",
        })}
        placeholder={t("BUGFORM_BUGDTLS_COMMENTS_PLACEHOLDER", {
          defaultValue: "Anything else you'd like to add",
        })}
      />
    </Card>
  );
};
