import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { User, UserPlus } from "lucide-react";
import { Button } from "@/lib/utils/ui/button";
import ObeeyLogo from "@/assets/obeey-short.png";
import { MobileSidebar } from "./mobile-sidebar";

export default function Navbar() {
  return (
    <header className="w-full fixed top-0 left-0 z-[100] supports-backdrop-blur:bg-background/60 border-b flex items-center justify-between px-4 py-2.5 bg-gray-50 dark:bg-gray-800">
      <Link className="flex items-center" to="/">
        <img className="h-8 w-8" src={ObeeyLogo} alt="Obeey Logo" />
        <span className="hidden md:block ml-2 text-xl font-bold">Obeey</span>
      </Link>
      <div className="hidden lg:flex gap-2">
        <Link to="/login">
          <Button
            variant="primaryOutline"
            className="flex gap-1 py-2.5 text-sm rounded-xl "
          >
            <User size={18} />
            Login
          </Button>
        </Link>
        <Link to="/register">
          <Button
            variant="primary"
            className="flex gap-1 py-2.5 text-sm rounded-xl"
          >
            <UserPlus size={18} />
            Sign Up
          </Button>
        </Link>
      </div>
      <div className={cn("block lg:hidden")}>
        <MobileSidebar />
      </div>
    </header>
  );
}
