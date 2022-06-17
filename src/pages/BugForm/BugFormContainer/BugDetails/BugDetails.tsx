import {
  BSCol,
  BSGrid,
  Card,
  Datepicker,
  Field,
  FormLabel,
  Select,
} from "@appquality/appquality-design-system";
import i18n from "../../../../i18n";
import { TextareaField } from "./TextareaField/TextareaField";

interface BugDetailsProps {
  className?: string;
}

export const BugDetails = ({ className }: BugDetailsProps) => {
  return (
    <Card className={className} title={"Bug Details"}>
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
          label={"Bug severity"}
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
          label={"Bug type"}
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
          label={"Bug replicability"}
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
        resize="vertical"
      />
      <TextareaField
        className="aq-mb-3"
        name="expected"
        label="Expected result"
        placeholder="Write what you expected"
        height="7rem"
        resize="vertical"
      />
      <TextareaField
        className="aq-mb-3"
        name="current"
        label="Observed result"
        placeholder="Write what you found"
        height="7rem"
        resize="vertical"
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
        {/* TODO Time Picker ??? */}
        <BSCol size="col-6">
          <FormLabel htmlFor={"time"} label={"What time did it happen"} />
          <Datepicker
            id={"time"}
            locale={i18n.language}
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
