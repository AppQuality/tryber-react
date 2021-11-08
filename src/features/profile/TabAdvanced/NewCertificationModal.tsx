import { Formik } from "@appquality/appquality-design-system";
import { FormikProps } from "formik";
import { CertificationFields } from "../types";
import NewCertificationModalForm from "./NewCertificationModalForm";
import API from "../../../utils/api";
import userStore from "../../../redux/user";
import siteWideMessageStore from "../../../redux/siteWideMessages";
import modalStore from "../../../redux/modal";
import { useTranslation } from "react-i18next";
import { Title, Text } from "@appquality/appquality-design-system";

export const NewCertificationModal = () => {
  const { refresh } = userStore();
  const { add } = siteWideMessageStore();
  const { close } = modalStore();
  const { t } = useTranslation();
  return (
    <Formik
      initialValues={{ institute: "", area: "", certificationId: "" }}
      onSubmit={async (values) => {
        try {
          const res = await API.addCertification({
            certification_id: parseInt(values.certificationId),
            achievement_date: "2021-11-10",
          });
          refresh("certifications");
          close();
          add({
            message: t("Certification added successfully"),
            type: "success",
          });
        } catch (e) {
          const { message } = e as HttpError;
          const ErrorMessage = (
            <div>
              <Title size="s">
                {t("There was an error adding this certification")}
              </Title>
              <Text>{message}</Text>
            </div>
          );
          add({ message: ErrorMessage, type: "danger" });
        }
      }}
    >
      {(formikProps: FormikProps<CertificationFields>) => {
        return <NewCertificationModalForm values={formikProps.values} />;
      }}
    </Formik>
  );
};
