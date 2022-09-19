import {
  FieldProps,
  Select,
  SelectType,
  Text,
} from "@appquality/appquality-design-system";
import { Field, useFormikContext } from "formik";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import API from "src/utils/api";
import OtherDeviceData from "./DeviceDetails/DeviceData/OtherDeviceData";
import PCData from "./DeviceDetails/DeviceData/PCData";
import { DeviceFormInterface } from "./types";

export default ({ edit }: { edit: boolean }) => {
  const { values } = useFormikContext<DeviceFormInterface>();
  const { t, i18n } = useTranslation();
  const [osPlatforms, setOsPlatforms] = useState<SelectType.Option[]>([]);
  const [osVersions, setOsVersions] = useState<SelectType.Option[]>([]);
  const isMobile = window.matchMedia(
    "only screen and (max-width: 768px)"
  ).matches;

  useEffect(() => {
    const getOsPlatforms = async () => {
      const platformsResults = await API.getOsPlatforms({
        deviceType: values.device_type,
        query: {
          filterBy: {
            manufacturer: values.manufacturer,
            model: values.model,
          },
        },
      });
      const options = platformsResults.map((item) => ({
        value: item.name || "",
        label: item.name || "",
      }));
      setOsPlatforms(options);
    };
    const getOsVersions = async () => {
      const versionsResults = await API.getOsVersions({
        deviceType: values.device_type,
        query: {
          filterBy: {
            platform: values.operating_system_platform,
          },
        },
      });
      const options = versionsResults.map((item) => ({
        value: item.id?.toString() || "",
        label: item.name || "",
      }));
      setOsVersions(options);
    };
    if (values.device || values.pc_type) {
      // manufacturer AND model already selected
      // fetch os_platform values
      getOsPlatforms();
      if (values.operating_system_platform !== "") {
        // if the platform has been selected i want the versions
        // fetch os_version
        getOsVersions();
      }
    }
  }, [values]);
  const osGuideUrl =
    i18n.language === "en"
      ? "/miniguide-os-version/"
      : "/it/individuare-la-propria-versione-del-sistema-operativo/";
  return (
    <div>
      {edit ? (
        <Text className="aq-mb-3">
          {t(
            `Here you can only change the version of your operating system. If you want to add another device click on "Add device"`
          )}
        </Text>
      ) : null}
      {values.device_type === 2 ? ( // id of PC device type
        <PCData edit={edit} />
      ) : (
        <OtherDeviceData edit={edit} />
      )}
      <Field name="operating_system_platform">
        {({
          field, // { name, value, onChange, onBlur }
          form,
          meta,
        }: FieldProps) => (
          <div className="aq-mb-3">
            <Select
              name={field.name}
              label={t("Operating system")}
              placeholder={t("Search")}
              isDisabled={edit || (!values.model && !values.pc_type)}
              options={osPlatforms}
              menuTargetQuery="body"
              onChange={(v) => {
                if (v == null) {
                  v = { label: "", value: "" };
                }
                field.onChange(v.value);
                form.setFieldValue(field.name, v.value, true);
                form.setFieldValue("operating_system_version", "", true);
                form.setFieldValue("operating_system_id", 0, true);
              }}
              value={{
                label: field.value,
                value: field.value,
              }}
              noOptionsMessage={() => t("__SELECT_DEFAULT_NO_OPTION")}
              isSearchable={!isMobile}
            />
          </div>
        )}
      </Field>
      <Field name="operating_system_version">
        {/* enabled if the rest is completed */}
        {({
          field, // { name, value, onChange, onBlur }
          form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
          meta,
        }: FieldProps) => (
          <div className="aq-mb-3">
            <Select
              name={field.name}
              isDisabled={!values.operating_system_platform}
              label={t("Operating system version")}
              placeholder={t("Search")}
              options={osVersions}
              value={{
                label: values.operating_system_version || "",
                value: values.operating_system_id?.toString() || "0",
              }}
              menuTargetQuery="body"
              onChange={(v) => {
                if (v == null) {
                  v = { label: "", value: "" };
                }
                field.onChange(v.value);
                const osId = v.value !== "" ? v.value : 0;
                form.setFieldValue("operating_system_version", v.label, true);
                form.setFieldValue("operating_system_id", osId, true);
              }}
              noOptionsMessage={() => t("__SELECT_DEFAULT_NO_OPTION")}
              isSearchable={!isMobile}
            />
            <Text color="info" className="aq-mt-2">
              <a href={osGuideUrl} target="_blank" rel="noreferrer">
                {t("What operating system am i using?")}
              </a>
            </Text>
          </div>
        )}
      </Field>
    </div>
  );
};
