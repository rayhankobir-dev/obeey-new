/* eslint-disable @typescript-eslint/no-explicit-any */
import Navbar from "@/components/layout/navbar";
import { Sidebar } from "@/components/layout/sidebar";
import LoginModal from "@/components/auth/login-modal";
import OtpVerification from "@/components/auth/otp-verfication";
import RegisterModal from "@/components/auth/register-modal";
import Player from "@/components/player";
import { sideMenu } from "@/constants/data";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Layout() {
  const { user, isAuthenticated } = useSelector((state: any) => state.auth);
  const role: "CREATOR" | "USER" | "ADMIN" = isAuthenticated
    ? user.role.role
    : "USER";
  const selectedMenu = sideMenu[role];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="pt-14 flex flex-1 overflow-hidden">
        <Sidebar
          menus={selectedMenu}
          className="relative w-64 border-r hidden md:block"
        />
        <main className="flex-1 pt-6 px-4 overflow-y-auto">
          <OtpVerification />
          <LoginModal />
          <RegisterModal />
          <Player />
          <Outlet />
        </main>
      </div>
    </div>
  );
}
