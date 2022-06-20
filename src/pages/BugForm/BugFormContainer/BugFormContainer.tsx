import { Button, Form, Formik } from "@appquality/appquality-design-system";
import { shallowEqual, useSelector } from "react-redux";
import { useAppDispatch } from "../../../redux/provider";
import { FileUploader, MIN_FILES_NUMBER } from "./FileUploader";

export const BugFormContainer = () => {
  const dispatch = useAppDispatch();
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
        dispatch({
          type: "bugForm/setShowError",
          payload: urls.length < MIN_FILES_NUMBER,
        });
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
          flat
        >
          Submit
        </Button>
      </Form>
    </Formik>
  );
};
