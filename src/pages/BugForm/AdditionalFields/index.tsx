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
                name={field.slug}
                label={field.name}
                validation={field.regex}
              />
            );
          case "select":
            return (
              <SelectAdditionalField
                label={field.name}
                name={field.slug}
                options={field.options}
              />
            );
          default:
            return null;
        }
      })}
    </Card>
  );
};
