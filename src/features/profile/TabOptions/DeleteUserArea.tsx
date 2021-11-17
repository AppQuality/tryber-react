import {
  Button,
  Text,
  Title,
  BSGrid,
  BSCol,
} from "@appquality/appquality-design-system";
import { useTranslation, Trans } from "react-i18next";
import UserStore from "../../../redux/user";
import LeaveCrowd from "./LeaveCrowd";

const DeleteUserArea = () => {
  const { t } = useTranslation();
  const { deletion, user } = UserStore();
  const { openDeleteModal } = deletion;
  return (
    <BSGrid>
      <BSCol size="col-12 col-lg-6">
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
          <BSCol size="col-12 col-lg-6">
            <Button
              flat
              size="block"
              type="danger"
              onClick={() => {
                openDeleteModal();
              }}
            >
              {t("Delete account")}
            </Button>
          </BSCol>
        </BSGrid>
      </BSCol>
      <BSCol size="col-12 col-lg-6">
        <LeaveCrowd />
      </BSCol>
    </BSGrid>
  );
};

export default DeleteUserArea;
