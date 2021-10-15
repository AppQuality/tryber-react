import DeviceIcon from "../DeviceIcon";
import styled from "styled-components";
import { Field } from "formik";

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
    <label htmlFor={`${name}-${value}`} className="aq-text-center">
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
              checked={field.value === value}
              defaultValue={value}
              onChange={(e) => {
                form.setValues(
                  {
                    device_type: parseInt(e.target.value),
                    manufacturer: "",
                    model: "",
                    device: 0,
                    operating_system_id: 0,
                    operating_system_platform: "",
                    operating_system_version: "",
                  },
                  true
                );
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
            <DeviceIcon device_type={2} className="aq-mb-3" showText />
          </RadioInput>
        </div>
        <div className="device-radio aq-p-3">
          <RadioInput name="device_type" value={0}>
            <DeviceIcon device_type={0} className="aq-mb-3" showText />
          </RadioInput>
        </div>
        <div className="device-radio aq-p-3">
          <RadioInput name="device_type" value={1}>
            <DeviceIcon device_type={1} className="aq-mb-3" showText />
          </RadioInput>
        </div>
        <div className="device-radio aq-p-3">
          <RadioInput name="device_type" value={5}>
            <DeviceIcon device_type={5} className="aq-mb-3" showText />
          </RadioInput>
        </div>
      </StyledDeviceBurrito>
    </>
  );
};

export default DeviceType;
