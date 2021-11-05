import { UserCertification } from "../types";

type CertificationsRadio = "" | "false" | "true";

export interface AdvancedFormValues {
  employment: SelectOptionType;
  education: SelectOptionType;
  certificationsRadio: CertificationsRadio;
  certifications: UserCertification[];
  [key: string]: string | object | object[];
}
