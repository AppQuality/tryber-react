import { Button, Form, Formik } from "@appquality/appquality-design-system";
import { FormikProps } from "formik";
import * as yup from "yup";
import { AvailableDevices } from "./AvailableDevices";
import { PreselectionFields } from "./PreselectionFields";

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

export const PreselectionForm = () => {
  const initialFormValues: PreselectionFormValues = {
    device: [],
    questions: {},
  };

  fields?.forEach((f) => {
    if (!f.value) initialFormValues.questions[f.id] = "";
    else if (typeof f.value === "string")
      initialFormValues.questions[f.id] = f.value;
    else if (f.value && "city" in f.value && "country" in f.value)
      initialFormValues.questions[f.id] = {
        city: f.value.city,
        country: f.value.country,
      };
    // TODO ricavare la label del cuf
    else
      initialFormValues.questions[f.id] = f.value.map((v) => ({
        label: v,
        value: v,
      }));
  });

  const validationSchema = {
    questions: yup.object(),
  };

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
            <PreselectionFields />
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
