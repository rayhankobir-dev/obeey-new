import Layout from "@/components/layout";
import Footer from "@/components/footer";
import Genres from "@/components/Genres";
import ListingNow from "@/podcast/components/ListingNow";
import Artists from "@/components/Artists";
import BannerCarousel from "@/podcast/components/BannerCarousel";
import PopularItemsCard from "@/podcast/components/PopularItemsCard";
import MadeForYou from "@/podcast/components/MadeForYou";

export default function CreatorHomePage() {
  return (
    <Layout>
      <section className="pb-10 grid md:grid-cols-3 max-h-min gap-4">
        <BannerCarousel />
        <PopularItemsCard />
      </section>
      <ListingNow />
      <Artists />
      <Genres />
      <MadeForYou />
      <Footer />
    </Layout>
  );
}
