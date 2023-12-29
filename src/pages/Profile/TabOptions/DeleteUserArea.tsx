import {
  BSCol,
  BSGrid,
  Button,
  Text,
  Title,
} from "@appquality/appquality-design-system";
import { Trans, useTranslation } from "react-i18next";
import styled from "styled-components";
import UserStore from "../../../redux/user";
import LeaveCrowd from "./LeaveCrowd";

const DeleteUserAreaGrid = styled.div`
  @media (min-width: ${(props) => props.theme.grid.breakpoints.lg}) {
    display: grid;
    grid-template-columns: 50% 50%;
  }
`;

const DeleteUserArea = () => {
  const { t } = useTranslation();
  const { deletion, user } = UserStore();
  const { openDeleteModal } = deletion;
  return (
    <DeleteUserAreaGrid>
      <div className="aq-mx-3">
        <Title size="xs" className="aq-mb-2">
          {t("Delete your account")}
        </Title>
        <Text className="aq-mb-3">
          <div>
            <Trans
              values={{ testerId: `T${user?.id}` }}
              i18nKey="The deletion of your account ({{testerId}}) <bold>will be irreversible</bold>.<br></br><br></br>You will not be able to continue earning money with us. <br></br>Are you sure you want to leave our community?"
              defaults="The deletion of your account ({{testerId}}) <bold>will be irreversible</bold>.<br></br><br></br>You will not be able to continue earning money with us. <br></br>Are you sure you want to leave our community?"
              components={{ br: <br />, bold: <strong /> }}
            />
          </div>
        </Text>
        <BSGrid>
          <BSCol size="col-12 col-md-6">
            <Button
              flat
              size="block"
              kind="danger"
              onClick={() => {
                openDeleteModal();
              }}
            >
              {t("Delete account")}
            </Button>
          </BSCol>
        </BSGrid>
      </div>
      <div>
        <LeaveCrowd />
      </div>
    </DeleteUserAreaGrid>
  );
};

export default DeleteUserArea;
