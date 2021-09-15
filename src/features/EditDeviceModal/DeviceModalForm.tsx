import API from "../../utils/api";
import { operations } from "../../utils/schema";
import { useEffect } from "react";
import { Formik, FormikProps } from "formik";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import userDeviceStore from "../../redux/userDevices";
import siteWideMessageStore from "../../redux/siteWideMessages";
import { DeviceFormInterface } from "./types";

interface FormProps {
  children: ReactNode;
  step: number;
  closeModal: () => void;
}

export const DeviceModalForm = ({ children, step, closeModal }: FormProps) => {
  const { t } = useTranslation();
  const { current, fetch } = userDeviceStore();
  const { add } = siteWideMessageStore();
  let device_type =
    current?.type == "Smartphone"
      ? 0
      : current?.type == "Tablet"
      ? 1
      : current?.type == "PC"
      ? 2
      : current?.type == "Console"
      ? 3
      : current?.type == "Smartwatch"
      ? 4
      : current?.type == "Smart-tv"
      ? 5
      : -1;

  const initialValues: DeviceFormInterface = {
    device_type: device_type,
    pc_type:
      current?.device && "pc_type" in current.device
        ? current.device.pc_type
        : undefined,
    manufacturer:
      current?.device && "manufacturer" in current.device
        ? current.device.manufacturer
        : "",
    model:
      current?.device && "model" in current.device ? current.device.model : "",
    device:
      current && current.device && "id" in current.device
        ? current.device.id
        : 0,
    operating_system_id: current?.operating_system.id || 0,
    operating_system_platform: current?.operating_system.platform || "",
    operating_system_version: current?.operating_system.version || "",
  };
  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={async (data, formikHelpers) => {
        if (current) {
          const { operating_system_id } = data;
          const osId =
            typeof operating_system_id === "string"
              ? parseInt(operating_system_id)
              : operating_system_id;
          if (current?.id) {
            API.editDevice({
              deviceId: current.id,
              osId: osId,
            })
              .then((res) => {
                add({
                  message: (
                    <div>
                      <strong>{t(`Device modified`)}</strong>
                      <div>
                        {t(
                          `The changes to your device were successfully saved`
                        )}
                      </div>
                    </div>
                  ),
                  type: "success",
                });
                closeModal();
                fetch();
              })
              .catch((e) => {
                if (e.statusCode === 304) {
                  add({ message: e.message, type: "info" });
                } else {
                  add({
                    message: e.message || t("Generic error"),
                    type: "danger",
                  });
                }
              });
          }
        } else {
          let newDeviceId: operations["post-users-me-devices"]["requestBody"]["content"]["application/json"]["device"] =
            -1;
          const { device_type, pc_type, device, operating_system_id } = data;
          if (device_type === 2 && pc_type) {
            newDeviceId = pc_type;
          } else if (typeof device === "string") {
            newDeviceId = parseInt(device);
          }
          const osId =
            typeof operating_system_id === "string"
              ? parseInt(operating_system_id)
              : operating_system_id;
          if (newDeviceId !== -1) {
            try {
              const res = await API.addMyDevice({
                newDevice: {
                  device: newDeviceId,
                  operating_system: osId,
                },
              });
              add({
                message: (
                  <div>
                    <strong>{t(`Device added`)}</strong>
                    <div>
                      {t(
                        `A new device was successfully added to your device list`
                      )}
                    </div>
                  </div>
                ),
                type: "success",
              });
              closeModal();
              fetch();
            } catch (e) {
              add({ message: e.message, type: "danger" });
            }
          }
        }
        formikHelpers.resetForm();
        formikHelpers.setSubmitting(false);
      }}
      isInitialValid={false}
      validate={(values) => {
        const errors: { device_type?: string; operating_system_id?: string } =
          {};
        if (step === 0 && values.device_type === -1) {
          errors.device_type = "required";
        }
        if (step === 1 && values.operating_system_id === 0) {
          errors.operating_system_id = "required";
        }
        return errors;
      }}
    >
      {children}
    </Formik>
  );
};
