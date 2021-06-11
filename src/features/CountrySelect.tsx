import { Select, SelectType } from "@appquality/appquality-design-system";
import { useState } from "react";

const CountrySelect = ({
  name,
  initialValue,
  onChange,
}: {
  name: string;
  initialValue: SelectType.Option;
  onChange: (v: SelectType.Option) => void;
}) => {
  const [value, setValue] = useState(initialValue);
  const options = [
    { label: "ciao", value: "ciao" },
    { label: "miao", value: "miao" },
  ];

  return (
    <Select
      name={name}
      label="Country"
      value={value}
      onChange={(v) => {
        onChange(v);
        setValue(v);
      }}
      options={options}
    />
  );
};

export default CountrySelect;
