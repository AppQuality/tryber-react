import { useFormikContext, Field } from "formik";
import {
  FieldProps,
  Select,
  SelectType,
} from "@appquality/appquality-design-system";
import { useEffect, useState } from "react";
import PCData from "./DeviceDetails/DeviceData/PCData";
import OtherDeviceData from "./DeviceDetails/DeviceData/OtherDeviceData";
import { useTranslation } from "react-i18next";
import API from "../../utils/api";

export default ({ edit }: { edit: boolean }) => {
  const { values } = useFormikContext<DeviceFormInterface>();
  const { t } = useTranslation();
  const [osPlatforms, setOsPlatforms] = useState<SelectType.Option[]>([]);
  const [osVersions, setOsVersions] = useState<SelectType.Option[]>([]);

  useEffect(() => {
    const getOsPlatforms = async () => {
      const platformsResults = await API.getOsPlatforms({
        deviceType: values.device_type,
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
      });
      // setOsVersions(versionsResults);
      // const options = versionsResults.map(item => ({
      //   value: item.name || '',
      //   label: item.name || ''
      // }));
      // setOsPlatforms(options);
    };
    if (values.device) {
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
  return (
    <div>
      {values.device_type === 2 ? ( // id of PC device type
        <PCData edit={edit} />
      ) : (
        <OtherDeviceData edit={edit} />
      )}
      <Field name="operative_system_platform" disabled={edit}>
        {({
          field, // { name, value, onChange, onBlur }
          form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
          meta,
        }: FieldProps) => (
          <Select
            name={field.name}
            label={t("Operating system")}
            options={osPlatforms}
            value={field.value}
          />
        )}
      </Field>
      <Field name="operative_system_version">
        {/* enabled if the rest is completed */}
        {({
          field, // { name, value, onChange, onBlur }
          form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
          meta,
        }: FieldProps) => (
          <Select
            name={field.name}
            label={t("Operating system version")}
            options={osVersions}
            value={field.value}
          />
        )}
      </Field>
    </div>
  );
};
