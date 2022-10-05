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

  formData.forEach((f) => {
    if (!f.value) {
      initialFormValues.questions[f.id] = "";
      return;
    }
    if (typeof f.value === "number") {
      initialFormValues.questions[f.id] = f.value.toString();
      return;
    }
    if (typeof f.value === "string") {
      if (f.type === "gender") {
        initialFormValues.questions[f.id] = genderOptions.find(
          (gender) => f.value === gender.value
        );
      } else initialFormValues.questions[f.id] = f.value;
      return;
    }
    if (f.value && "city" in f.value && "country" in f.value) {
      initialFormValues.questions[f.id] = {
        city: f.value.city,
        country: f.value.country,
      };
      return;
    }
    if (Array.isArray(f.value)) {
      initialFormValues.questions[f.id] = f.value.map((v) => {
        const cufId = parseInt(f.type.replace("cuf_", ""));
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
