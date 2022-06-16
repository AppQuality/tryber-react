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
        name="description"
        label={"Step-by-step description"}
        placeholder={"1.\n2.\n3."}
        height="8.8rem"
      />
      <Field
        name="expected"
        type="text"
        label="Expected result"
        placeholder="Write what you expected"
      />
      <Field
        name="current"
        type="text"
        label="Observed result"
        placeholder="Write what you found"
      />
      <BSGrid>
        <BSCol size="col-lg-6" className="aq-mb-3">
          <FormLabel htmlFor={"date"} label={"When did it happen"} />
          <Datepicker
            id={"date"}
            locale={i18n.language}
            placeholder={"Select date"}
            setText={"Set"}
            cancelText={"Cancel"}
            onCancel={() => null}
            onChange={() => null}
          />
        </BSCol>
        {/* TODO Time Picker ??? */}
        <BSCol size="col-lg-6">
          <FormLabel htmlFor={"time"} label={"What time did it happen"} />
          <Datepicker
            id={"time"}
            locale={i18n.language}
            placeholder={"Select date"}
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
