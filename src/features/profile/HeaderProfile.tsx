import { useState } from "react";
import { useTranslation } from "react-i18next";
import WPAPI from "../../utils/wpapi";
import UserStore from "../../redux/user";
import {
  PageTitle,
  Title,
  Text,
  CSSGrid,
  Skeleton,
} from "@appquality/appquality-design-system";
import {
  StarFill,
  BookmarkCheckFill,
  Mailbox,
  CheckCircle,
} from "react-bootstrap-icons";
import { aqBootstrapTheme } from "@appquality/appquality-design-system";
import styled from "styled-components";
import siteWideMessageStore from "../../redux/siteWideMessages";
import { shallowEqual, useSelector } from "react-redux";
import { SkeletonHeader } from "src/features/profile/SkeletonHeader";

export const HeaderProfile = () => {
  const [submittingMailConfirm, setSubmittingMailConfirm] = useState(false);
  const { add } = siteWideMessageStore();
  const { t } = useTranslation();
  const { user, loading } = useSelector(
    (state: GeneralState) => ({
      user: state.user.user,
      loading: state.user.loading,
    }),
    shallowEqual
  );

  const handleMailConfirm = async () => {
    try {
      setSubmittingMailConfirm(true);
      const data = await WPAPI.sendMailConfirmation();
      add({
        message: "An Email has been sent to the provided address",
        type: "success",
      });
    } catch (err) {
      const { message } = err as Error;
      add({ message: message, type: "danger" });
    }
  };

  if (loading) return <SkeletonHeader />;

  return (
    <StyledHeaderProfile className="aq-m-3">
      <div className="aq-mt-3 aq-text-center">
        <img className="profile-avatar" src={user?.image} alt={user?.name} />
      </div>
      <div>
        <PageTitle size="small" subtitle={"T" + user?.id}>
          {`${user?.name} ${user?.surname}`}
        </PageTitle>
        <Text className="aq-mb-3">
          <StarFill
            style={{ verticalAlign: "middle" }}
            color={aqBootstrapTheme.palette.warning}
            size="21"
          />{" "}
          <span className="aq-ml-2 aq-text-secondary">
            <strong>{user?.total_exp_pts}</strong> pt
          </span>
        </Text>
        <Text>
          <BookmarkCheckFill
            style={{ verticalAlign: "middle" }}
            color={aqBootstrapTheme.palette.secondary}
            size="21"
          />{" "}
          <span className="aq-ml-2 aq-text-secondary">
            <strong>{user?.attended_cp}</strong> {t("Completed campaigns")}
          </span>
        </Text>
      </div>
      <div className="aq-mt-3">
        <Title className="aq-mb-2" size="xs">
          {t("Email Status")}
        </Title>
        {user?.is_verified ? (
          <Text>
            <CheckCircle
              size="21"
              style={{ verticalAlign: "sub" }}
              color={aqBootstrapTheme.palette.success}
            />{" "}
            <span className="aq-ml-2">{t("Email confirmed")}</span>
          </Text>
        ) : (
          <Text
            as="a"
            className={`mail-confirm-cta ${
              submittingMailConfirm ? "disabled" : ""
            }`}
            onClick={submittingMailConfirm ? undefined : handleMailConfirm}
          >
            <Mailbox
              size="21"
              style={{ verticalAlign: "sub" }}
              color={
                submittingMailConfirm
                  ? aqBootstrapTheme.colors.disabledDark
                  : aqBootstrapTheme.palette.info
              }
            />
            <span className="aq-ml-2">{t("Confirm email")}</span>
          </Text>
        )}
      </div>
    </StyledHeaderProfile>
  );
};

export const StyledHeaderProfile = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: ${(props) => props.theme.grid.spacing.default};
  .profile-avatar {
    width: 125px;
    height: 125px;
    border-radius: 50%;
  }
  .mail-confirm-cta {
    cursor: pointer;
    &.disabled {
      cursor: auto;
      color: ${(props) => props.theme.colors.disabledDark};
    }
  }
  @media (min-width: ${(props) => props.theme.grid.breakpoints.md}) {
    grid-template-columns: 20% 40% 40%;
  }
`;
