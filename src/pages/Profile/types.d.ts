import { SelectType } from "@appquality/appquality-design-system";
export interface BaseFields {
  name: string;
  surname: string;
  gender: string;
  birthDate: string;
  phone: string;
  email: string;
  country: string;
  countryCode?: string;
  city: SelectType.Option;
  languages: SelectType.Option[];
}

export interface CertificationFields {
  institute: string;
  area: string;
  certificationId: string;
}
export interface UserCertification {
  id: number;
  name?: string;
  area?: string;
  institute?: string;
  achievement_date: string;
}
