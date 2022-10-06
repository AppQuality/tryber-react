import {
  aqBootstrapTheme,
  Button,
  Form,
  Formik,
} from "@appquality/appquality-design-system";
import { FormikProps } from "formik";
import * as yup from "yup";
import {
  CustomUserFieldsData,
  useGetCustomUserFieldsQuery,
  useGetUsersMeCampaignsByCampaignCompatibleDevicesQuery,
  useGetUsersMeCampaignsByCampaignIdFormsQuery,
} from "src/services/tryberApi";
import { AvailableDevices } from "./SelectionFormFields/AvailableDevices";
import { SelectionFormFields } from "src/pages/PreviewSelectionForm/SelectionForm/SelectionFormFields";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "src/store";
import { setCufList, setformData } from "../previewSelectionFormSlice";
import SelectionFocusError from "./SelectionFocusError";
import styled from "styled-components";
import { useSubmitSelectionFormValues } from "./useSubmitSelectionFormValues";
import { useMapFormDataToInitialValues } from "src/pages/PreviewSelectionForm/SelectionForm/mapFormDataToInitialValues";
import useGenderOptions from "src/features/UseGenderOptions";

const StyledError = styled.div`
  color: ${aqBootstrapTheme.colors.red800};
  margin-bottom: 16px;
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
    form.error ||
    cuf.error ||
    (devices.error && "status" in devices.error && devices.error.status !== 404)
  )
    return (
      <StyledError>
        {t("_FORM_GENERIC-ERROR_MESSAGES_", {
          defaultValue: "An error occurred while loading the form.",
        })}
      </StyledError>
    );

  return (
    <Formik
      initialValues={initialFormValues}
      enableReinitialize
      validationSchema={yup.object(validationSchema)}
      onSubmit={submitValues}
    >
      {(formikProps: FormikProps<SelectionFormValues>) => {
        return (
          <Form id="selectionForm" className="aq-mb-4">
            <AvailableDevices />
            <SelectionFormFields genderOptions={genderOptions} />
            <Button
              className="aq-mt-3 aq-mb-1"
              type="primary"
              htmlType="submit"
              size="block"
              disabled={
                formikProps.isSubmitting ||
                cuf.isLoading ||
                cuf.isFetching ||
                form.isLoading ||
                form.isFetching
              }
              flat
            >
              {t("_FORM_BUTTON_SEND-FORM_", {
                defaultValue: "Send Form and Apply",
              })}
            </Button>
            {showSubmitError && (
              <StyledError>
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
