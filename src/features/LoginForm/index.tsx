import { Form } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import FormProvider from "./FormProvider";
import LoginFields from "./LoginFields";
import { useState } from "react";

const LoginForm = ({
  className,
}: {
  className: string;
  onRegisterLinkClick?: () => void;
}) => {
  const { t } = useTranslation();
  const [error, setError] = useState<string | boolean>(false);
  const [cta, setCta] = useState<string>(t("login"));

  return (
    <FormProvider setCta={setCta} setError={setError}>
      <Form className={className}>
        <LoginFields cta={cta} error={error} />
      </Form>
    </FormProvider>
  );
};

export default LoginForm;
