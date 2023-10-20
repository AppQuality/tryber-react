import { Trans, useTranslation } from "react-i18next";
import { Text, Title } from "@appquality/appquality-design-system";
import twIcon from "src/pages/Wallet/assets/transferwise.svg";
import { shallowEqual, useSelector } from "react-redux";
import getCurrencySymbol from "src/utils/getCurrencySymbol";
import { useFormikContext } from "formik";

const iconStyle = {
  verticalAlign: "middle",
  width: "33px",
  height: "33px",
};
const RequestAmount = () => {
  const { net, gross } = useSelector(
    (state: GeneralState) => state.wallet.booty,
    shallowEqual
  );
  const { t } = useTranslation();
  return (
    <>
      <div className="aq-text-center aq-mb-2">
        <img
          style={iconStyle}
          src={twIcon}
          alt="transferwise"
          className="aq-mr-1"
        />{" "}
        <strong className="aq-text-primary">{t("Bank Transfer")}</strong>
      </div>
      <Text className="aq-text-center aq-mb-3 aq-text-primary">
        <>
          {net ? t("Net receivable") : t("Gross amount")}:{" "}
          <strong data-qa="manual-payment-modal-amount">
            {net ? (
              <span data-qa="payment-modal-net-booty">
                {getCurrencySymbol(net.currency)}
                {net.value.toFixed(2)}
              </span>
            ) : (
              <span data-qa="payment-modal-gross-booty">
                {getCurrencySymbol(gross.currency)}
                {gross.value.toFixed(2)}
              </span>
            )}
          </strong>
          <br />
        </>
        {net && (
          <span data-qa="payment-modal-gross-booty">
            ({t("Gross")}: {getCurrencySymbol(gross.currency)}
            {gross.value.toFixed(2)})
          </span>
        )}
      </Text>
    </>
  );
};
const IntroductoryText = () => {
  const { values } = useFormikContext<PaymentFormType>();
  const { fiscalType } = useSelector(
    (state: GeneralState) => ({
      fiscalType: state.user.fiscal.data?.type,
    }),
    shallowEqual
  );
  return (
    <div data-qa="manual-payment-modal-intro-text">
      <Text>
        <Trans
          i18nKey="available tags: <br>, <p>, <strong>, <title>, <fiscalprofilelink>, <ul>, <li>:::PAYMENTS_MODAL_INVOICE_STEP_3_GET_EMAIL"
          values={{
            accountHolder: values.bankaccountOwner,
            iban: values.iban,
            fiscalType: fiscalType,
          }}
          components={{
            br: <br />,
            p: <p className="aq-mb-2" />,
            title: <Title size="xs" className="aq-mb-1" />,
            strong: <strong className="aq-text-primary" />,
          }}
          defaults={`
          <title>Before you get the email</title>
          <p>
          Check that everything is okay and confirm these details: you will also find them in the email we will send you after this step.
          </p>
          <p>
          Account holder: <strong>{{accountHolder}}</strong>
          </p>
          <p>
          IBAN: <strong>{{iban}}</strong>
          </p>
          <p>
          Fiscal type: <strong>{{fiscalType}}</strong>
          </p>
        `}
        />
      </Text>
    </div>
  );
};

export const Step2PaymentRequestRecap = () => {
  return (
    <div data-qa="manual-payment-modal-step-3">
      <RequestAmount />
      <IntroductoryText />
    </div>
  );
};