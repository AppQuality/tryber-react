import {
  Modal,
  ModalBody,
  Title,
  Text,
  Carousel,
  CarouselSlide,
  Button,
} from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import SlideWelcome from "./OnboardingModal/SlideWelcome";
import SlideProfile from "./OnboardingModal/SlideProfile";
import SlideDevices from "./OnboardingModal/SlideDevices";
import SlideCourses from "./OnboardingModal/SlideCourses";
import SlidePayments from "./OnboardingModal/SlidePayments";
import SlideFinal from "./OnboardingModal/SlideFinal";

export default ({
  open = true,
  onClose,
}: {
  open?: boolean;
  onClose: () => void;
}) => {
  const { t } = useTranslation();
  return (
    <Modal isOpen={open} onClose={() => false}>
      <ModalBody>
        <Title size="m">{t("Welcome in AppQuality")}</Title>
        <Carousel peekNext={false}>
          <CarouselSlide>
            <SlideWelcome />
          </CarouselSlide>
          <CarouselSlide>
            <SlideProfile />
          </CarouselSlide>
          <CarouselSlide>
            <SlideDevices />
          </CarouselSlide>
          <CarouselSlide>
            <SlideCourses />
          </CarouselSlide>
          <CarouselSlide>
            <SlidePayments />
          </CarouselSlide>
          <CarouselSlide>
            <SlideFinal onClose={onClose} />
          </CarouselSlide>
        </Carousel>
      </ModalBody>
    </Modal>
  );
};
