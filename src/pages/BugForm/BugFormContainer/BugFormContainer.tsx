import { Button, Form, Formik } from "@appquality/appquality-design-system";
import { shallowEqual, useSelector } from "react-redux";
import { FileUploader } from "./FileUploader";

export const BugFormContainer = () => {
  const initialBugValues: BugFormValues = {
    media: [],
  };

  const { mediaList } = useSelector(
    (state: GeneralState) => state.bugForm,
    shallowEqual
  );

  const urls: string[] = [];
  mediaList.forEach((m) => {
    if (m.uploadedFileUrl) urls.push(m.uploadedFileUrl);
  });

  return (
    <Formik
      initialValues={initialBugValues}
      onSubmit={async (values, helpers) => {
        const submitValues: BugFormValues = {
          media: urls,
        };
      }}
    >
      <Form id="bugForm">
        <FileUploader />
        <Button
          className="aq-mt-2"
          type="primary"
          htmlType="submit"
          size="block"
          disabled={urls.length < 2}
          flat
        >
          Submit
        </Button>
      </Form>
    </Formik>
  );
};
