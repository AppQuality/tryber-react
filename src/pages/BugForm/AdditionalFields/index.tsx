import { Card } from "@appquality/appquality-design-system";
import useCampaignData from "../useCampaignData";
import { TextAdditionalField } from "./TextAdditionalField";
import { SelectAdditionalField } from "./SelectAdditionalField";
interface AdditionalFieldsProps {
  className?: string;
}

export const AdditionalFields = ({ className }: AdditionalFieldsProps) => {
  const { data } = useCampaignData();
  if (!data?.additionalFields) return null;
  return (
    <Card className={className} title={"Additional fields"}>
      {data.additionalFields.map((field) => {
        switch (field.type) {
          case "text":
            return (
              <TextAdditionalField
                key={field.slug}
                name={`additional.${field.slug}`}
                label={field.name}
                validation={field.regex}
                errorMessage={field.error}
              />
            );
          case "select":
            return (
              <SelectAdditionalField
                key={field.slug}
                label={field.name}
                name={`additional.${field.slug}`}
                options={field.options}
                errorMessage={field.error}
              />
            );
          default:
            return null;
        }
      })}
    </Card>
  );
};
