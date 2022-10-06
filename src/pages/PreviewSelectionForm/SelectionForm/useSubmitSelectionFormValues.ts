import { FormikHelpers } from "formik";
import { Option } from "@appquality/appquality-design-system/dist/stories/select/_types";
import {
  PostUsersMeCampaignsByCampaignIdFormsApiArg,
  usePostUsersMeCampaignsByCampaignIdFormsMutation,
} from "src/services/tryberApi";
import useGenderOptions from "src/features/UseGenderOptions";

export const useSubmitSelectionFormValues = (campaignId: string) => {
  const [createForm] = usePostUsersMeCampaignsByCampaignIdFormsMutation();
  const genderOptions = useGenderOptions();

  const isGender = (value?: string) =>
    genderOptions.map((g) => g.value === value);

  const getQuestionValues = (
    reply: string | Option | Option[] | { city: string; country: string }
  ) => {
    if (
      typeof reply === "string" ||
      ("city" in reply && "country" in reply && !("label" in reply))
    )
      return { serialized: reply };
    if (Array.isArray(reply)) {
      let id: number[] = [];
      let serialized: string[] = [];
      reply.forEach((r) => {
        if (r.value) {
          r.value !== "-1" && serialized.push(r.label);
          r.value !== r.label && id.push(parseInt(r.value));
        }
      });
      return {
        ...(id.length ? { id } : undefined),
        ...(serialized.length ? { serialized } : undefined),
      };
    }
    return reply.value?.toLowerCase() === reply.label.toLowerCase() ||
      isGender(reply.value)
      ? { serialized: reply.value }
      : reply.value
      ? {
          id: parseInt(reply.value),
          ...(reply.value !== "-1" ? { serialized: reply.label } : undefined),
        }
      : {};
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
        form: formToSend,
        device: deviceIds,
      },
    };

    const res = await createForm(args);

    if ("data" in res) {
      // refresh main page from iFrame (same domain)
      window.top?.location.reload();
    }

    helpers.setSubmitting(false);
  };
  return { submitValues };
};
