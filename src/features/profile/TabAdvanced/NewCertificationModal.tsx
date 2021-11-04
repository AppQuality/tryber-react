import { Formik } from "@appquality/appquality-design-system";
import { FormikProps } from "formik";
import { CertificationFields } from "../types";
import NewCertificationModalForm from "./NewCertificationModalForm";

export const NewCertificationModal = () => {
  return (
    <Formik
      initialValues={{ institute: "", area: "", certificationId: "" }}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {(formikProps: FormikProps<CertificationFields>) => {
        return <NewCertificationModalForm values={formikProps.values} />;
      }}
    </Formik>
  );
};
