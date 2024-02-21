/* eslint-disable @typescript-eslint/no-explicit-any */
import { Sheet, SheetContent, SheetTrigger } from "@/lib/utils/ui/sheet";
import { Button } from "@/lib/utils/ui/button";
import { MenuIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { sideMenu } from "@/constants/data";
import SideBarItems from "./sidebar-items";
import {
  handleLoginModal,
  handleRegisterModal,
} from "@/redux/actions/modal.action";
import { useAuth } from "@/context/AuthContext";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function MobileSidebar() {
  const [open, setOpen] = useState(false);
  const { user, isAuth }: any = useAuth();
  const role: "CREATOR" | "USER" | "ADMIN" = isAuth ? user?.role?.role : "USER";
  const selectedMenu = sideMenu[role];

  useEffect(() => {
    // while open mobile menu and resize screensize menu will closed
    const handleResize = () => {
      window.innerWidth >= 1024 ? setOpen(false) : setOpen(open);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [open]);

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <MenuIcon size={30} />
        </SheetTrigger>
        <SheetContent side="right" className="w-full !px-0">
          <div className="h-screen overflow-hidden overflow-y-scroll space-y-4 py-8 ">
            <div className="px-3 py-2">
              <div className="space-y-1">
                <SideBarItems items={selectedMenu} setOpen={setOpen} />
              </div>
              {!isAuth ? (
                <div className="grid grid-cols-2 gap-2 px-4 pt-6">
                  <Button
                    variant="primaryOutline"
                    className="px-8"
                    onClick={() => {
                      setOpen(false);
                      handleLoginModal(true);
                    }}
                  >
                    Sign In
                  </Button>
                  <Button
                    variant="primary"
                    className="px-8"
                    onClick={() => {
                      setOpen(false);
                      handleRegisterModal(true);
                    }}
                  >
                    Sign Up
                  </Button>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
