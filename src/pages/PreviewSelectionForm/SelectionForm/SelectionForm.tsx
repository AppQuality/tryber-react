import {
  aqBootstrapTheme,
  Button,
  Form,
  Formik,
} from "@appquality/appquality-design-system";
import { FormikProps } from "formik";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import useGenderOptions from "src/features/UseGenderOptions";
import { useMapFormDataToInitialValues } from "src/pages/PreviewSelectionForm/SelectionForm/mapFormDataToInitialValues";
import { SelectionFormFields } from "src/pages/PreviewSelectionForm/SelectionForm/SelectionFormFields";
import {
  CustomUserFieldsData,
  useGetCustomUserFieldsQuery,
  useGetUsersMeCampaignsByCampaignCompatibleDevicesQuery,
  useGetUsersMeCampaignsByCampaignIdFormsQuery,
} from "src/services/tryberApi";
import { useAppDispatch, useAppSelector } from "src/store";
import styled from "styled-components";
import * as yup from "yup";
import { setCufList, setformData } from "../previewSelectionFormSlice";
import SelectionFocusError from "./SelectionFocusError";
import { AvailableDevices } from "./SelectionFormFields/AvailableDevices";
import { useSubmitSelectionFormValues } from "./useSubmitSelectionFormValues";

const StyledError = styled.div`
  color: ${aqBootstrapTheme.colors.red800};
`;

export const SelectionForm = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const cuf = useGetCustomUserFieldsQuery();
  const form = useGetUsersMeCampaignsByCampaignIdFormsQuery(
    { campaignId: id },
    { skip: !id }
  );
  const devices = useGetUsersMeCampaignsByCampaignCompatibleDevicesQuery(
    { campaign: id },
    { skip: !id }
  );

  const { cufList, formData, showSubmitError } = useAppSelector(
    (state) => state.previewSelectionForm
  );

  const initialFormValues: SelectionFormValues = useMapFormDataToInitialValues(
    formData,
    cufList
  );
  const { submitValues } = useSubmitSelectionFormValues(id);

  const validationSchema = {
    questions: yup.object(),
  };

  const genderOptions = useGenderOptions();

  useEffect(() => {
    const list: CustomUserFieldsData[] = [];
    cuf?.data?.forEach((d) => {
      d.fields?.forEach((f) => list.push(f));
    });
    dispatch(setCufList(list));
  }, [cuf]);

  useEffect(() => {
    if (form?.data) dispatch(setformData(form.data));
  }, [form]);

  if (
    cuf.error ||
    (devices.error && "status" in devices.error && devices.error.status !== 404)
  )
    return (
      <StyledError className="aq-mb-3">
        {t("_FORM_GENERIC-ERROR_MESSAGES_", {
          defaultValue: "An error occurred while loading the form.",
        })}
      </StyledError>
    );

  return (
    <Formik
      // hack to prevent blur validation https://github.com/jaredpalmer/formik/issues/2457
      validateOnBlur={false}
      validateOnMount
      initialValues={initialFormValues}
      enableReinitialize
      validationSchema={yup.object(validationSchema)}
      onSubmit={submitValues}
    >
      {(formikProps: FormikProps<SelectionFormValues>) => {
        return (
          <Form id="selectionForm">
            <AvailableDevices />
            <SelectionFormFields genderOptions={genderOptions} />
            <Button
              className="aq-mt-3"
              kind="primary"
              type="submit"
              size="block"
              disabled={
                formikProps.isSubmitting ||
                !!devices.error ||
                cuf.isLoading ||
                cuf.isFetching ||
                form.isLoading ||
                form.isFetching
              }
              flat
            >
              {formikProps.isSubmitting
                ? t("wait...")
                : t("_FORM_BUTTON_SEND-FORM_", {
                    defaultValue: "Send Form and Apply",
                  })}
            </Button>
            {showSubmitError && (
              <StyledError className="aq-mt-1">
                {t("_FORM_MESSAGE_ERROR-GENERIC_", {
                  defaultValue:
                    "An error occurred while submitting the form. Try sending it again.",
                })}
              </StyledError>
            )}
            <SelectionFocusError />
          </Form>
        );
      }}
    </Formik>
  );
};
