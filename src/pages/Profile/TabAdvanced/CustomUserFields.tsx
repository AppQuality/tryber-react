import { Accordion, Skeleton } from "@appquality/appquality-design-system";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useGetCustomUserFieldsQuery } from "src/services/tryberApi";
import CufField from "./CufField";

export const CustomUserFields = () => {
  const { i18n } = useTranslation();
  const { data: customUserFields } = useGetCustomUserFieldsQuery();

  const [isLoading, setIsLoading] = useState(true);
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
    if (customUserFields?.length) setIsLoading(false);
  }, [customUserFields]);

  if (isLoading)
    return (
      <div className="aq-mb-3">
        <Skeleton>
          <div className="aq-mb-3">
            <Skeleton.Item
              className="aq-mb-3"
              width="200px"
              height="1.5rem"
            ></Skeleton.Item>
            <Skeleton.Item width="100%" height="3rem"></Skeleton.Item>
          </div>
          <div className="aq-mb-3">
            <Skeleton.Item
              className="aq-mb-3"
              width="200px"
              height="1.5rem"
            ></Skeleton.Item>
            <Skeleton.Item width="100%" height="3rem"></Skeleton.Item>
          </div>
        </Skeleton>
      </div>
    );
  return (
    <div className="aq-mb-3">
      {/*foreach Others CUF add field input*/}
      {groupOfFieldsWithoutGroup?.map((group) =>
        group.fields?.map((field) => (
          <CufField cufField={field} key={`cuf_${field.id}`} />
        ))
      )}
      <Accordion initialActive="">
        {groupsOfFields?.map((cufGroup) => {
          const groupName = cufGroup.group.name[
            i18n.language as SupportedLanguages
          ]
            ? cufGroup.group.name[i18n.language as SupportedLanguages]
            : cufGroup.group.name.it || "";
          // create an accordion Item foreach
          return (
            cufGroup.fields && (
              <Accordion.Item
                id={cufGroup.group.id.toString()}
                key={cufGroup.group.id.toString()}
                title={<h4>{groupName}</h4>}
              >
                {/*cufGroups[index] = fields (foreach fields check the type )*/}
                {/*the type can be SELECT || MULTI-SELECT*/}
                {cufGroup.fields.map((field) => {
                  return <CufField cufField={field} key={`cuf_${field.id}`} />;
                })}
              </Accordion.Item>
            )
          );
        })}
      </Accordion>
    </div>
  );
};
