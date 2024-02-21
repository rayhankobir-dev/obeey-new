/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Navbar from "@/components/layout/navbar";
import { Sidebar } from "@/components/layout/sidebar";
import LoginModal from "@/components/auth/login-modal";
import OtpVerification from "@/components/auth/otp-verfication";
import RegisterModal from "@/components/auth/register-modal";
import Player from "@/components/player";
import { sideMenu } from "@/constants/data";
import { Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Fragment, useEffect } from "react";
import { DashboardSkeleton } from "../skeleton/skeletons";
import { handleOtpModal } from "@/redux/actions/modal.action";
import { SideBarItem } from "@/types";

export default function Layout() {
  const { loading, isAuth, user }: any = useAuth();
  const role: "USER" | "CREATOR" | "ADMIN" = user?.role.role || "USER";
  const selectedMenu: SideBarItem[] = sideMenu[role];

  useEffect(() => {
    if (loading == false && isAuth && user.emailVerified == false) {
      handleOtpModal(true);
    }
  }, [isAuth, loading, user.emailVerified]);

  return (
    <div className="flex flex-col min-h-screen">
      {loading ? (
        <DashboardSkeleton />
      ) : (
        <Fragment>
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
        </Fragment>
      )}
    </div>
  );
}
