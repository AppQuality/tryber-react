import { SelectPreselectionField } from "./SelectPreselectionField";
import { MultiPreselectionField } from "./MultiPreselectionField";
import { TextPreselectionField } from "./TextPreselectionField";
import { RadioPreselectionField } from "./RadioPreselectionField";
import { useTranslation } from "react-i18next";

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
    type: "cuf_22",
    options: [1, 2, 3, 4],
    value: [3, 4],
  },
  {
    id: 6,
    question: "Scrivi il tuo username telegram",
    type: "cuf_15",
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
];

export const PreselectionFields = () => {
  const { t } = useTranslation();

  // TODO Cambiare logica e convertire in {label: string, value: string }
  const getSelectOptions = (options?: string[] | number[]) =>
    options?.map((opt) => {
      if (typeof opt === "number") return opt.toString();
      return opt;
    }) || [];

  const getMultiOptions = (options?: string[] | number[]) =>
    options?.map((opt) => {
      if (typeof opt === "number")
        return { value: opt.toString(), label: opt.toString() };
      return { value: opt, label: opt };
    }) || [];

  const getCufType = (type: string) => {
    // TODO
  };

  const genderOptions = [
    { label: t("Gender option:::Female"), value: "female" },
    { label: t("Gender option:::Male"), value: "male" },
    { label: t("Gender option:::Not Specified"), value: "not-specified" },
    { label: t("Gender option:::Other"), value: "other" },
  ];

  return (
    <div>
      {fields.map((field) => {
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
                <SelectPreselectionField
                  key={`${field.id}.city`}
                  name={`questions.${field.id}.city`}
                  label={field.question}
                  placeholder="City"
                  options={["Pesaro"]}
                />
                <SelectPreselectionField
                  key={`${field.id}.country`}
                  name={`questions.${field.id}.country`}
                  placeholder="Country"
                  options={["Italy"]}
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
                    ? [
                        "Male",
                        "Female",
                        "Prefer not to answer",
                        "Non-conforming",
                      ]
                    : getSelectOptions(field.options)
                }
              />
            );
          case "multiselect":
            return (
              <MultiPreselectionField
                key={field.id}
                name={`questions.${field.id}`}
                label={field.question}
                options={getMultiOptions(field.options)}
              />
            );
          case "radio":
            return (
              <RadioPreselectionField
                key={field.id}
                name={`questions.${field.id}`}
                label={field.question}
                options={getSelectOptions(field.options)}
              />
            );
          default:
            return null;
        }
      })}
    </div>
  );
};
