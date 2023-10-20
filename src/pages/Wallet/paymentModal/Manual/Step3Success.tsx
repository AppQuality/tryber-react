import { Trans } from "react-i18next";
import { Check2Circle } from "react-bootstrap-icons";
import styled from "styled-components";
import { aqBootstrapTheme, Text } from "@appquality/appquality-design-system";

const SuccessMessage = () => {
  return (
    <div data-qa="manual-payment-modal-success-text">
      <Text className="aq-text-center">
        <Trans
          i18nKey="available tags: <br>, <bold>:::PAYMENTS_MODAL_INVOICE_STEP_4_SUCCESS"
          components={{
            br: <br />,
            bold: <strong className="aq-text-primary" />,
            b: <strong className="aq-text-primary" />,
          }}
          defaults={
            "<bold>Almost there!</bold><br />You will receive an email with the payment details. <br> Thank you for your collaboration!"
          }
        />
      </Text>
    </div>
  );
};

const Styled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: ${(p) => p.theme.grid.sizes[4]};
`;

export const Step3Success = () => {
  return (
    <Styled data-qa="manual-payment-modal-step-4">
      <Check2Circle
        className="aq-mb-3"
        color={aqBootstrapTheme.palette.success}
        size={32}
      />
      <SuccessMessage />
    </Styled>
  );
};
