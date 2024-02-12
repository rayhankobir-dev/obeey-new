import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/lib/utils/ui/carousel";

function BannerCarousel() {
  return (
    <Carousel
      opts={{ loop: true, direction: "ltr" }}
      className="col-span-3 md:col-span-3 lg:col-span-2 rounded-xl overflow-hidden"
    >
      <CarouselContent>
        <CarouselItem className="relative">
          <img
            height={400}
            src="https://res.cloudinary.com/rayhankobirdev/image/upload/v1707244108/banner-2_bmvpxj.png"
            className="rounded-xl object-cover"
          />
          <div className="absolute top-[50%] bg-gradient-to-t from-white to-transparent"></div>
        </CarouselItem>
        <CarouselItem className="relative">
          <img
            height={400}
            src="https://res.cloudinary.com/rayhankobirdev/image/upload/v1707244110/banner-3_l0wryc.png"
            className="rounded-xl object-cover"
          />
        </CarouselItem>
        <CarouselItem className="relative">
          <img
            height={400}
            src="https://res.cloudinary.com/rayhankobirdev/image/upload/v1707244107/banner-1_vtywo1.png"
            className="rounded-xl object-cover"
          />
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
}

export default BannerCarousel;
