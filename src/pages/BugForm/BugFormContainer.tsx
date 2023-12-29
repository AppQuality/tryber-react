import {
  BSCol,
  BSGrid,
  Button,
  Form,
  Formik,
  Text,
} from "@appquality/appquality-design-system";
import { FormikProps } from "formik";
import i18next from "i18next";
import React, { useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { AdditionalFields } from "src/pages/BugForm/AdditionalFields";
import { BugDetails } from "src/pages/BugForm/BugDetails/BugDetails";
import { FileUploader } from "src/pages/BugForm/FileUploader";
import FocusError from "src/pages/BugForm/FocusError/FocusError";
import { addMessage } from "src/redux/siteWideMessages/actionCreators";
import { usePostUsersMeCampaignsByCampaignIdBugsMutation } from "src/services/tryberApi";
import { useAppDispatch, useAppSelector } from "src/store";
import styled from "styled-components";
import * as yup from "yup";

import { setMediaList } from "./bugFormSlice";
import { dateOrTimeIsFuture } from "./dateOrTimeIsFuture";
import { toISOStringWithTimezone } from "./toIsoStringWithTimezone";
import useCampaignData from "./useCampaignData";

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

let now = new Date();

export const BugFormContainer = () => {
  const { data, device } = useCampaignData();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [disableSubmit, setDisableSubmit] = useState(false);
  const { mediaList } = useAppSelector((state) => state.bugForm);
  const [submitForm] = usePostUsersMeCampaignsByCampaignIdBugsMutation();

  const isPublicPage = useAppSelector(
    (state) => state.publicUserPages.isPublic
  );

  if (!data) return null;

  const initialBugValues: BugFormValues = {
    title: "",
    stepDescription: "1. \n2. \n3. ",
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

  if (device?.length === 1) {
    initialBugValues.device = device[0].id.toString();
  }

  if (isPublicPage) {
    /**
     * In a public page, we don't want to show the usecase selector,
     * so we set it to the default value (not a specific usecase)
     */
    initialBugValues.useCase = "-1";
  }

  data.additionalFields?.forEach(
    (f) => (initialBugValues.additional[f.slug] = "")
  );

  if (localStorage.getItem(data.id.toString())) {
    initialBugValues.additional = JSON.parse(
      localStorage.getItem(data.id.toString()) || "{}"
    );
  }

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
          count: data?.minimumMedia,
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

  const postForm = async (
    {
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
    }: BugFormValues,
    resetForm: () => void
  ) => {
    const additionalKeys = Object.keys(additional);
    const serverAdditional = additionalKeys.map((k) => {
      return {
        slug: k,
        value: additional[k],
      };
    });

    const serverDate = toISOStringWithTimezone(date, time);

    if (severity !== "" && replicability !== "" && type !== "") {
      const res = submitForm({
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
          lastSeen: serverDate,
        },
      });
      res
        .unwrap()
        .then((payload) => {
          dispatch(
            addMessage(
              <Text className="aq-text-primary">
                <strong>
                  {t("BUGFORM_CONFIRMUPLOAD_TITLE", {
                    defaultValue:
                      "The bug you reported has been uploaded successfully!",
                  })}
                </strong>
                {!isPublicPage && (
                  <div>
                    <Trans
                      i18nKey={
                        "Available tags: <bugs_link> (Link to bugs page):::BUGFORM_CONFIRMUPLOAD_TXT"
                      }
                      components={{
                        bugs_link: (
                          <a
                            href={`${
                              i18next.language === "en"
                                ? ""
                                : "/" + i18next.language
                            }/bugs/show/${payload.id}/`}
                            target="_blank"
                            rel="noreferrer"
                          />
                        ),
                      }}
                      defaults="<bugs_link>Go to the Bugs page</bugs_link> to check all the bugs you have uploaded."
                    />
                  </div>
                )}
              </Text>,
              "success",
              false
            )
          );

          localStorage.setItem(data.id.toString(), JSON.stringify(additional));
          now = new Date();
          setDisableSubmit(false);
          resetForm();
          dispatch(setMediaList([]));
          const elements = document.getElementsByTagName("body");
          elements[0].scrollIntoView({ behavior: "smooth", block: "start" });
        })
        .catch((e) => {
          dispatch(
            addMessage(
              <div className="aq-text-primary">
                <strong>
                  {t("BUGFORM_ERRORUPLOADREPORT", {
                    defaultValue:
                      "Something went wrong! Try resubmitting the bug",
                  })}
                </strong>
              </div>,
              "danger",
              false
            )
          );
          setDisableSubmit(false);
        });
    }
  };

  return (
    <Formik
      // hack to prevent blur validation https://github.com/jaredpalmer/formik/issues/2457
      validateOnBlur={false}
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
        if (dateOrTimeIsFuture(submitValues.date, submitValues.time)) {
          dispatch(
            addMessage(
              <div className="aq-text-primary">
                <strong>
                  {t("BUGFORM_ERROR_FUTURE_DATE_OR_TIME", {
                    defaultValue:
                      "You can't upload bug with a future date or future time",
                  })}
                </strong>
              </div>,
              "danger",
              false
            )
          );
          setDisableSubmit(false);
        } else {
          setDisableSubmit(true);
          postForm(submitValues, helpers.resetForm);
        }
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
                  kind="primary"
                  type="submit"
                  size="block"
                  disabled={disableSubmit}
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
                    className="aq-mt-3 hide-desktop aq-mb-4"
                    kind="primary"
                    type="submit"
                    size="block"
                    disabled={disableSubmit}
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
