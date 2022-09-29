import { Button, Formik } from "@appquality/appquality-design-system";
import * as yup from "yup";
import { AvailableDevices } from "./AvailableDevices";

export const PreselectionForm = () => {
  const initialFormValues: PreselectionFormValues = {
    device: [],
  };
  const validationSchema = {};

  return (
    <Formik
      initialValues={initialFormValues}
      enableReinitialize
      validationSchema={yup.object(validationSchema)}
      onSubmit={async (values, helpers) => {
        console.log(values);
      }}
    >
      <>
        <AvailableDevices />
        <Button
          className="aq-mt-3 aq-mb-4"
          type="primary"
          htmlType="submit"
          size="block"
          flat
        >
          Send Form and Apply
        </Button>
      </>
    </Formik>
  );
};
