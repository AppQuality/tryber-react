import { SelectPreselectionField } from "./SelectPreselectionField";
import { MultiPreselectionField } from "./MultiPreselectionField";
import { TextPreselectionField } from "./TextPreselectionField";
import { RadioPreselectionField } from "./RadioPreselectionField";
import { AddressFields } from "./AddressFields";
import countries from "i18n-iso-countries";
import { Option } from "@appquality/appquality-design-system/dist/stories/select/_types";
import { CustomUserFieldsData } from "src/services/tryberApi";

type PreselectionField = {
  id: number;
  question: string;
  type: string; // "text" | "select" | "multiselect" | "radio" | "gender" | "address" | "phone_number" | "cuf_22"
  options?: string[] | number[];
  value?: number[] | string | { city: string; country: string };
  validation?: { regex: string; error?: string };
};

const fields: PreselectionField[] = [
  {
    id: 1,
    question: "Come si chiama il tuo cane?",
    type: "text",
  },
  {
    id: 2,
    question: "Il tuo cane si chiama pippo?",
    type: "radio",
    options: ["Sì", "No"],
  },
  {
    id: 3,
    question: "Di che razza è il tuo cane?",
    type: "select",
    options: [
      "ALANO TIGRATO",
      "ALASKAN MALAMUTE",
      "ALPENLAENDISCHE DACHSBRACKE",
      "AMSTAFF",
    ],
  },
  {
    id: 4,
    question: "Che vaccinazioni ha fatto il tuo cane?",
    type: "multiselect",
    options: ["Cimurro", "Parvovirus", "Adenovirus"],
  },
  {
    id: 5,
    question: "Con quali banche hai un conto?",
    type: "cuf_4",
    options: [299, 300, 301, 302],
    value: [300, 302],
  },
  {
    id: 6,
    question: "Scrivi il tuo username telegram",
    type: "cuf_22",
    value: "@pippo",
    validation: {
      regex: "^@[a-zA-Z]*$",
      error: "Inserire l'utente telegram in questo formato: @pippo",
    },
  },
  {
    id: 7,
    question: "Con che genere ti identifichi?",
    type: "gender",
    value: "male",
  },
  {
    id: 8,
    question: "Qual è il tuo numero di telefono",
    type: "phone_number",
    value: "+33123456789",
    validation: {
      regex: "^\\+?[0-9]{12,14}$",
    },
  },
  {
    id: 9,
    question: "Dove abiti?",
    type: "address",
    value: {
      city: "Pesaro",
      country: "Italy",
    },
  },
  {
    id: 10,
    question: "Quanti sono i componenti del tuo nucleo familiare?",
    type: "cuf_12",
    options: [217, 218, 219, 220, 221, 222],
    value: [217],
  },
];

interface PreselectionFieldsProps {
  genderOptions: Option[];
  cufList: CustomUserFieldsData[];
}

export const PreselectionFields = ({
  genderOptions,
  cufList,
}: PreselectionFieldsProps) => {
  const getCufId = (type: string) => parseInt(type.replace("cuf_", ""));

  const getCufType = (type: string) =>
    cufList?.find((cuf) => cuf.id === getCufId(type))?.type;

  const getSelectOptions = (type: string, options?: string[] | number[]) =>
    options?.map((opt) => {
      if (typeof opt === "number") {
        const currentCuf = cufList.find((cuf) => cuf.id === getCufId(type));
        const option = currentCuf?.options?.find((option) => opt === option.id);
        return {
          label: option?.name || "",
          value: option?.id?.toString() || "",
        };
      }
      return { label: opt, value: opt };
    }) || [];

  const getRadioOptions = (options?: string[] | number[]) => {
    const radioOptions: string[] = [];
    options?.forEach((opt) => {
      typeof opt === "string" && radioOptions.push(opt);
    });
    return radioOptions;
  };

  const getCountryCode = (value?: any) => {
    if ("country" in value) return countries.getAlpha2Code(value.country, "en");
    return "";
  };

  return (
    <div>
      {fields?.map((field) => {
        const fieldType = field.type.startsWith("cuf_")
          ? getCufType(field.type)
          : field.type;
        switch (fieldType) {
          case "text":
          case "phone_number":
            return (
              <TextPreselectionField
                key={field.id}
                name={`questions.${field.id}`}
                label={field.question}
                validation={field.validation?.regex}
                errorMessage={field.validation?.error}
              />
            );
          case "address":
            return (
              <>
                <AddressFields
                  key={field.id}
                  label={field.question}
                  countryField={`questions.${field.id}.country`}
                  cityField={`questions.${field.id}.city`}
                  countryCode={getCountryCode(field.value)}
                />
              </>
            );
          case "select":
          case "gender":
            return (
              <SelectPreselectionField
                key={field.id}
                name={`questions.${field.id}`}
                label={field.question}
                options={
                  fieldType === "gender"
                    ? genderOptions
                    : getSelectOptions(field.type, field.options)
                }
              />
            );
          case "multiselect":
            return (
              <MultiPreselectionField
                key={field.id}
                name={`questions.${field.id}`}
                label={field.question}
                options={getSelectOptions(field.type, field.options)}
              />
            );
          case "radio":
            return (
              <RadioPreselectionField
                key={field.id}
                name={`questions.${field.id}`}
                label={field.question}
                options={getRadioOptions(field.options)}
              />
            );
          default:
            return null;
        }
      })}
    </div>
  );
};
