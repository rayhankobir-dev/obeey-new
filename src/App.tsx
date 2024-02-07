import { Route, Routes } from "react-router-dom";
import CreatorAnalytics from "./creator/components/analytics";
import Layout from "./components/layout";
import { creatorMenus } from "./constants/data";
import HomePage from "./pages/home-page";
import ListingNow from "./podcast/components/ListingNow";
import Genres from "./components/Genres";
import PopularItemsCard from "./podcast/components/PopularItemsCard";
import MadeForYou from "./podcast/components/MadeForYou";
import Artists from "./components/Artists";
import MyPodcasts from "./creator/components/my-podcasts";
import { ContentCreateForm } from "./creator/components/add-content-form";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout items={creatorMenus} />}>
        <Route path="/" element={<HomePage />} />
        <Route path="listen-now" element={<ListingNow />} />
        <Route path="browse" element={<ListingNow />} />
        <Route path="genres" element={<Genres />} />
        <Route path="playlists" element={<PopularItemsCard />} />
        <Route path="made-for-you" element={<MadeForYou />} />
        <Route path="artists" element={<Artists />} />
        <Route path="creator-analytics" element={<CreatorAnalytics />} />
        <Route path="my-podcast" element={<MyPodcasts />} />
        <Route path="add-podcast" element={<ContentCreateForm />} />
      </Route>
    </Routes>
  );
}

export default App;
