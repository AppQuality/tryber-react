import { Text, Toastr } from "@appquality/appquality-design-system";
import { Trans, useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const AlreadySelected = ({ manualRoute }: { manualRoute: string }) => {
  const { t } = useTranslation();
  return (
    <Toastr type="success">
      <Text className="aq-text-primary">
        <strong>
          {t("Hooray! You have been selected for this campaign.")}
        </strong>
        <p>
          <Trans
            i18nKey="available tags: <manualLink>:::_FORM_MESSAGES_ALREADY-SELECTED_"
            components={{
              strong: <strong className="aq-text-secondary" />,
              manualLink: (
                <Link
                  data-tracking="manual-link"
                  style={{
                    display: "inline-block",
                  }}
                  to={manualRoute}
                />
              ),
            }}
            defaults={
              "<manualLink>Go to the Manual!</manualLink> There you will find all the information you need to complete the tasks."
            }
          />
        </p>
      </Text>
    </Toastr>
  );
};

export default AlreadySelected;
