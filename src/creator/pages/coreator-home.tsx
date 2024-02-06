import Layout from "@/components/layout";
import MyPodcasts from "../components/my-podcasts";

export default function CreatorHomePage() {
  return (
    <Layout>
      <MyPodcasts />
    </Layout>
  );
}

// <Player />
//       <section className="pb-10 flex-1 grid md:grid-cols-3 max-h-min gap-4">
//         <BannerCarousel />
//         <PopularItemsCard />
//       </section>
//       <ListingNow />
//       <Artists />
//       <Genres />
//       <MadeForYou />
//       <Footer />
