import Layout from "@/components/layout";
import BannerCarousel from "../components/BannerCarousel";
import PopularItemsCard from "../components/PopularItemsCard";
import ListingNow from "../components/ListingNow";
import MadeForYou from "../components/MadeForYou";
import DownLoadCta from "../components/DownLoadCta";
import Footer from "@/components/footer";

export default function HomePage() {
  return (
    <Layout>
      <section className="pb-10 grid md:grid-cols-3 gap-4">
        <BannerCarousel />
        <PopularItemsCard />
      </section>
      <ListingNow />
      <MadeForYou />
      <DownLoadCta />
      <Footer />
    </Layout>
  );
}
