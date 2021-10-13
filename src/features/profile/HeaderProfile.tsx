import { useTranslation } from "react-i18next";
import WPAPI from "../../utils/wpapi";
import UserStore from "../../redux/user";
import { PageTitle, Title, Text } from "@appquality/appquality-design-system";
import {
  StarFill,
  BookmarkCheckFill,
  Mailbox,
  CheckCircle,
} from "react-bootstrap-icons";
import { aqBootstrapTheme } from "@appquality/appquality-design-system";
import styled from "styled-components";
import siteWideMessageStore from "../../redux/siteWideMessages";

export const HeaderProfile = () => {
  const { add } = siteWideMessageStore();
  const { t } = useTranslation();
  const { user } = UserStore();
  const handleMailConfirm = async () => {
    try {
      const data = await WPAPI.sendMailConfirmation();
      console.log(data); // todo: what's inside data??
      add({
        message: "An Email has been sent to the provided address",
        type: "success",
      });
    } catch (err) {
      const { message } = err as Error;
      add({ message: message, type: "danger" });
    }
  };

  return (
    <StyledHeaderProfile className="aq-m-3">
      <div className="aq-mt-3">
        <img className="profile-avatar" src={user.image} alt={user.name} />
      </div>
      <div>
        <Title size="l">{`${user.name} ${user.surname}`}</Title>
        <Text color="secondary">
          <strong>{"T" + user.id}</strong>
        </Text>
        <Text className="aq-mb-3">
          <StarFill
            style={{ verticalAlign: "middle" }}
            color={aqBootstrapTheme.palette.warning}
            size="21"
          />{" "}
          <span className="aq-ml-2">
            <strong>{user.total_exp_pts}</strong> pt
          </span>
        </Text>
        <Text>
          <BookmarkCheckFill
            style={{ verticalAlign: "middle" }}
            color={aqBootstrapTheme.palette.secondary}
            size="21"
          />{" "}
          <span className="aq-ml-2">
            <strong>{user.attended_cp}</strong> {t("Completed campaigns")}
          </span>
        </Text>
      </div>
      <div>
        <Title className="aq-mb-2" size="xs">
          {t("Email Status")}
        </Title>
        {user?.is_verified ? (
          <Text>
            <CheckCircle
              style={{ verticalAlign: "middle" }}
              color={aqBootstrapTheme.palette.success}
            />{" "}
            <span className="aq-ml-2">{t("Email confirmed")}</span>
          </Text>
        ) : (
          <Text className="mail-confirm-cta" onClick={handleMailConfirm}>
            <Mailbox
              style={{ verticalAlign: "middle" }}
              color={aqBootstrapTheme.palette.info}
            />{" "}
            <span className="aq-ml-2">{t("Confirm email")}</span>
          </Text>
        )}
      </div>
    </StyledHeaderProfile>
  );
};

const StyledHeaderProfile = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: ${(props) => props.theme.grid.spacing.default};
  .profile-avatar {
    width: 132px;
    height: 132px;
    border-radius: 50%;
  }
  .mail-confirm-cta {
    cursor: pointer;
  }
  @media (min-width: ${(props) => props.theme.grid.breakpoints.lg}) {
    grid-template-columns: 20% 40% 40%;
    .profile-avatar {
      width: 100%;
      height: auto;
    }
  }
`;
