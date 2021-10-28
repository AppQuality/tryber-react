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
import { MapCufValues } from "./MapCufValues";

export const CustomUserFields = () => {
  const { cufGroups } = MapCufValues();
  const { t } = useTranslation();
  const [groupOfFieldsWithoutGroup, setGroupOfFieldsWithoutGroup] =
    useState<typeof cufGroups[0]>();
  const [groupsOfFields, setGroupOfFields] = useState<typeof cufGroups>([]);

  useEffect(() => {
    setGroupOfFieldsWithoutGroup(cufGroups.find((g) => g.group.id === 0));
    setGroupOfFields(cufGroups.filter((g) => g.group.id !== 0));
  }, [cufGroups]);

  return (
    <div>
      {/*foreach Others CUF add field input*/}
      {groupOfFieldsWithoutGroup?.fields?.map((field) => (
        <CufField cufField={field} key={`cuf_${field.id}`} />
      ))}

      <Accordion initialActive="">
        {groupsOfFields.map(
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
                  return <CufField cufField={field} key={`cuf_${field.id}`} />;
                })}
              </Accordion.Item>
            )
        )}
      </Accordion>
    </div>
  );
};
