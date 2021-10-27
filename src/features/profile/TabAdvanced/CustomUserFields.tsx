import {
  Field,
  Accordion,
  Formik,
  Form,
} from "@appquality/appquality-design-system";
import API from "../../../utils/api";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { operations } from "../../../utils/schema";
import * as yup from "yup";
import { shallowEqual, useSelector } from "react-redux";
import CufField from "./CufField";

export const CustomUserFields = () => {
  const {
    additional,
  }: {
    additional: UserData["additional"];
  } = useSelector(
    (state: GeneralState) => ({
      additional: state.user.user?.additional,
    }),
    shallowEqual
  );
  const [cufGroups, setCufGroups] = useState<
    operations["get-customUserFields"]["responses"]["200"]["content"]["application/json"]
  >([]);
  const { t } = useTranslation();
  const initialUserValues: { [key: string]: string | object | object[] } = {};
  const validationSchema: { [key: string]: yup.AnySchema } = {};
  useEffect(() => {
    const getCUF = async () => {
      try {
        const groups = await API.customUserFields({});
        setCufGroups(groups);
      } catch (e) {
        console.log(e);
      }
    };
    getCUF();
  }, []);
  cufGroups.forEach((group) => {
    if (group.fields)
      group.fields.forEach((field) => {
        switch (field.type) {
          case "multiselect":
            const multiselectValue = additional?.filter(
              (cuf: UserData["additional"][0]) => cuf.field_id === field.id
            );
            validationSchema["cuf_" + field.id] = yup.array(yup.object());
            initialUserValues["cuf_" + field.id] = multiselectValue
              ? multiselectValue
              : [];
            break;
          case "select":
            const selectValue = additional.find(
              (cuf: UserData["additional"][0]) => cuf.field_id === field.id
            );
            validationSchema["cuf_" + field.id] = yup.object();
            initialUserValues["cuf_" + field.id] = selectValue
              ? selectValue
              : {};
            break;
          case "text":
            const textValue = additional.find(
              (cuf: UserData["additional"][0]) => cuf.field_id === field.id
            );
            initialUserValues["cuf_" + field.id] = textValue
              ? textValue.value
              : "";
            const formatData = field.format ? field.format.split(";") : false;
            const format = formatData ? new RegExp(formatData[0]) : false;
            const formatMessage =
              formatData && formatData.length > 1
                ? formatData[1]
                : t("Invalid format");
            validationSchema["cuf_" + field.id] = format
              ? yup.string().matches(format, formatMessage)
              : yup.string();
            break;
        }
      });
  });
  console.log(initialUserValues);
  console.log(validationSchema);
  const groupOfFieldsWithoutGroup = cufGroups.find((g) => g.group.id === 0);
  let fieldsWithoutGroup: typeof cufGroups[0]["fields"] = [];
  if (groupOfFieldsWithoutGroup) {
    fieldsWithoutGroup = groupOfFieldsWithoutGroup.fields;
  }

  const groupsOfFields = cufGroups.filter((g) => g.group.id !== 0);
  return (
    <Formik
      enableReinitialize
      initialValues={initialUserValues}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      <Form>
        {/*foreach Others CUF add field input*/}
        {fieldsWithoutGroup &&
          fieldsWithoutGroup.map((field) => (
            <CufField cufField={field} key={`cuf_${field.id}`} />
          ))}

        <Accordion initialActive="">
          {groupsOfFields &&
            groupsOfFields.map(
              (cufGroup) =>
                // create an accordion Item forach
                cufGroup.fields && (
                  <Accordion.Item
                    id={cufGroup.group.id.toString()}
                    title={<h4>{cufGroup.group.name.it}</h4>}
                  >
                    {/*cufGroups[index] = fields (foreach fields check the type )*/}
                    {/*the type can be SELECT || MULTI-SELECT*/}
                    {cufGroup.fields.map((field) => {
                      return (
                        <CufField cufField={field} key={`cuf_${field.id}`} />
                      );
                    })}
                  </Accordion.Item>
                )
            )}
        </Accordion>
      </Form>
    </Formik>
  );
};
