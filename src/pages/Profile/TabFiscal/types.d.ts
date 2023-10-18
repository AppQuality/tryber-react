interface ProvinceSelectProps {
  name: string;
  label: string;
  onChange?: (v: SelectType.Option) => void;
}

interface TabCommonProps {
  setEdit: Dispatch<SetStateAction<boolean>>;
  inputRef?: Ref<HTMLInputElement>;
}

type FiscalFormValues = {
  name: string;
  surname: string;
  countryCode?: string; // IT,
  province?: string; // MI,
  city?: string; //"Riomaggiore",
  street?: string; //"Via dell' Amore",
  streetNumber?: string; //"1",
  zipCode?: string; //"19017"
  fiscalTypeSelect?:
    | ApiOperations["get-users-me-fiscal"]["responses"]["200"]["content"]["application/json"]["type"]
    | "";
  type?:
    | ApiOperations["get-users-me-fiscal"]["responses"]["200"]["content"]["application/json"]["type"]
    | "";
  birthPlaceId?: string;
  birthPlaceCity?: string;
  birthDate?: string;
  birthPlaceProvince?: string;
  fiscalId?: string;
  fiscalStatus?: "Verified" | "Unverified";
  gender?: "male" | "female" | "";
};
