import { Card } from "@appquality/appquality-design-system";
import useCampaignData from "../useCampaignData";
import { TextAdditionalField } from "./TextAdditionalField";
import { SelectAdditionalField } from "./SelectAdditionalField";
import { useTranslation } from "react-i18next";
interface AdditionalFieldsProps {
  className?: string;
}

export const AdditionalFields = ({ className }: AdditionalFieldsProps) => {
  const { data } = useCampaignData();
  const { t } = useTranslation();
  if (!data?.additionalFields) return null;
  return (
    <Card className={className} title={t("Additional fields")}>
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
              />
            );
          default:
            return null;
        }
      })}
    </Card>
  );
};
