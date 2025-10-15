import { Button, Text, Toastr } from "@appquality/appquality-design-system";
import { Trans, useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const ManualLink = ({
  manualRoute,
  children,
}: {
  manualRoute: string;
  children?: React.ReactNode;
}) => {
  return (
    <Button kind="link" className="aq-p-1">
      <Link
        data-tracking="manual-link"
        style={{
          display: "inline-block",
        }}
        to={manualRoute}
      >
        {children}
      </Link>
    </Button>
  );
};

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
              manualLink: <ManualLink manualRoute={manualRoute} />,
            }}
            defaults={
              "In the Manual you will find all the information you need to complete the tasks.<manualLink>Go to the Manual!</manualLink>"
            }
          />
        </p>
      </Text>
    </Toastr>
  );
};

export default AlreadySelected;
