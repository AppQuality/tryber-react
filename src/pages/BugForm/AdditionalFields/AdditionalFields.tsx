import { Card, Field, Select } from "@appquality/appquality-design-system";

interface AdditionalFieldsProps {
  className?: string;
}

export const AdditionalFields = ({ className }: AdditionalFieldsProps) => {
  return (
    <Card className={className} title={"Additional fields"}>
      <Field
        name="additional"
        type="text"
        label="Additional question"
        placeholder="Type your answer here"
      />
      <div className="aq-mb-3">
        <Select
          name="additionalSelect"
          value={[]}
          options={[]}
          label={"Additional select"}
          placeholder={"Choose value"}
          menuTargetQuery="body"
          onChange={() => null}
          noOptionsMessage={() => "No options"}
        />
      </div>
    </Card>
  );
};
