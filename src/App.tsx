import { Route, Routes } from "react-router-dom";
import CreatorAnalytics from "./components/creator/analytics";
import Layout from "./components/layout/layout";
import HomePage from "./pages/home";
import ListingNow from "./components/podcast/recent-listen";
import Genres from "./components/podcast/genres";
import PopularItemsCard from "./components/podcast/popular-card";
import MadeForYou from "./components/podcast/made-for-you";
import Artists from "./components/podcast/artists";
import MyPodcasts from "./components/creator/my-podcasts";
import { ContentCreateForm } from "./components/creator/add-content-form";
import Podcasts from "./components/podcast/podcasts";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="listen-now" element={<ListingNow />} />
        <Route path="genres" element={<Genres />} />
        <Route path="playlists" element={<PopularItemsCard />} />
        <Route path="made-for-you" element={<MadeForYou />} />
        <Route path="artists" element={<Artists />} />
        <Route path="creator-analytics" element={<CreatorAnalytics />} />
        <Route path="my-podcast" element={<MyPodcasts />} />
        <Route path="add-podcast" element={<ContentCreateForm />} />
        <Route path="podcast" element={<Podcasts />}>
          <Route path=":genre" element={<Podcasts />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
