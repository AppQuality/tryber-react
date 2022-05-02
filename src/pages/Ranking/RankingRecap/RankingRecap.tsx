import {
  aqBootstrapTheme,
  Text,
  Title,
} from "@appquality/appquality-design-system";
import { BookmarkCheckFill, StarFill } from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";
import { shallowEqual, useSelector } from "react-redux";
import { SkeletonHeader } from "src/pages/Profile/SkeletonHeader";
import { AvatarWithRank } from "src/pages/Ranking/RankingRecap/AvatarWithRank";

export const RankingRecap = () => {
  const { t } = useTranslation();
  const { user, loading } = useSelector(
    (state: GeneralState) => ({
      user: state.user.user,
      loading: state.user.loading,
    }),
    shallowEqual
  );
  const { summary } = useSelector(
    (state: GeneralState) => state.ranking,
    shallowEqual
  );

  if (loading || !summary) return <SkeletonHeader />;
  return (
    <>
      <AvatarWithRank user={user} rankingSummary={summary} />
      <div>
        <Title size="s">{`${user.name} ${user.surname}`}</Title>
        <div>{"T" + user.id}</div>
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
      </div>
    </>
  );
};
