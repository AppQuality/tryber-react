import { Button, Form, Formik } from "@appquality/appquality-design-system";
import { FormikProps } from "formik";
import * as yup from "yup";
import {
  CustomUserFieldsData,
  useGetCustomUserFieldsQuery,
  useGetUsersMeCampaignsByCampaignIdFormsQuery,
} from "src/services/tryberApi";
import { AvailableDevices } from "./SelectionFormFields/AvailableDevices";
import { SelectionFormFields } from "./SelectionFormFields";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "src/store";
import { setCufList, setformData } from "../previewSelectionFormSlice";
import SelectionFocusError from "./SelectionFocusError";

export const SelectionForm = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const { data } = useGetCustomUserFieldsQuery();
  const form = useGetUsersMeCampaignsByCampaignIdFormsQuery(
    { campaignId: id },
    { skip: !id }
  );

  const { cufList, formData } = useAppSelector(
    (state) => state.previewSelectionForm
  );

  const genderOptions = [
    { label: t("Gender option:::Female"), value: "female" },
    { label: t("Gender option:::Male"), value: "male" },
    { label: t("Gender option:::Not Specified"), value: "not-specified" },
    { label: t("Gender option:::Other"), value: "other" },
  ];

  const initialFormValues: SelectionFormValues = {
    device: [],
    questions: {},
  };

  const validationSchema = {
    questions: yup.object(),
  };

  if (formData && cufList.length) {
    formData?.forEach((f) => {
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
  }

  useEffect(() => {
    const list: CustomUserFieldsData[] = [];
    data?.forEach((d) => {
      d.fields?.forEach((f) => list.push(f));
    });
    dispatch(setCufList(list));
  }, [data]);

  useEffect(() => {
    if (form?.data) dispatch(setformData(form.data));
  }, [form]);

  return (
    <Formik
      initialValues={initialFormValues}
      enableReinitialize
      validationSchema={yup.object(validationSchema)}
      onSubmit={async (values, helpers) => {
        console.log(values);
      }}
    >
      {(formikProps: FormikProps<SelectionFormValues>) => {
        return (
          <Form id="selectionForm">
            <AvailableDevices />
            <SelectionFormFields genderOptions={genderOptions} />
            <Button
              className="aq-mt-3 aq-mb-4"
              type="primary"
              htmlType="submit"
              size="block"
              disabled={formikProps.isSubmitting}
              flat
            >
              Send Form and Apply
            </Button>
            <SelectionFocusError />
          </Form>
        );
      }}
    </Formik>
  );
};
