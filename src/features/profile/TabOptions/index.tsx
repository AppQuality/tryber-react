import { Trans, useTranslation } from "react-i18next";
import {
  Button,
  CSSGrid,
  Text,
  Title,
  BSGrid,
  BSCol,
} from "@appquality/appquality-design-system";
import UserStore from "../../../redux/user";
import leaveCrowd from "./assets/leave-crowd.png";
import styled from "styled-components";
import EditPassword from "./EditPassword";
import RequestUserData from "./RequestUserData";
import DeleteUserArea from "./DeleteUserArea";

const Separator = styled.hr`
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid ${(props) => props.theme.colors.disabledElement};
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
