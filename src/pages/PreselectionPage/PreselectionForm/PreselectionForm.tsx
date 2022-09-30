import { Button, Form, Formik } from "@appquality/appquality-design-system";
import { FormikProps } from "formik";
import * as yup from "yup";
import {
  CustomUserFieldsData,
  useGetCustomUserFieldsQuery,
} from "src/services/tryberApi";
import { AvailableDevices } from "./AvailableDevices";
import { PreselectionFields } from "./PreselectionFields";
import { useEffect, useState } from "react";
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

export const PreselectionForm = () => {
  const { t } = useTranslation();
  const { data } = useGetCustomUserFieldsQuery();
  const [cufList, setCufList] = useState<CustomUserFieldsData[]>([]);

  const genderOptions = [
    { label: t("Gender option:::Female"), value: "female" },
    { label: t("Gender option:::Male"), value: "male" },
    { label: t("Gender option:::Not Specified"), value: "not-specified" },
    { label: t("Gender option:::Other"), value: "other" },
  ];

  const initialFormValues: PreselectionFormValues = {
    device: [],
    questions: {},
  };

  const validationSchema = {
    questions: yup.object(),
  };

  fields?.forEach((f) => {
    if (!f.value) initialFormValues.questions[f.id] = "";
    else if (typeof f.value === "string") {
      if (f.type === "gender") {
        initialFormValues.questions[f.id] = genderOptions.find(
          (gender) => f.value === gender.value
        );
      } else initialFormValues.questions[f.id] = f.value;
    } else if (f.value && "city" in f.value && "country" in f.value) {
      initialFormValues.questions[f.id] = {
        city: f.value.city,
        country: f.value.country,
      };
    } else {
      initialFormValues.questions[f.id] = f?.value?.map((v) => {
        const cufId = parseInt(f.type.replace("cuf_", ""));
        const currentCuf = cufList.find((cuf) => cuf.id === cufId);
        const option = currentCuf?.options?.find((option) => v === option.id);
        return {
          label: option?.name || "",
          value: option?.id?.toString() || "",
        };
      });
    }
  });

  useEffect(() => {
    const list: CustomUserFieldsData[] = [];
    data?.forEach((d) => {
      d.fields?.forEach((f) => list.push(f));
    });
    setCufList(list);
  }, [data]);

  return (
    <Formik
      initialValues={initialFormValues}
      enableReinitialize
      validationSchema={yup.object(validationSchema)}
      onSubmit={async (values, helpers) => {
        console.log(values);
      }}
    >
      {(formikProps: FormikProps<PreselectionFormValues>) => {
        return (
          <Form id="preselectionForm">
            <AvailableDevices />
            <PreselectionFields
              genderOptions={genderOptions}
              cufList={cufList}
            />
            <Button
              className="aq-mt-3 aq-mb-4"
              type="primary"
              htmlType="submit"
              size="block"
              disabled={formikProps.isSubmitting}
              flat
            >
              Send Form and Apply
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};
