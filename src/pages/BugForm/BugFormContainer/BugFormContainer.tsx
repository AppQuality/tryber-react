import { Button, Form, Formik } from "@appquality/appquality-design-system";
import { shallowEqual, useSelector } from "react-redux";
import { BugDetails } from "./BugDetails/BugDetails";
import { FileUploader } from "./FileUploader";
import * as yup from "yup";
import { FormikProps } from "formik";

export const BugFormContainer = () => {
  const { mediaList } = useSelector(
    (state: GeneralState) => state.bugForm,
    shallowEqual
  );

  const initialBugValues: BugFormValues = {
    title: "",
    description: "",
    media: [],
    device: 0,
    severity: "LOW",
    type: "TYPO",
    replicability: "ONCE",
    usecase: 0,
    expected: "",
    current: "",
    notes: "",
  };

  const validationSchema = {
    title: yup
      .string()
      .required("This is a required field")
      .matches(
        /\[.+\] - .+/gm,
        "Format should be [Phase / Section] - Briefly Issue description"
      ),
    description: yup.string().required("This is a required field"),
    expected: yup.string().required("This is a required field"),
    current: yup.string().required("This is a required field"),
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
        const submitValues: BugFormValues = {
          title: values.title,
          description: values.description,
          media: urls,
          device: values.device,
          severity: values.severity,
          type: values.type,
          replicability: values.replicability,
          usecase: values.usecase,
          expected: values.expected,
          current: values.current,
          notes: values.notes,
        };
        console.info("submitValues", submitValues);
      }}
    >
      {(formikProps: FormikProps<BugFormValues>) => {
        return (
          <Form id="bugForm">
            <BugDetails className="aq-mb-3" />
            <FileUploader />
            <Button
              className="aq-mt-3"
              type="primary"
              htmlType="submit"
              size="block"
              disabled={urls.length < 2 || !formikProps.isValid}
              flat
            >
              Submit this bug report
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};
