import { useEffect } from "react";
import { useFormikContext } from "formik";

const SelectionFocusError = () => {
  const { errors, isSubmitting, isValidating } = useFormikContext();

  useEffect(() => {
    if (isSubmitting && !isValidating) {
      let keys = Object.keys(errors);
      if (keys.length > 0) {
        keys = keys.filter((k) => k !== "questions");
        const e = errors as any;
        let indexes: number[] = [];
        e.questions?.forEach(
          (q: string, i: number) => q !== undefined && indexes.push(i)
        );
        if (indexes.length) {
          const questionsKeys = indexes.map((i) => `questions.${i}`);
          keys = keys.concat(questionsKeys);
        }
        const selector = `[id="${keys[0]}"]`;
        const errorElement = document.querySelector(selector) as HTMLElement;
        if (errorElement) {
          errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
          errorElement.focus({ preventScroll: true });
        }
      }
    }
  }, [errors, isSubmitting, isValidating]);

  return null;
};

export default SelectionFocusError;
