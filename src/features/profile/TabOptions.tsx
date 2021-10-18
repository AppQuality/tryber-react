import { useTranslation } from "react-i18next";
import {
  Button,
  CSSGrid,
  Field,
  Form,
  Formik,
  Text,
  Title,
} from "@appquality/appquality-design-system";
import React from "react";
import UserStore from "../../redux/user";

const TabOptions = () => {
  const { t } = useTranslation();
  const { user, isProfileLoading } = UserStore();
  const initialUserValues = {
    name: user.name || "",
    surname: user.surname || "",
  };

  return (
    <Formik
      initialValues={initialUserValues}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      <Form id="baseProfileForm" className="aq-m-3">
        <CSSGrid gutter="50px" rowGap="1rem" min="220px">
          <div className="edit-password">
            <Title size="s">{t("Edit password")}</Title>
            <Field
              name="currentPassword"
              type="text"
              label={t("Current password")}
              placeholder="******"
            />
            <Field
              name="newPassword"
              type="password"
              label={t("New password")}
              placeholder="******"
              disabled={true}
            />
            <Text>
              * For an expected strong password: Minimum 6. One uppercase
              character. A numerical digit. A lowercase character.
            </Text>
            <Field
              name="confirmPassword"
              type="password"
              label={t("Confirm password")}
              placeholder="******"
              disabled={true}
            />
            <Button
              type="primary"
              htmlType="submit"
              flat={true}
              disabled={true}
            >
              {t("Change password")}
            </Button>
            <Button type="link" disabled={true}>
              {t("Request a new password")}
            </Button>
          </div>

          <div className="ask-your-data">
            <Title size="s">{t("Request your data")}</Title>
            <Text>
              {t(
                "*Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
              )}
            </Text>
            <Button type="primary" htmlType="submit" flat={true}>
              {t("Request data")}
            </Button>
          </div>
        </CSSGrid>
      </Form>
    </Formik>
  );
};

export default TabOptions;
