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
    <li data-qa={dataQa} style={{ display: "flex", alignItems: "center" }}>
      {check() ? (
        <GreenCheck
          aria-hidden="true"
          data-qa="password-requirement-success"
          size={16}
        />
      ) : (
        <X aria-hidden="true" data-qa="password-requirement-error" size={16} />
      )}
      <Text small>{children}</Text>
    </li>
  );
};

const PasswordRequirements = () => {
  const { values } = useFormikContext<FormValues>();
  const { t } = useTranslation();

  return (
    <div data-qa="password-requirements" className="aq-mb-3">
      <Text small className="aq-mb-1">
        {t("PASSWORD_VALIDATOR:::Password requirements:")}
      </Text>
      <ul>
        <PasswordRequirement
          data-qa="password-requirement-length"
          check={() => values.password.length >= 6}
        >
          {t("PASSWORD_VALIDATOR:::minimum of 6 characters")}
        </PasswordRequirement>
        <PasswordRequirement
          data-qa="password-requirement-uppercase"
          check={() => values.password.match(/[A-Z]/) !== null}
        >
          {t("PASSWORD_VALIDATOR:::contain an uppercase letter")}
        </PasswordRequirement>
        <PasswordRequirement
          data-qa="password-requirement-lowercase"
          check={() => values.password.match(/[a-z]/) !== null}
        >
          {t("PASSWORD_VALIDATOR:::contain a lowercase letter")}
        </PasswordRequirement>
        <PasswordRequirement
          data-qa="password-requirement-number"
          check={() => values.password.match(/[0-9]/) !== null}
        >
          {t("PASSWORD_VALIDATOR:::contain a number")}
        </PasswordRequirement>
      </ul>
    </div>
  );
};

export { PasswordRequirements };
