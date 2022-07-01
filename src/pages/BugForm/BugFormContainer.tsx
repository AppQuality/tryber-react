import {
  BSCol,
  BSGrid,
  Button,
  Form,
  Formik,
} from "@appquality/appquality-design-system";
import { BugDetails } from "src/pages/BugForm/BugDetails/BugDetails";
import * as yup from "yup";
import { FormikProps } from "formik";
import FocusError from "src/pages/BugForm/FocusError/FocusError";
import { FileUploader } from "src/pages/BugForm/FileUploader";
import { AdditionalFields } from "src/pages/BugForm/AdditionalFields";
import React from "react";
import styled from "styled-components";
import useCampaignData from "./useCampaignData";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../store";
import { usePostUsersMeCampaignsByCampaignIdBugsMutation } from "../../services/tryberApi";

const StyledForm = styled(Form)`
  .hide-mobile {
    display: none;
    @media (min-width: ${(p) => p.theme.grid.breakpoints.lg}) {
      display: initial;
    }
  }
  .hide-desktop {
    @media (min-width: ${(p) => p.theme.grid.breakpoints.lg}) {
      display: none;
    }
  }
`;

const now = new Date();

export const BugFormContainer = () => {
  const { data } = useCampaignData();
  const { t } = useTranslation();
  const { mediaList } = useAppSelector((state) => state.bugForm);
  const [submitForm] = usePostUsersMeCampaignsByCampaignIdBugsMutation();

  if (!data) return null;

  const initialBugValues: BugFormValues = {
    title: "",
    stepDescription: "1.\n2.\n3.",
    media: [],
    device: "",
    severity: "",
    type: "",
    replicability: "",
    useCase: "",
    expected: "",
    current: "",
    notes: "",
    additional: {},
    date: now,
    time: now,
  };

  data.additionalFields?.forEach(
    (f) => (initialBugValues.additional[f.slug] = "")
  );

  const validationSchema = {
    title: yup.string().required(t("This is a required field")),
    severity: yup.string().required(t("This is a required field")),
    device: yup.string().required(t("This is a required field")),
    replicability: yup.string().required(t("This is a required field")),
    useCase: yup.string().required(t("This is a required field")),
    stepDescription: yup
      .string()
      .required(
        t("BUGFORM_BUGDTLS_STEPBYSTEP_ERROR", "This is a required field")
      )
      .test(
        "stepDescription",
        t("BUGFORM_BUGDTLS_STEPBYSTEP_ERROR", "This is a required field"),
        (newValue) => newValue !== initialBugValues.stepDescription
      ),
    type: yup
      .string()
      .required(t("BUGFORM_BUGDTLS_TYPE_ERROR", "This is a required field")),
    expected: yup.string().required(t("This is a required field")),
    current: yup.string().required(t("This is a required field")),
    media: yup.array().min(
      data?.minimumMedia || 0,
      t(
        "Media field must have at least {{num}} items:::BUGFORM_UPLOAD_ERROR_MINIMUMFILES",
        {
          defaultValue: "Media field must have at least {{num}} items",
          num: data?.minimumMedia || 0,
        }
      )
    ),
    additional: yup.object(),
  };
  if (data.titleRule) {
    validationSchema.title = validationSchema.title.matches(
      /\[.+\] - .+/gm,
      t(
        "BUGFORM_BUGDTLS_BUGTITLE_ERROR",
        "Format should be [Phase / Section] - Briefly Issue description"
      )
    );
  }

  const urls: string[] = [];
  mediaList.forEach((m) => {
    if (m.uploadedFileUrl) urls.push(m.uploadedFileUrl);
  });

  const postForm = async ({
    title,
    stepDescription,
    expected,
    current,
    severity,
    replicability,
    type,
    notes,
    useCase,
    device,
    media,
    additional,
    date,
    time,
  }: BugFormValues) => {
    const additionalKeys = Object.keys(additional);
    const serverAdditional = additionalKeys.map((k) => {
      return {
        slug: k,
        value: additional[k],
      };
    });
    const serverDate = new Date(
      Date.UTC(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        time.getHours(),
        time.getMinutes()
      )
    ).toISOString();

    if (severity !== "" && replicability !== "" && type !== "") {
      submitForm({
        campaignId: data.id.toString(),
        body: {
          title,
          description: stepDescription,
          expected,
          current,
          severity,
          replicability,
          type,
          notes,
          usecase: Number(useCase),
          device: Number(device),
          media: media,
          additional: serverAdditional,
        },
      });
    }
  };

  return (
    <Formik
      initialValues={initialBugValues}
      enableReinitialize
      validationSchema={yup.object(validationSchema)}
      onSubmit={async (values, helpers) => {
        const submitValues: BugFormValues = {
          title: values.title,
          stepDescription: values.stepDescription,
          media: urls,
          device: values.device,
          severity: values.severity,
          type: values.type,
          replicability: values.replicability,
          useCase: values.useCase,
          expected: values.expected,
          current: values.current,
          notes: values.notes,
          additional: values.additional,
          date: values.date,
          time: values.time,
        };
        postForm(submitValues);
      }}
    >
      {(formikProps: FormikProps<BugFormValues>) => {
        return (
          <StyledForm id="bugForm">
            <BSGrid>
              <BSCol size="col-lg-7">
                <BugDetails className="aq-mb-3" />
                <Button
                  className="hide-mobile"
                  type="primary"
                  htmlType="submit"
                  size="block"
                  flat
                >
                  {t("BUGFORM_CTA_SUBMIT", {
                    defaultValue: "Submit this bug report",
                  })}
                </Button>
                <FocusError />
              </BSCol>
              <BSCol size="col-lg-5">
                <div className="stick-to-header-lg">
                  {data?.additionalFields && (
                    <AdditionalFields className="aq-mb-3" />
                  )}
                  <FileUploader />
                  <Button
                    className="aq-mt-3 hide-desktop"
                    type="primary"
                    htmlType="submit"
                    size="block"
                    flat
                  >
                    {t("BUGFORM_CTA_SUBMIT", {
                      defaultValue: "Submit this bug report",
                    })}
                  </Button>
                </div>
              </BSCol>
            </BSGrid>
          </StyledForm>
        );
      }}
    </Formik>
  );
};
