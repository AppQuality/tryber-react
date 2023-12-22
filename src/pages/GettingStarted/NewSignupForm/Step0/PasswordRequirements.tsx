import { icons, Text } from "@appquality/appquality-design-system";
import { useFormikContext } from "formik";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const { Check, X } = icons;

const GreenCheck = styled(Check)`
  color: ${({ theme }) => theme.palette.success};
`;

const PasswordRequirement = ({
  check,
  children,
  "data-qa": dataQa,
}: {
  check: () => boolean;
  children: React.ReactNode;
  "data-qa"?: string;
}) => {
  return (
    <div data-qa={dataQa} style={{ display: "flex", alignItems: "center" }}>
      {check() ? (
        <GreenCheck data-qa="password-requirement-success" size={16} />
      ) : (
        <X data-qa="password-requirement-error" size={16} />
      )}
      <Text small>{children}</Text>
    </div>
  );
};

const PasswordRequirements = () => {
  const { values } = useFormikContext<FormValues>();
  const { t } = useTranslation();

  return (
    <div data-qa="password-requirements" className="aq-mb-3">
      <Text small className="aq-mb-1">
        {t("Password requirements:")}
      </Text>
      <PasswordRequirement
        data-qa="password-requirement-length"
        check={() => values.password.length >= 6}
      >
        {t("minimum of 6 characters")}
      </PasswordRequirement>
      <PasswordRequirement
        data-qa="password-requirement-uppercase"
        check={() => values.password.match(/[A-Z]/) !== null}
      >
        {t("contain an uppercase letter")}
      </PasswordRequirement>
      <PasswordRequirement
        data-qa="password-requirement-lowercase"
        check={() => values.password.match(/[a-z]/) !== null}
      >
        {t("contain a lowercase letter ")}
      </PasswordRequirement>
      <PasswordRequirement
        data-qa="password-requirement-number"
        check={() => values.password.match(/[0-9]/) !== null}
      >
        {t("contain a number")}
      </PasswordRequirement>
    </div>
  );
};

export { PasswordRequirements };
