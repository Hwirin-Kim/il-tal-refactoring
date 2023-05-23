// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./CompanyCarousel.css";

// import required modules
import { Pagination, Navigation } from "swiper";
import { ReactNode } from "react";

type CompanyCarouselProps = {
  children: ReactNode;
};

const CompanyCarousel = ({ children }: CompanyCarouselProps) => {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={30}
      loop={true}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Pagination, Navigation]}
    >
      {children}
    </Swiper>
  );
};
export { CompanyCarousel };
