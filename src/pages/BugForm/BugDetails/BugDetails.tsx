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
import { useTranslation } from "react-i18next";
import { LabelWithHelper } from "../LabelWithHelper/LabelWithHelper";
import i18n from "src/i18n";
import { TextareaField } from "src/pages/BugForm/BugDetails/TextareaField/TextareaField";
import { useAppDispatch } from "src/store";
import { setBugDetailsModal } from "../bugFormSlice";

interface BugDetailsProps {
  className?: string;
}

export const BugDetails = ({ className }: BugDetailsProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const openBugDetailsModal = (
    title: string,
    type: "severity" | "type" | "replicability"
  ) =>
    dispatch(
      setBugDetailsModal({
        open: true,
        title,
        type,
      })
    );

  const isDesktop = window.matchMedia(
    `only screen and (min-width: ${aqBootstrapTheme.grid.breakpoints.lg})`
  ).matches;

  return (
    <Card
      className={className}
      title={
        <LabelWithHelper
          label="Bug Details"
          href={t("Bug details help article", {
            ns: "links",
          })}
        />
      }
    >
      <Field
        name="title"
        type="text"
        label="Bug title"
        placeholder="Some bug title"
      />
      <div className="aq-mb-3">
        <Select
          name="device"
          value={[]}
          options={[]}
          label={"Test device"}
          placeholder={"Select device"}
          menuTargetQuery="body"
          onChange={() => null}
          noOptionsMessage={() => "No options"}
        />
      </div>
      <div className="aq-mb-3">
        <Select
          name="severity"
          value={[]}
          options={[]}
          label={
            <LabelWithHelper
              label="Bug severity"
              onClick={() =>
                openBugDetailsModal(
                  t("BUGFORM_SEVERITY_MODAL_TITLE", {
                    defaultValue: "Bug severity",
                  }),
                  "severity"
                )
              }
              small
            />
          }
          placeholder={"Select severity"}
          menuTargetQuery="body"
          onChange={() => null}
          noOptionsMessage={() => "No options"}
        />
      </div>
      <div className="aq-mb-3">
        <Select
          name="type"
          value={[]}
          options={[]}
          label={
            <LabelWithHelper
              label="Bug type"
              onClick={() =>
                openBugDetailsModal(
                  t("BUGFORM_TYPE_MODAL_TITLE", {
                    defaultValue: "Bug type",
                  }),
                  "type"
                )
              }
              small
            />
          }
          placeholder={"Select type"}
          menuTargetQuery="body"
          onChange={() => null}
          noOptionsMessage={() => "No options"}
        />
      </div>
      <div className="aq-mb-3">
        <Select
          name="replicability"
          value={[]}
          options={[]}
          label={
            <LabelWithHelper
              label="Bug replicability"
              onClick={() =>
                openBugDetailsModal(
                  t("BUGFORM_REPLICABILTY_MODAL_TITLE", {
                    defaultValue: "Bug replicability",
                  }),
                  "replicability"
                )
              }
              small
            />
          }
          placeholder={"Select replicability"}
          menuTargetQuery="body"
          onChange={() => null}
          noOptionsMessage={() => "No options"}
        />
      </div>
      <div className="aq-mb-3">
        <Select
          name="usecase"
          value={[]}
          options={[]}
          label={"Usecase task"}
          placeholder={"Select usecase"}
          menuTargetQuery="body"
          onChange={() => null}
          noOptionsMessage={() => "No options"}
        />
      </div>
      <TextareaField
        className="aq-mb-3"
        name="stepDescription"
        label={"Step-by-step description"}
        placeholder={"1.\n2.\n3."}
        height="8.8rem"
        autoResize={isDesktop}
      />
      <TextareaField
        className="aq-mb-3"
        name="expected"
        label="Expected result"
        placeholder="Write what you expected"
        height="7rem"
        autoResize={isDesktop}
      />
      <TextareaField
        className="aq-mb-3"
        name="current"
        label="Observed result"
        placeholder="Write what you found"
        height="7rem"
        autoResize={isDesktop}
      />
      <BSGrid>
        <BSCol size="col-6" className="aq-mb-3">
          <FormLabel htmlFor={"date"} label={"When did it happen"} />
          <Datepicker
            id={"date"}
            locale={i18n.language}
            placeholder={"Pick a date"}
            setText={"Set"}
            cancelText={"Cancel"}
            onCancel={() => null}
            onChange={() => null}
          />
        </BSCol>
        <BSCol size="col-6">
          <FormLabel htmlFor={"time"} label={"What time did it happen"} />
          <Datepicker
            id={"time"}
            locale={i18n.language}
            control="time"
            placeholder={"Pick a time"}
            setText={"Set"}
            cancelText={"Cancel"}
            onCancel={() => null}
            onChange={() => null}
          />
        </BSCol>
      </BSGrid>
      <Field
        name="notes"
        type="text"
        label="Additional comments"
        placeholder="Anything else you'd like to add"
      />
    </Card>
  );
};
