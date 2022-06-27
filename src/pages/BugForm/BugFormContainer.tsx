import {
  BSCol,
  BSGrid,
  Button,
  Form,
  Formik,
} from "@appquality/appquality-design-system";
import { shallowEqual, useSelector } from "react-redux";
import { BugDetails } from "src/pages/BugForm/BugDetails/BugDetails";
import * as yup from "yup";
import { FormikProps } from "formik";
import FocusError from "src/pages/BugForm/FocusError/FocusError";
import { useAppDispatch } from "src/redux/provider";
import { FileUploader, MIN_FILES_NUMBER } from "src/pages/BugForm/FileUploader";
import { AdditionalFields } from "src/pages/BugForm/AdditionalFields/AdditionalFields";
import React from "react";
import styled from "styled-components";
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

export const BugFormContainer = () => {
  const { data } = useCampaignData();

  const dispatch = useAppDispatch();

  const { mediaList } = useSelector(
    (state: GeneralState) => state.bugForm,
    shallowEqual
  );

  const initialBugValues: BugFormValues = {
    title: "",
    stepDescription: "1.\n2.\n3.",
    media: [],
    device: 0,
    severity: "LOW",
    type: "TYPO",
    replicability: "ONCE",
    usecase: 0,
    expected: "",
    current: "",
    notes: "",
    additional: "",
  };

  const validationSchema = {
    title: yup
      .string()
      .required("This is a required field")
      .matches(
        /\[.+\] - .+/gm,
        "Format should be [Phase / Section] - Briefly Issue description"
      ),
    stepDescription: yup
      .string()
      .required("This is a required field")
      .test(
        "stepDescription",
        "This is a required field",
        (newValue) => newValue !== initialBugValues.stepDescription
      ),
    expected: yup.string().required("This is a required field"),
    current: yup.string().required("This is a required field"),
    media: yup.array().min(MIN_FILES_NUMBER),
  };

  const urls: string[] = [];
  mediaList.forEach((m) => {
    if (m.uploadedFileUrl) urls.push(m.uploadedFileUrl);
  });

  return (
    <Formik
      initialValues={initialBugValues}
      validationSchema={yup.object(validationSchema)}
      onSubmit={async (values, helpers) => {
        dispatch({
          type: "bugForm/setShowError",
          payload: urls.length < MIN_FILES_NUMBER,
        });
        const submitValues: BugFormValues = {
          title: values.title,
          stepDescription: values.stepDescription,
          media: urls,
          device: values.device,
          severity: values.severity,
          type: values.type,
          replicability: values.replicability,
          usecase: values.usecase,
          expected: values.expected,
          current: values.current,
          notes: values.notes,
          additional: values.additional,
        };
        console.info("submitValues", submitValues);
      }}
    >
      {(formikProps: FormikProps<BugFormValues>) => {
        return (
          <StyledForm id="bugForm">
            <BSGrid>
              <BSCol size="col-lg-7" className="aq-mb-3">
                <BugDetails className="aq-mb-3" />
                <Button
                  className="aq-mt-3 hide-mobile"
                  type="primary"
                  htmlType="submit"
                  size="block"
                  flat
                >
                  Submit this bug report
                </Button>
                <FocusError />
              </BSCol>
              <BSCol size="col-lg-5">
                <div className="stick-to-header-lg">
                  {data?.additionalFields ? (
                    <AdditionalFields className="aq-mb-3" />
                  ) : null}
                  <FileUploader />
                  <Button
                    className="aq-mt-3 hide-desktop"
                    type="primary"
                    htmlType="submit"
                    size="block"
                    flat
                  >
                    Submit this bug report
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
