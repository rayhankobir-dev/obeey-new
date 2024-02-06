import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { CreditCard, LogOut, Settings, User, UserPlus } from "lucide-react";
import ObeeyLogo from "@/assets/obeey-short.png";
import { MobileSidebar } from "./mobile-sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/lib/utils/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/lib/utils/ui/avatar";
import { Button } from "@/lib/utils/ui/button";
const user = {
  img: "https://res.cloudinary.com/rayhankobirdev/image/upload/v1702226763/yruk4jqkfhm7s1uski5j.png",
  authenticated: true,
};
export default function Navbar() {
  return (
    <header className="w-full fixed top-0 left-0 z-[100] supports-backdrop-blur:bg-background/60 border-b flex items-center justify-between px-4 py-2.5 bg-gray-50 dark:bg-gray-800">
      <Link className="flex items-center" to="/">
        <img className="h-8 w-8" src={ObeeyLogo} alt="Obeey Logo" />
        <span className="hidden md:block ml-2 text-xl font-bold">Obeey</span>
      </Link>
      <div className="flex gap-3 items-center">
        {user.authenticated ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className="w-9 h-9">
                <AvatarImage src={user.img} />
                <AvatarFallback>RK</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <CreatorMenuContent />
          </DropdownMenu>
        ) : (
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
        )}

        <div className={cn("block lg:hidden")}>
          <MobileSidebar />
        </div>
      </div>
    </header>
  );
}

export function CreatorMenuContent() {
  return (
    <DropdownMenuContent className="z-[101] min-w-48">
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem asChild>
          <Link to={"/profile"}>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to={"/billing"}>
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Billing</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to={"/settings"}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem className="text-rose-500 hover:bg-rose-100 hover:text-rose-600 cursor-pointer">
        <LogOut className="mr-2 h-4 w-4" />
        <span>Log out</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
}
