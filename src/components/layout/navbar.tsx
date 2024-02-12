/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, AvatarFallback, AvatarImage } from "@/lib/utils/ui/avatar";
import { Button } from "@/lib/utils/ui/button";
import ObeeyLogo from "@/assets/obeey-short.png";
import { MobileSidebar } from "./mobile-sidebar";
import { Link } from "react-router-dom";
import {
  CreditCard,
  LogOut,
  PauseCircle,
  PlayCircle,
  Settings,
  User,
  UserPlus,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/lib/utils/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useSelector } from "react-redux";
import {
  handleLoginModal,
  handleRegisterModal,
} from "@/redux/actions/modal.action";
import { getAvatarFallbackLetter } from "@/utils/helper";
import { logoutUser } from "@/redux/actions/auth.action";

export default function Navbar() {
  const { isPlaying, isBackgrounPlay } = useSelector(
    (state: any) => state.player
  );
  const { user, isAuthenticated } = useSelector((state: any) => state.auth);

  return (
    <header className="w-full fixed top-0 left-0 z-[100] supports-backdrop-blur:bg-background/60 border-b flex items-center justify-between px-4 py-2.5 bg-gray-50 dark:bg-gray-800">
      <Link className="flex items-center" to="/">
        <img className="h-8 w-8" src={ObeeyLogo} alt="Obeey Logo" />
        <span className="hidden md:block ml-2 text-xl font-bold">Obeey</span>
      </Link>
      <div className="flex gap-3 items-center">
        {isBackgrounPlay && (
          <div className="text-green-600 text-lg cursor-pointer">
            {isPlaying ? (
              <PauseCircle size={30} onClick={() => {}} />
            ) : (
              <PlayCircle size={30} onClick={() => {}} />
            )}
          </div>
        )}
        {isAuthenticated ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className="w-9 h-9">
                <AvatarImage src={user.img} />
                <AvatarFallback className="bg-green-500 text-white">
                  {getAvatarFallbackLetter(user.firstName, user.lastName)}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <CreatorMenuContent />
          </DropdownMenu>
        ) : (
          <div className="hidden lg:flex gap-2">
            <Button
              variant={"primaryOutline"}
              className="flex gap-1 py-2.5 text-sm rounded-xl"
              onClick={() => handleLoginModal(true)}
            >
              <User size={18} />
              Login
            </Button>

            <Button
              variant="primary"
              className="flex gap-1 py-2.5 text-sm rounded-xl"
              onClick={() => handleRegisterModal(true)}
            >
              <UserPlus size={18} />
              Sign Up
            </Button>
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
      <DropdownMenuItem
        onClick={() => {
          logoutUser();
        }}
        className="text-rose-500 hover:bg-rose-100 hover:text-rose-600 cursor-pointer"
      >
        <LogOut className="mr-2 h-4 w-4" />
        <span>Log out</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
}
