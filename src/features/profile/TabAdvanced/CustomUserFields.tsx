import { Accordion } from "@appquality/appquality-design-system";
import React, { useEffect, useState } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { getCustomUserFields } from "src/redux/user/actions/getCustomUserFields";
import CufField from "./CufField";
import { operations } from "src/utils/schema";

export const CustomUserFields = () => {
  const dispatch = useDispatch();
  const {
    customUserFields,
  }: {
    customUserFields?: operations["get-customUserFields"]["responses"]["200"]["content"]["application/json"];
  } = useSelector(
    (state: GeneralState) => ({
      customUserFields: state.user.customUserFields,
    }),
    shallowEqual
  );
  const [groupOfFieldsWithoutGroup, setGroupOfFieldsWithoutGroup] = useState<
    typeof customUserFields
  >([]);
  const [groupsOfFields, setGroupOfFields] = useState<typeof customUserFields>(
    []
  );

  useEffect(() => {
    setGroupOfFieldsWithoutGroup(
      customUserFields?.filter((g) => g.group.id === 0)
    );
    setGroupOfFields(customUserFields?.filter((g) => g.group.id !== 0));
  }, [customUserFields]);

  useEffect(() => {
    dispatch(getCustomUserFields());
  }, []);

  return (
    <div className="aq-mb-3">
      {/*foreach Others CUF add field input*/}
      {groupOfFieldsWithoutGroup?.map((group) =>
        group.fields?.map((field) => (
          <CufField cufField={field} key={`cuf_${field.id}`} />
        ))
      )}
      <Accordion initialActive="">
        {groupsOfFields?.map(
          (cufGroup) =>
            // create an accordion Item foreach
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
