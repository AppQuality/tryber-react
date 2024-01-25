import {
  aqBootstrapTheme,
  PageTitle,
  Text,
  Title,
} from "@appquality/appquality-design-system";
import { useState } from "react";
import {
  BookmarkCheckFill,
  CheckCircle,
  Mailbox,
  StarFill,
} from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";
import { SkeletonHeader } from "src/pages/Profile/SkeletonHeader";
import siteWideMessageStore from "src/redux/siteWideMessages";
import { useGetUsersMeQuery } from "src/services/tryberApi";
import WPAPI from "src/utils/wpapi";
import styled from "styled-components";

export const HeaderProfile = () => {
  const [submittingMailConfirm, setSubmittingMailConfirm] = useState(false);
  const { add } = siteWideMessageStore();
  const { t } = useTranslation();
  const { data: user, isLoading: loading } = useGetUsersMeQuery({
    fields: "all",
  });

  const handleMailConfirm = async () => {
    try {
      setSubmittingMailConfirm(true);
      await WPAPI.sendMailConfirmation();
      add({
        message: t(
          "User mail validation:::An Email has been sent to the provided address"
        ),
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
        <Text className="aq-mb-3" style={{ display: "flex" }}>
          <StarFill
            style={{ verticalAlign: "middle" }}
            color={aqBootstrapTheme.palette.warning}
            size="21"
          />{" "}
          <div className="aq-ml-2 aq-text-primary">
            <strong className="aq-mr-2">{user?.total_exp_pts}</strong>
            <span className="aq-text-primaryVariant">pt</span>
          </div>
        </Text>
        <Text style={{ display: "flex" }}>
          <BookmarkCheckFill
            style={{ verticalAlign: "middle" }}
            color={aqBootstrapTheme.palette.secondary}
            size="21"
          />{" "}
          <span className="aq-ml-2 aq-text-primary" style={{ display: "flex" }}>
            <strong className="aq-mr-2">{user?.attended_cp}</strong>
            <span className="aq-text-primaryVariant">
              {" "}
              {t("Completed campaigns")}
            </span>
          </span>
        </Text>
      </div>
      <div className="aq-mt-3 profile-mail-confirm">
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
                  : aqBootstrapTheme.variants.primary
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
  row-gap: 0;
  .profile-avatar {
    width: 125px;
    height: 125px;
    border-radius: 50%;
  }
  .profile-mail-confirm {
    grid-column: span 2;
    @media (min-width: ${(props) => props.theme.grid.breakpoints.md}) {
      grid-column: span 1;
    }
  }
  .mail-confirm-cta {
    cursor: pointer;
    color: ${(props) => props.theme.palette.secondary};
    &.disabled {
      cursor: auto;
      color: ${(props) => props.theme.colors.disabledDark};
    }
  }
  @media (min-width: ${(props) => props.theme.grid.breakpoints.md}) {
    grid-template-columns: 20% 40% 40%;
  }
`;
