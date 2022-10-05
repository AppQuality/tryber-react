import {
  CustomUserFieldsData,
  GetUsersMeCampaignsByCampaignIdFormsApiResponse,
} from "src/services/tryberApi";
import useGenderOptions from "src/features/UseGenderOptions";

export const useMapFormDataToInitialValues = (
  formData?: GetUsersMeCampaignsByCampaignIdFormsApiResponse,
  cufList?: CustomUserFieldsData[]
): SelectionFormValues => {
  const genderOptions = useGenderOptions();
  const initialFormValues: SelectionFormValues = {
    device: [],
    questions: {},
  };
  if (!formData || !cufList || cufList.length < 1) return initialFormValues;

  formData.forEach((field) => {
    if (!field.value) {
      initialFormValues.questions[field.id] = "";
      return;
    }
    if (typeof field.value === "number") {
      initialFormValues.questions[field.id] = field.value.toString();
      return;
    }
    if (typeof field.value === "string") {
      if (field.type === "gender") {
        initialFormValues.questions[field.id] = genderOptions.find(
          (gender) => field.value === gender.value
        );
      } else initialFormValues.questions[field.id] = field.value;
      return;
    }
    if (field.value && "city" in field.value && "country" in field.value) {
      initialFormValues.questions[field.id] = {
        city: field.value.city,
        country: field.value.country,
      };
      return;
    }
    if (Array.isArray(field.value)) {
      initialFormValues.questions[field.id] = field.value.map((v) => {
        const cufId = parseInt(field.type.replace("cuf_", ""));
        const currentCuf = cufList.find((cuf) => cuf.id === cufId);
        const option = currentCuf?.options?.find((option) => v === option.id);
        return {
          label: option?.name || "",
          value: option?.id?.toString() || "",
        };
      });
    }
  });
  return initialFormValues;
};
