interface FiscalModalFields {
  country: string;
  countryCode: string;
  province: SelectOptionType;
  provinceCode: string;
  city: string;
  cityCode: string;
  street: string;
}

interface ProvinceSelectProps {
  name: string;
  label: string;
  onChange?: (v: SelectType.Option) => void;
}
