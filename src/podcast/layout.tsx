import Navbar from "./components/navbar";
import { Sidebar } from "./components/sidebar";
import { playlists } from "./data/playlists";
import MusicPage from "./page";

function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="pt-10 flex flex-1 overflow-hidden">
        <Sidebar
          playlists={playlists}
          className="relative w-64 border-r hidden md:block"
        />
        <main className="flex-1 py-6 pt-10 px-4 md:pl-8 overflow-y-auto">
          <MusicPage />
        </main>
      </div>
    </div>
  );
}

export default Layout;
