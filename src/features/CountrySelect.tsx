import { Select, SelectType } from "@appquality/appquality-design-system";
import { useState, useMemo } from "react";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import countries from "i18n-iso-countries";

const CountrySelect = ({
  name,
  initialValue,
  onChange,
}: {
  name: string;
  initialValue: SelectType.Option;
  onChange: (v: SelectType.Option) => void;
}) => {
  const { t } = useTranslation();
  const [value, setValue] = useState(initialValue);
  const enCountries = countries.getNames("en", { select: "official" });
  const options = useMemo(
    () =>
      Object.entries(
        countries.getNames(i18next.language, { select: "official" })
      ).map(([locale, name]) => ({ label: name, value: enCountries[locale] })),
    []
  );
  return (
    <Select
      name={name}
      label={t("Country")}
      placeholder={t("Select a country")}
      value={value}
      onChange={(v) => {
        if (v == null) {
          v = { label: "", value: "" };
        }
        onChange(v);
        setValue(v);
      }}
      options={options}
    />
  );
};

export default CountrySelect;
