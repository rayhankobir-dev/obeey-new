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
import ProfilePage from "./components/profile";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Subscription from "./components/payment/subscription";
import NotFound from "./pages/not-found";
import DownLoadCta from "./components/download-cta";
import Footer from "./components/layout/footer";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="listen-now"
          element={
            <>
              <ListingNow />
              <DownLoadCta />
              <Footer />
            </>
          }
        />
        <Route
          path="genres"
          element={
            <>
              <Genres />
              <DownLoadCta />
              <Footer />
            </>
          }
        />
        <Route
          path="made-for-you"
          element={
            <ProtectedRoute>
              <MadeForYou />
              <DownLoadCta />
              <Footer />
            </ProtectedRoute>
          }
        />
        <Route path="artists" element={<Artists />} />
        <Route
          path="creator-analytics"
          element={
            <ProtectedRoute>
              <CreatorAnalytics />
            </ProtectedRoute>
          }
        />
        <Route path="my-podcast" element={<MyPodcasts />} />
        <Route
          path="add-podcast"
          element={
            <ProtectedRoute>
              <ContentCreateForm />
            </ProtectedRoute>
          }
        />
        <Route path="subscription" element={<Subscription />} />
        <Route path="podcast" element={<Podcasts />}>
          <Route path=":genre" element={<Podcasts />} />
        </Route>
        <Route
          path="/playlists"
          element={
            <ProtectedRoute>
              <PopularItemsCard />
              <DownLoadCta />
              <Footer />
            </ProtectedRoute>
          }
        ></Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
