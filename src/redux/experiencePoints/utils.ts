import { TFunction } from "react-i18next";

export const mapActivityName = (
  activityId: number,
  t: TFunction<"translation">
) => {
  switch (activityId) {
    case 1:
      return t("Campaign Completion");
    case 2:
      return t("Bug Evaluation");
    case 3:
      return t("Points Fix");
    case 4:
      return t("Extra Award");
    case 5:
      return t("Referral");
    default:
      return t("Other");
  }
};
