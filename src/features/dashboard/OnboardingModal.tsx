import {
  Modal,
  ModalBody,
  Title,
  Carousel,
  CarouselSlide, CarouselNav
} from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import {useState} from 'react';
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
  const [current, setCurrent] = useState(0);
  const { t } = useTranslation();
  return (
    <Modal isOpen={open} onClose={() => false}
           footer={
             <CarouselNav current={current} setCurrent={setCurrent} totalSlides={6} showArrows />
           }>
      <ModalBody>
        <Title size="m" as="h2">
          {t("Welcome in AppQuality")}
        </Title>
        <Carousel peekNext={false} current={current} setCurrent={setCurrent} totalSlides={6} >
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
