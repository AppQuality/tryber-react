type CertificationsRadio = "" | "false" | "true";
type Certifications = {
  id: number;
  name: string;
  area: string;
  institute: string;
  achievement_date: string;
}[];

export interface AdvancedFormValues {
  employment: SelectOptionType;
  education: SelectOptionType;
  certificationsRadio: CertificationsRadio;
  certifications: Certifications;
  [key: string]: string | object | object[];
}
