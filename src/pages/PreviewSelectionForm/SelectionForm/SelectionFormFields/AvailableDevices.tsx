import {
  ErrorMessage,
  FieldProps,
  Select,
  Text,
} from "@appquality/appquality-design-system";
import { Option } from "@appquality/appquality-design-system/dist/stories/select/_types";
import { Field } from "formik";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useGetUsersMeCampaignsByCampaignCompatibleDevicesQuery } from "src/services/tryberApi";

export const AvailableDevices = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } =
    useGetUsersMeCampaignsByCampaignCompatibleDevicesQuery(
      { campaign: id },
      { skip: !id }
    );
  const [devices, setDevices] = useState<Option[]>([]);

  useEffect(() => {
    if (data)
      setDevices(
        data.map((d) => {
          const label =
            "manufacturer" in d.device
              ? `${d.device.manufacturer} ${d.device.model} ${d.operating_system.platform} ${d.operating_system.version}`
              : `${d.device.pc_type} ${d.operating_system.platform} ${d.operating_system.version}`;
          return { label, value: d.id?.toString() };
        })
      );
  }, [data]);

  if (isLoading) return <></>;

  return (
    <Field
      name="device"
      validate={(value: Option[]) => {
        if (!value.length) {
          return t("This is a required field");
        }
      }}
    >
      {({ field, form }: FieldProps) => (
        <div className="aq-mb-3">
          <Select
            name={field.name}
            options={devices}
            value={field.value}
            onBlur={() => {
              form.setFieldTouched(field.name);
            }}
            onChange={(v) => {
              if (v === null) {
                v = { label: "", value: "" };
              }
              form.setFieldValue(field.name, v, true);
            }}
            label={"Devices"}
            placeholder={"Select device"}
            menuTargetQuery="body"
            noOptionsMessage={() => t("__SELECT_DEFAULT_NO_OPTION")}
            isMulti
          />
          <ErrorMessage name={field.name} />
          <Text small>
            Do you have an acceptable device not listed here? Add it to your
            profile.
          </Text>
        </div>
      )}
    </Field>
  );
};
