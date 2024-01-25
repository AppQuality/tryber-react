import { Button, Formik } from "@appquality/appquality-design-system";
import { FormikProps } from "formik";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import modalStore from "src/redux/modal";
import { addMessage } from "src/redux/siteWideMessages/actionCreators";
import { usePostUsersMeCertificationsMutation } from "src/services/tryberApi";
import * as yup from "yup";
import { CertificationFields } from "../types";
import NewCertificationModalForm from "./NewCertificationModalForm";

export const NewCertificationModal = () => {
  const [addCertification] = usePostUsersMeCertificationsMutation();
  const { close } = modalStore();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        institute: "",
        area: "",
        certificationId: "",
        achievementDate: "",
      }}
      validationSchema={yup.object({
        institute: yup.string().required(t("Institute is a required field.")),
        area: yup.string().required(t("Area is a required field.")),
        certificationId: yup
          .string()
          .required(t("Certification is a required field.")),
        achievementDate: yup
          .string()
          .required(t("Achievement Date is a required field.")),
      })}
      onSubmit={async (values) => {
        try {
          await addCertification({
            body: {
              certification_id: parseInt(values.certificationId),
              achievement_date: values.achievementDate,
            },
          }).unwrap();

          dispatch(
            addMessage(
              <div>
                <div>
                  <strong>{t("Certification uploaded correctly.")}</strong>
                </div>
                <div>{t("You can add more in the certifications section")}</div>
              </div>,
              "success"
            )
          );
        } catch (e) {
          dispatch(
            addMessage(
              <div>
                <div>
                  <strong>
                    {t("There was an error adding this certification.")}
                  </strong>
                </div>
                <div>{t("Try again.")}</div>
              </div>,
              "danger"
            )
          );
        }
        close();
      }}
    >
      {(formikProps: FormikProps<CertificationFields>) => {
        return <NewCertificationModalForm values={formikProps.values} />;
      }}
    </Formik>
  );
};

export const NewCertificationModalFooter = () => {
  const { t } = useTranslation();
  return (
    <div className="aq-text-right">
      <Button
        kind="primary"
        type="submit"
        flat={true}
        form="newCertificationForm"
        disabled={false}
        style={{ minWidth: "150px" }}
      >
        {t("Add")}
      </Button>
    </div>
  );
};
