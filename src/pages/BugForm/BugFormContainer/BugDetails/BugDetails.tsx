import { Card, Field, Select } from "@appquality/appquality-design-system";
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
      <TextareaField
        name="notes"
        label={"Additional comments"}
        placeholder={"Anything else you'd like to add"}
      />
    </Card>
  );
};
