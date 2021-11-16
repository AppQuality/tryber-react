import { UserCertification } from "../types";

type CertificationsRadio = "" | "false" | "true";

export interface AdvancedFormValues {
  employment: string;
  education: string;
  certificationsRadio: CertificationsRadio;
  certifications: UserCertification[];
  [key: string]: string | object | object[];
}
