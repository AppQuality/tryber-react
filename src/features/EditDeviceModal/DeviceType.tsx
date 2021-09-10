import { Laptop, Phone, Tablet, Tv } from "react-bootstrap-icons";
import styled from "styled-components";
import { Field } from "formik";

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
          <label htmlFor="0">
            <Field type="radio" id="0" name="device-type" value="0" />
            <Phone className="aq-mb-3" /> Smartphone
          </label>
        </div>
        <div className="device-radio aq-p-3">
          <label htmlFor="2">
            <Field type="radio" id="2" name="device-type" value="2" />
            <Laptop className="aq-mb-3" /> Computer
          </label>
        </div>
        <div className="device-radio aq-p-3">
          <label htmlFor="1">
            <Field type="radio" id="1" name="device-type" value="1" />
            <Tablet className="aq-mb-3" /> Tablet
          </label>
        </div>
        <div className="device-radio aq-p-3">
          <label htmlFor="5">
            <Field type="radio" id="5" name="device-type" value="5" />
            <Tv className="aq-mb-3" /> Smart TV & TV Box
          </label>
        </div>
      </StyledDeviceBurrito>
    </>
  );
};

export default DeviceType;
