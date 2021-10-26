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
  countryCode?: string; // IT,
  provinceCode?: string; // MI,
  city?: string; //"Riomaggiore",
  street?: string; //"Via dell' Amore",
  zipCode?: string; //"19017"
  fiscalTypeRadio?: "non-italian" | "italian";
  fiscalTypeSelect?: "witholding" | "witholding-extra" | "other";
  type?: "non-italian" | "witholding" | "witholding-extra" | "other";
  birthPlaceCity?: string;
  birthPlaceProvince?: string;
  fiscalId?: string;
  fiscalStatus?: "Verified" | "Unverified";
  gender?: "male" | "female";
};
