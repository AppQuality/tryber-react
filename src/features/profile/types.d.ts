import { SelectType } from "@appquality/appquality-design-system";
export interface BaseFields {
  name: string;
  surname: string;
  gender: string;
  birthDate: string;
  phone: string;
  email: string;
  country: string;
  city: SelectType.Option;
  languages: SelectType.Option[];
}
