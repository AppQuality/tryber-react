import { Text } from "@appquality/appquality-design-system";
import React from "react";
import { useTranslation } from "react-i18next";
import dateFormatter from "src/utils/dateFormatter";
import { components } from "src/utils/schema";

const SingleCertification = ({
  certification,
}: {
  certification: components["schemas"]["Certification"];
}) => {
  const { t } = useTranslation();
  return (
    <>
      <div className="aq-text-primary" style={{ gridColumn: "span 3" }}>
        <Text>
          {t("Date")}:{" "}
          <strong className="aq-text-primary">
            {dateFormatter(certification.achievement_date)}
          </strong>
        </Text>
        <Text>
          {t("Certification")}:{" "}
          <strong className="aq-text-primary">{certification.name}</strong>
        </Text>
        <Text>
          {t("Institute")}:{" "}
          <strong className="aq-text-primary">{certification.institute}</strong>
        </Text>
      </div>
    </>
  );
};
export default SingleCertification;
