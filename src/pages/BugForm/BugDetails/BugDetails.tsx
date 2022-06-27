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
import { useAppDispatch } from "src/redux/provider";
import { useTranslation } from "react-i18next";
import { LabelWithHelper } from "src/pages/BugForm/LabelWithHelper/LabelWithHelper";
import { TextareaField } from "src/pages/BugForm/BugDetails/TextareaField/TextareaField";

interface BugDetailsProps {
  className?: string;
}

export const BugDetails = ({ className }: BugDetailsProps) => {
  const { t } = useTranslation();
  const isDesktop = window.matchMedia(
    `only screen and (min-width: ${aqBootstrapTheme.grid.breakpoints.lg})`
  ).matches;
  const dispatch = useAppDispatch();

  const openBugDetailsModal = (
    title: string,
    type: "severity" | "type" | "replicability"
  ) =>
    dispatch({
      type: "bugForm/setBugDetailsModal",
      payload: {
        open: true,
        title,
        type,
      },
    });

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
              onClick={() => openBugDetailsModal("Bug severity", "severity")}
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
              onClick={() => openBugDetailsModal("Bug type", "type")}
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
                openBugDetailsModal("Bug replicability", "replicability")
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
