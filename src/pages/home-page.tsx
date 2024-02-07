import Artists from "@/components/Artists";
import Genres from "@/components/Genres";
import Footer from "@/components/footer";
import BannerCarousel from "@/podcast/components/BannerCarousel";
import ListingNow from "@/podcast/components/ListingNow";
import MadeForYou from "@/podcast/components/MadeForYou";
import PopularItemsCard from "@/podcast/components/PopularItemsCard";

export default function HomePage() {
  return (
    <>
      <section className="pb-10 flex-1 grid md:grid-cols-3 max-h-min gap-4">
        <BannerCarousel />
        <PopularItemsCard />
      </section>
      <ListingNow />
      <Artists />
      <Genres />
      <MadeForYou />
      <Footer />
    </>
  );
}
