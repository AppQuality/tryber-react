import {
  ErrorMessage,
  FieldProps,
  FormLabel,
  Select,
  Text,
} from "@appquality/appquality-design-system";
import { Option } from "@appquality/appquality-design-system/dist/stories/select/_types";
import { Field } from "formik";
import { useEffect, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useGetUsersMeCampaignsByCampaignCompatibleDevicesQuery } from "src/services/tryberApi";
import localizedUrl from "src/utils/localizedUrl";

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

  if (devices.length === 0)
    return (
      <>
        <FormLabel
          htmlFor=""
          label={t("_FORM_LABEL_DEVICES_", { defaultValue: "Devices" })}
        />
        <Text>
          <Text>
            {t("_FORM_MESSAGES_NO-DEVICES_", {
              defaultValue: "No compatible devices found",
            })}
          </Text>
          <Trans
            i18nKey={
              "Available tags : <devices_link> (Link to fiscal devices):::_FORM_MESSAGES_NO-DEVICES_"
            }
            components={{
              devices_link: (
                <a
                  href={localizedUrl(`/personal-equipment/`)}
                  target="_blank"
                />
              ),
            }}
            defaults={
              "Do you have an acceptable device not listed here? <devices_link>Add it to your profile.</devices_link>"
            }
          />
        </Text>
      </>
    );

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
            label={t("_FORM_LABEL_DEVICES_", {
              defaultValue: "Devices",
            })}
            placeholder={t("_FORM_SELECT_DEVICES_", {
              defaultValue: "Select devices",
            })}
            menuTargetQuery="body"
            noOptionsMessage={() => t("__SELECT_DEFAULT_NO_OPTION")}
            isMulti
          />
          <ErrorMessage name={field.name} />
          <Text small>
            <Trans
              i18nKey={
                "Available tags : <devices_link> (Link to fiscal devices):::_FORM_MESSAGES_ADD-DEVICES_"
              }
              components={{
                devices_link: (
                  <a
                    href={localizedUrl(`/personal-equipment/`)}
                    target="_blank"
                  />
                ),
              }}
              defaults={
                "Do you have an acceptable device not listed here? <devices_link>Add it to your profile.</devices_link>"
              }
            />
          </Text>
        </div>
      )}
    </Field>
  );
};
