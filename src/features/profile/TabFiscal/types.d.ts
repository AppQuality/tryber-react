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

interface TabCommonProps {
  setEdit: Dispatch<SetStateAction<boolean>>;
}

type FiscalFormValues = {
  name: string;
  surname: string;
  countryCode?: string; // IT,
  provinceCode?: string; // MI,
  city?: string; //"Riomaggiore",
  street?: string; //"Via dell' Amore",
  streetNumber?: string; //"1",
  zipCode?: string; //"19017"
  fiscalTypeRadio?: "non-italian" | "italian";
  fiscalTypeSelect?: "withholding" | "witholding-extra" | "other" | "";
  type?: "non-italian" | "withholding" | "witholding-extra" | "other" | "";
  birthPlaceId?: string;
  birthPlaceCity?: string;
  birthDate?: string;
  birthPlaceProvince?: string;
  fiscalId?: string;
  fiscalStatus?: "Verified" | "Unverified";
  gender?: "male" | "female" | "";
};
