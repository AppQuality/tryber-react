import { Button, Formik } from "@appquality/appquality-design-system";
import { FormikProps } from "formik";
import { CertificationFields } from "../types";
import NewCertificationModalForm from "./NewCertificationModalForm";
import modalStore from "src/redux/modal";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { addCertification } from "src/redux/user/actions/addCertification";
import * as yup from "yup";
import React from "react";

export const NewCertificationModal = () => {
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
        institute: yup.string().required(),
        area: yup.string().required(),
        certificationId: yup.string().required(),
        achievementDate: yup.string().required(),
      })}
      onSubmit={async (values) => {
        dispatch(
          addCertification(
            {
              certification_id: parseInt(values.certificationId),
              achievement_date: values.achievementDate,
            },
            <div>
              <div>
                <strong>{t("Certification uploaded correctly.")}</strong>
              </div>
              <div>{t("You can add more in the certifications section")}</div>
            </div>,
            <div>
              <div>
                <strong>
                  {t("There was an error adding this certification.")}
                </strong>
              </div>
              <div>{t("Try again.")}</div>
            </div>
          )
        );
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
        type="success"
        htmlType="submit"
        flat={true}
        disabled={false}
        style={{ minWidth: "150px" }}
      >
        {t("Add")}
      </Button>
    </div>
  );
};
