import {
  Field,
  FormGroup,
  FormikField,
  Select,
  SelectType,
  Accordion,
} from "@appquality/appquality-design-system";
import { FieldProps } from "formik";
import API from "../../utils/api";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { array } from "yup";
import { operations } from "../../utils/schema";
export const CustomUserFields = ({ user }: UserData) => {
  const [cufGroups, setCufGroups] = useState<
    operations["get-customUserFields"]["responses"]["200"]["content"]["application/json"]
  >([]);
  const [cufOther, setCufOther] = useState<any>([]);
  const [cufAccordions, setCufAccordions] = useState<any>([]);
  const { t } = useTranslation();
  const userCuf = user?.addtional;
  useEffect(() => {
    const getCUF = async () => {
      const groups = await API.customUserFields({});
      setCufGroups(groups);
    };
    getCUF();
  }, []);
  const groupOfFieldsWithoutGroup = cufGroups.find((g) => g.group.id === 0);
  let fieldsWithoutGroup: typeof cufGroups[0]["fields"] = [];
  if (groupOfFieldsWithoutGroup) {
    fieldsWithoutGroup = groupOfFieldsWithoutGroup.fields;
  }
  const groupsOfFields = cufGroups.filter((g) => g.group.id !== 0);
  return (
    <>
      {/*foreach Others CUF add field input*/}
      {fieldsWithoutGroup &&
        fieldsWithoutGroup.map((field) => (
          // <CufField key... type={field.type}
          <Field
            key={field.id}
            name={`cufOther.${field.id}`}
            type="text"
            label={field.placeholder?.it}
            placeholder={field.placeholder?.it}
          />
        ))}

      <Accordion initialActive="item1">
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
                    return <p>{field.type}</p>;
                  })}
                </Accordion.Item>
              )
          )}
      </Accordion>
    </>
  );
};
