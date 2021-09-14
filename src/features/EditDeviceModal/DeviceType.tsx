import { Laptop, Phone, Tablet, Tv } from "react-bootstrap-icons";
import styled from "styled-components";
import { Field, useFormikContext } from "formik";

const RadioInput = ({
  name,
  value,
  children,
}: {
  name: string;
  value: number;
  children: React.ReactNode;
}) => {
  return (
    <label htmlFor={`${name}-${value}`}>
      <Field name={name}>
        {({
          field, // { name, value, onChange, onBlur }
          form,
        }: any) => {
          return (
            <input
              name={field.name}
              id={`${name}-${value}`}
              type="radio"
              checked={field.value == value}
              defaultValue={value}
              onChange={(e) => {
                form.setFieldValue(field.name, parseInt(e.target.value));
              }}
            />
          );
        }}
      </Field>
      {children}
    </label>
  );
};

const StyledDeviceBurrito = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: auto;
  grid-row-gap: ${(props) => props.theme.grid.spacing.default};
  @media (min-width: ${(props) => props.theme.grid.breakpoints.lg}) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  .device-radio {
    position: relative;
    border-radius: ${(props) => props.theme.general.borderRadius};
    input {
      opacity: 0;
      position: absolute;
    }
    input:checked ~ svg {
      color: ${(props) => props.theme.palette.success};
    }
    label {
      display: flex;
      flex-flow: column;
      align-items: center;
      cursor: pointer;

      svg {
        width: 56px;
        height: 56px;
        color: ${(props) => props.theme.palette.secondary};
      }
    }
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        background-color: ${(props) => props.theme.colors.gray200};
      }
    }
  }
`;

const DeviceType = () => {
  return (
    <>
      <StyledDeviceBurrito role="group">
        <div className="device-radio aq-p-3">
          <RadioInput name="device_type" value={2}>
            <Laptop className="aq-mb-3" /> Computer
          </RadioInput>
        </div>
        <div className="device-radio aq-p-3">
          <RadioInput name="device_type" value={0}>
            <Phone className="aq-mb-3" /> Smartphone
          </RadioInput>
        </div>
        <div className="device-radio aq-p-3">
          <RadioInput name="device_type" value={1}>
            <Tablet className="aq-mb-3" /> Tablet
          </RadioInput>
        </div>
        <div className="device-radio aq-p-3">
          <RadioInput name="device_type" value={5}>
            <Tv className="aq-mb-3" /> Smart TV & TV Box
          </RadioInput>
        </div>
      </StyledDeviceBurrito>
    </>
  );
};

export default DeviceType;
