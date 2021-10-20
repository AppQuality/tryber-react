import {
  Formik,
  Modal,
  Form,
  FormGroup,
  Input,
  Button,
  BSGrid,
  BSCol,
} from "@appquality/appquality-design-system";
import residenceModalStore from "../../../redux/addResidenceAddressModal";
import userStore from "../../../redux/user";
import { Field as FormikField, FieldProps, FormikProps } from "formik";

const FiscalResidenceModal = () => {
  const {
    close: modalClose,
    isOpen: isModalOpen,
    address,
    updateData,
  } = residenceModalStore();
  const { user, isLoading, isProfileLoading } = userStore();
  if (isLoading || isProfileLoading) return null;

  const initialValues: {
    street: string;
  } = {
    street: address.street ? address.street : user?.fiscal?.address.street,
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(v) => {
        updateData(v);
        modalClose();
      }}
    >
      {(formikProps: FormikProps<any>) => {
        return (
          <Modal
            isOpen={isModalOpen}
            onClose={modalClose}
            footer={
              <BSGrid>
                <BSCol size="col-8"></BSCol>
                <BSCol size="col-4">
                  <Button
                    size="block"
                    flat
                    type="primary"
                    htmlType="submit"
                    onClick={() => formikProps.handleSubmit()}
                  >
                    Ok
                  </Button>
                </BSCol>
              </BSGrid>
            }
          >
            <Form>
              <FormikField name="street">
                {({
                  field, // { name, value, onChange, onBlur }
                  form,
                }: FieldProps) => {
                  return (
                    <FormGroup>
                      <Input
                        type="text"
                        id={field.name}
                        value={field.value}
                        onChange={(v) => {
                          field.onChange(v);
                          form.setFieldValue(field.name, v, true);
                        }}
                      />
                    </FormGroup>
                  );
                }}
              </FormikField>
            </Form>
          </Modal>
        );
      }}
    </Formik>
  );
};

export default FiscalResidenceModal;
