import { useTranslation } from "react-i18next";
import {
  CSSGrid,
  Form,
  Formik,
  Spinner,
  Text,
  Title,
} from "@appquality/appquality-design-system";
import React from "react";
import { EmploymentSelect } from "../EmploymentSelect";
import * as yup from "yup";
import { EducationSelect } from "../EducationSelect";
import { CustomUserFields } from "./CustomUserFields";
import Certifications from "./Certifications";
import { MapCufValues } from "./MapCufValues";
import { useSelector } from "react-redux";
import { HalfColumnButton } from "src/pages/profile/HalfColumnButton";
import { FormikValues } from "formik";

const TabAdvanced = () => {
  const { t } = useTranslation();
  const { initialUserValues, validationSchema } = MapCufValues();
  const isLoading = useSelector(
    (state: GeneralState) => state.user.loadingProfile
  );

  function getCufToSave(values: FormikValues) {
    const cufToSave: any = [];
    Object.keys(values).forEach((key) => {
      //key == cuf_n, certifications, certificationRadio, education, employment
      if (key.includes("cuf_")) {
        // case: text { id: 1, values: {value:'suca'}}
        if (typeof values[key] === "string") {
          cufToSave.push({
            id: key.split("_")[1].toString(),
            values: { value: values[key] },
          });
        }
        //case: multiselect
        else if (Array.isArray(values[key])) {
          let fieldMultiselect: {
            id: string;
            values: { value: string; is_candidate?: boolean }[];
          };
          fieldMultiselect = { id: "", values: [] };
          fieldMultiselect.id = key.split("_")[1].toString();
          values[key].forEach((multiSelectOption: any) => {
            multiSelectOption.hasOwnProperty("is_candidate")
              ? fieldMultiselect.values.push({
                  value: multiSelectOption.value,
                  is_candidate: multiSelectOption.is_candidate,
                })
              : fieldMultiselect.values.push({
                  value: multiSelectOption.value,
                });
          });
          cufToSave.push(fieldMultiselect);
        } else {
          // case: select
          let fieldSelect: {
            id: string;
            values: { value: string; is_candidate?: boolean };
          };
          fieldSelect = { id: "", values: { value: "" } };
          fieldSelect.id = key.split("_")[1].toString();
          values[key].hasOwnProperty("is_candidate")
            ? (fieldSelect.values = {
                value: values[key].value,
                is_candidate: values[key].is_candidate,
              })
            : (fieldSelect.values = {
                value: values[key].value,
              });
          cufToSave.push(fieldSelect);
        }
      }
    });
  }

  if (isLoading) return <Spinner />;
  return (
    <Formik
      enableReinitialize
      initialValues={initialUserValues}
      validationSchema={yup.object(validationSchema)}
      onSubmit={(values) => {
        getCufToSave(values);
      }}
    >
      {(formikProps) => (
        <Form id="advancedProfileForm" className="aq-m-3">
          <CSSGrid gutter="50px" rowGap="1rem" min="220px">
            <div className="employment">
              <Title size="s">{t("Employment")}</Title>
              <EmploymentSelect name="employment" label={t("Profession")} />
              <EducationSelect name="education" label={t("Education level")} />
              <Title size="xs">{t("Certifications")}</Title>
              <Certifications />
            </div>
            <div className="address">
              <Title size="s">{t("Additional fields")}</Title>
              <Text>
                {t(
                  "Improve your chances of being selected in test campaigns by completing your profile."
                )}
              </Text>
              <CustomUserFields />
              {formikProps.errors && (
                <Text color="danger" small>
                  <ul style={{ listStyle: "disc" }}>
                    {Object.entries(formikProps.errors).map((value) => (
                      <li>{value}</li>
                    ))}
                  </ul>
                </Text>
              )}
              <CSSGrid min="50%" gutter="0" fill={true}>
                <HalfColumnButton
                  type="success"
                  htmlType="submit"
                  flat={true}
                  disabled={false}
                >
                  {t("Save")}
                </HalfColumnButton>
              </CSSGrid>
            </div>
          </CSSGrid>
        </Form>
      )}
    </Formik>
  );
};

export default TabAdvanced;
