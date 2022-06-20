import {
  ErrorMessage,
  FieldProps,
  FormikField,
  FormLabel,
} from "@appquality/appquality-design-system";
import styled, { css } from "styled-components";

const InvalidInputStyle = css`
  border-color: ${(p) => p.theme.palette.danger};
`;

const InvalidFocusStyle = css`
  border-color: ${(p) => p.theme.palette.danger};
  box-shadow: 0 0 0 0.25rem ${(p) => p.theme.colors.red100};
`;

const StyledTextareaField = styled.div<{
  resize?: string;
  isInvalid?: boolean;
  height?: string;
}>`
  textarea {
    width: 100%;
    height: ${(p) => (p.height ? p.height : "5.715rem")};
    resize: ${(p) => (p.resize ? p.resize : "none")};
    padding: 0.5rem 0.75rem;
    color: ${(p) => p.theme.palette.primary};
    font-family: inherit;
    font-size: ${(p) => p.theme.typography.fontSize.base};
    background-color: ${(p) => p.theme.colors.white};
    background-clip: padding-box;
    border: 1px solid ${(p) => p.theme.colors.elementGeneric};
    border-radius: 5px;
    line-height: 1.5;
    box-shadow: none;
    ${(props) => (props.isInvalid ? InvalidInputStyle : "")}

    &:focus,
    &:focus-visible {
      color: ${(p) => p.theme.palette.primary};
      background-color: ${(p) => p.theme.colors.white};
      border-color: ${(p) => p.theme.variants.secondary};
      outline: 0;
      box-shadow: ${(p) => p.theme.general.boxShadow};
      ${(props) => (props.isInvalid ? InvalidFocusStyle : "")}

      &+.input-group-text {
        color: ${(p) => p.theme.palette.secondary};
      }
    }

    &::placeholder {
      color: ${(p) => p.theme.colors.disabledFont};
      opacity: 1;
    }

    &:disabled,
    &[readonly] {
      background-color: ${(p) => p.theme.colors.gray100};
      border-color: transparent;
      cursor: not-allowed;
      opacity: 1;
      color: ${(p) => p.theme.variants.primary};
    }
  }
`;

interface TextareaFieldProps {
  name: string;
  label?: string;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  resize?: "none" | "both" | "horizontal" | "vertical";
  height?: string;
}

export const TextareaField = ({
  name,
  label,
  className,
  placeholder,
  disabled,
  resize,
  height,
}: TextareaFieldProps) => {
  return (
    <FormikField name={name}>
      {({ field, meta }: FieldProps) => {
        return (
          <StyledTextareaField
            className={className}
            resize={resize}
            isInvalid={meta.touched && typeof meta.error == "string"}
            height={height}
          >
            {label && <FormLabel htmlFor={field.name} label={label} />}
            <textarea
              id={field.name}
              name={field.name}
              value={field.value}
              placeholder={placeholder}
              disabled={disabled}
              onChange={(e) => field.onChange(e)}
              onBlur={(e) => field.onBlur(e)}
            />
            <ErrorMessage name={field.name} />
          </StyledTextareaField>
        );
      }}
    </FormikField>
  );
};
