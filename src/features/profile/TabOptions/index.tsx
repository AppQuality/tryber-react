import { CSSGrid } from "@appquality/appquality-design-system";
import styled from "styled-components";
import DeleteUserArea from "./DeleteUserArea";
import EditPassword from "./EditPassword";
import RequestUserData from "./RequestUserData";

const Separator = styled.hr`
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid ${(props) => props.theme.colors.elementGeneric};
  margin: 1em 0;
  padding: 0;
`;

const TabOptions = () => {
  return (
    <div className="aq-m-3">
      <CSSGrid gutter="50px" rowGap="1rem" min="220px">
        <EditPassword />
        <RequestUserData />
      </CSSGrid>
      <Separator className="aq-mt-3 aq-mb-3" />
      <DeleteUserArea />
    </div>
  );
};

export default TabOptions;
