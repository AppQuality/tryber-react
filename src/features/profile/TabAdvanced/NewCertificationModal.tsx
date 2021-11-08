import { Formik } from "@appquality/appquality-design-system";
import { FormikProps } from "formik";
import { CertificationFields } from "../types";
import NewCertificationModalForm from "./NewCertificationModalForm";
import API from "../../../utils/api";
import userStore from "../../../redux/user";

export const NewCertificationModal = () => {
  const { refresh } = userStore();
  return (
    <Formik
      initialValues={{ institute: "", area: "", certificationId: "" }}
      onSubmit={(values) => {
        console.log(values);
        API.addCertification({
          certification_id: parseInt(values.certificationId),
          achievement_date: "2021-11-10",
        })
          .then(() => {
            refresh();
            //TODO: ADD good event message
          })
          .catch((e) => {
            console.log(e);
          });
      }}
    >
      {(formikProps: FormikProps<CertificationFields>) => {
        return <NewCertificationModalForm values={formikProps.values} />;
      }}
    </Formik>
  );
};
