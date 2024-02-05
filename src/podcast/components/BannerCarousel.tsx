import Banner1 from "@/assets/banner-1.png";
import Banner2 from "@/assets/banner-2.png";
import Banner3 from "@/assets/banner-3.png";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/lib/utils/ui/carousel";

function BannerCarousel() {
  return (
    <Carousel
      opts={{ loop: true, direction: "ltr" }}
      className="col-span-3 md:col-span-2 rounded-xl overflow-hidden"
    >
      <CarouselContent>
        <CarouselItem className="relative">
          <img height={400} src={Banner1} className="rounded-xl object-cover" />
          <div className="absolute top-[50%] bg-gradient-to-t from-white to-transparent"></div>
        </CarouselItem>
        <CarouselItem className="relative">
          <img height={400} src={Banner2} className="rounded-xl object-cover" />
        </CarouselItem>
        <CarouselItem className="relative">
          <img height={400} src={Banner3} className="rounded-xl object-cover" />
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
}

export default BannerCarousel;
