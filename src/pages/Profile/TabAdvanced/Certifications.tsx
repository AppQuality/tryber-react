import {
  aqBootstrapTheme,
  Button,
  CSSGrid,
} from "@appquality/appquality-design-system";
import React from "react";
import { useTranslation } from "react-i18next";
import { shallowEqual, useSelector } from "react-redux";
import { HalfColumnButton } from "src/features/HalfColumnButton";
import modalStore from "src/redux/modal";
import { components } from "src/utils/schema";
import {
  DeleteCertificationsModal,
  DeleteCertificationsModalFooter,
} from "./DeleteCertificationsModal";
import {
  NewCertificationModal,
  NewCertificationModalFooter,
} from "./NewCertificationModal";
import SingleCertification from "./SingleCertification";

const Certifications = () => {
  const { t } = useTranslation();
  const { open } = modalStore();

  const userCertifications: components["schemas"]["Certification"][] | boolean =
    useSelector(
      (state: GeneralState) => state.user.user?.certifications || [],
      shallowEqual
    );

  return (
    <>
      {Array.isArray(userCertifications) &&
        userCertifications.map((cert, i) => (
          <CSSGrid
            key={i}
            rowGap="1rem"
            min="60px"
            className={i > 0 ? "aq-mb-3 aq-pt-3" : "aq-mb-3"}
            style={{
              borderTop:
                i > 0
                  ? `1px solid ${aqBootstrapTheme.colors.elementGeneric}`
                  : "",
            }}
          >
            <SingleCertification certification={cert} />
            <div className="remove-certification aq-text-right">
              <Button
                className="aq-text-danger"
                type="link"
                htmlType="button"
                flat
                size="sm"
                onClick={() => {
                  open({
                    content: (
                      <DeleteCertificationsModal certifications={[cert]} />
                    ),
                    title: t("Remove Certification"),
                    footer: (
                      <DeleteCertificationsModalFooter certification={cert} />
                    ),
                    size: "small",
                  });
                }}
              >
                {t("Remove")}
              </Button>
            </div>
          </CSSGrid>
        ))}
      <CSSGrid min="50%" gutter="0" fill="true">
        <HalfColumnButton
          type="primary"
          htmlType="button"
          flat={true}
          disabled={false}
          onClick={() => {
            open({
              content: <NewCertificationModal />,
              title: t("Add Certifications"),
              footer: <NewCertificationModalFooter />,
            });
          }}
        >
          {t("Add Certifications")}
        </HalfColumnButton>
      </CSSGrid>
    </>
  );
};
export default Certifications;
