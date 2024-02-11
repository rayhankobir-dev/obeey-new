import Navbar from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import LoginModal from "@/pages/login-modal";
import OtpVerification from "@/pages/otp-verfication";
import RegisterModal from "@/pages/register-modal";
import { SideBarItem } from "@/types";
import { Outlet } from "react-router-dom";

interface Props {
  items: SideBarItem[];
}

export default function Layout({ items }: Props) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="pt-14 flex flex-1 overflow-hidden">
        <Sidebar
          menus={items}
          className="relative w-64 border-r hidden md:block"
        />
        <main className="flex-1 pt-6 px-4 overflow-y-auto">
          <LoginModal />
          <RegisterModal />
          <OtpVerification />
          <Outlet />
        </main>
      </div>
    </div>
  );
}
