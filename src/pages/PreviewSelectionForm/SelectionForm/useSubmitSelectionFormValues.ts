import { FormikHelpers } from "formik";
import { Option } from "@appquality/appquality-design-system/dist/stories/select/_types";
import {
  PostUsersMeCampaignsByCampaignIdFormsApiArg,
  usePostUsersMeCampaignsByCampaignIdFormsMutation,
} from "src/services/tryberApi";

export const useSubmitSelectionFormValues = (campaignId: string) => {
  const [createForm] = usePostUsersMeCampaignsByCampaignIdFormsMutation();

  const getQuestionValues = (
    value: string | Option | Option[] | { city: string; country: string }
  ) => {
    if (typeof value === "string" || ("city" in value && "country" in value))
      return { serialized: value };
    if (Array.isArray(value)) {
      let id: number[] = [];
      let serialized: string[] = [];
      value.forEach((v) => {
        if (v.value) {
          serialized.push(v.label);
          v.value !== v.label && id.push(parseInt(v.value));
        }
      });
      return { ...(id.length ? { id } : undefined), serialized };
    }
    return value.value?.toLowerCase() === value.label.toLowerCase()
      ? { serialized: value.value }
      : value.value && { id: parseInt(value.value), serialized: value.label };
  };

  const submitValues = async (
    values: SelectionFormValues,
    helpers: FormikHelpers<SelectionFormValues>
  ) => {
    helpers.setSubmitting(true);
    const deviceIds = values.device.map((d) => parseInt(d.value));
    const questionsKeys = Object.keys(values.questions);

    const formToSend = questionsKeys.map((k) => {
      return {
        question: parseInt(k),
        value: getQuestionValues(values.questions[k]),
      };
    });

    const args: PostUsersMeCampaignsByCampaignIdFormsApiArg = {
      campaignId,
      body: {
        // @ts-ignore
        form: formToSend,
        device: deviceIds,
      },
    };

    console.log(args);

    const res = await createForm(args);

    console.info("response", res);

    helpers.setSubmitting(false);
  };
  return { submitValues };
};
