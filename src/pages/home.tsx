import PopularItemsCard from "@/components/podcast/popular-card";
import ListingNow from "@/components/podcast/recent-listen";
import MadeForYou from "@/components/podcast/made-for-you";
import BannerCarousel from "@/components/banner-carousel";
import DownLoadCta from "@/components/download-cta";
import Artists from "@/components/podcast/artists";
import Genres from "@/components/podcast/genres";
import Footer from "@/components/layout/footer";

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
      <DownLoadCta />
      <Footer />
    </>
  );
}
