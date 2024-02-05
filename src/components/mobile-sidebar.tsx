import { DashboardNav } from "./sidebar-items";
import { Sheet, SheetContent, SheetTrigger } from "@/lib/utils/ui/sheet";
import { creatorMenus } from "@/constants/data";
import { MenuIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/lib/utils/ui/button";
import { Link } from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function MobileSidebar() {
  const [open, setOpen] = useState(false);
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
          <MenuIcon />
        </SheetTrigger>
        <SheetContent side="right" className="w-full !px-0">
          <div className="h-screen overflow-hidden overflow-y-scroll space-y-4 py-8 ">
            <div className="px-3 py-2">
              <div className="space-y-1">
                <DashboardNav items={creatorMenus} setOpen={setOpen} />
              </div>
              <div className="grid grid-cols-2 gap-2 px-4 pt-6">
                <Button
                  variant="primaryOutline"
                  asChild
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <Link to="/login" className="px-8">
                    Sign In
                  </Link>
                </Button>
                <Button
                  variant="primary"
                  asChild
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <Link to="/register" className="px-8">
                    Sign Up
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
