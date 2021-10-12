import { useTranslation } from "react-i18next";
import UserStore from "../../redux/user";
import {
  BSCol,
  BSGrid,
  CSSGrid,
  PageTitle,
  Title,
} from "@appquality/appquality-design-system";
import { StarFill, BookmarkCheckFill, Mailbox } from "react-bootstrap-icons";
import { aqBootstrapTheme } from "@appquality/appquality-design-system";
import styled from "styled-components";

export const HeaderProfile = () => {
  const { t } = useTranslation();
  const { user } = UserStore();
  return (
    <StyledHeaderProfile className="aq-m-3">
      <div>
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
          <BookmarkCheckFill color={aqBootstrapTheme.palette.secondary} />{" "}
          <strong>{user.attended_cp}</strong> {t("Campagne completate")}
        </div>
      </div>
      <div>
        <div>
          <Title size="s">{t("Stato email")}</Title>
        </div>
        <div>
          <Mailbox color={aqBootstrapTheme.palette.info} />{" "}
          {t("Conferma l'email")}
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
  @media (min-width: ${(props) => props.theme.grid.breakpoints.lg}) {
    grid-template-columns: 20% 40% 40%;
    .profile-avatar {
      width: 100%;
    }
  }
`;
