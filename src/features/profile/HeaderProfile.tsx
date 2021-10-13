import { useTranslation } from "react-i18next";
import WPAPI from "../../utils/wpapi";
import UserStore from "../../redux/user";
import { PageTitle, Title } from "@appquality/appquality-design-system";
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
        <PageTitle size="small" subtitle={"T" + user.id}>
          {`${user.name} ${user.surname}`}
        </PageTitle>
        <div>
          <StarFill color={aqBootstrapTheme.palette.warning} />{" "}
          <strong>{user.total_exp_pts}</strong> pt
        </div>
        <div>
          <BookmarkCheckFill
            style={{ verticalAlign: "middle" }}
            color={aqBootstrapTheme.palette.secondary}
          />{" "}
          <strong>{user.attended_cp}</strong> {t("completed campaigns")}
        </div>
      </div>
      <div className="aq-mt-3">
        <div>
          <Title size="xs">{t("Email Status")}</Title>
        </div>
        <div>
          {user?.is_verified ? (
            <div>
              <CheckCircle
                style={{ verticalAlign: "middle" }}
                color={aqBootstrapTheme.palette.success}
              />{" "}
              <span>{t("email confirmed")}</span>
            </div>
          ) : (
            <div className="mail-confirm-cta" onClick={handleMailConfirm}>
              <Mailbox color={aqBootstrapTheme.palette.info} />{" "}
              {t("confirm email")}
            </div>
          )}
        </div>
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
