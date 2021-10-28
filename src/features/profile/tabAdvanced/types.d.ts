type CertificationsRadio = "" | "false" | "true";

interface AdvancedFormValues {
  employment: SelectOptionType;
  education: SelectOptionType;
  certificationsRadio: CertificationsRadio;
  certifications: Certification[];
  [key: string]: string | object | object[];
}
