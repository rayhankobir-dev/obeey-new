import { Button } from "@/lib/utils/ui/button";
import { Link } from "react-router-dom";
import ObeeyLogo from "@/assets/obeey-short.png";
import { User, UserPlus } from "lucide-react";

export default function Navbar() {
  return (
    <header className="w-full fixed top-0 z-[100] border-b flex items-center justify-between px-4 py-2.5 bg-white dark:bg-gray-800">
      <Link className="flex items-center" to="/">
        <img className="h-8 w-8" src={ObeeyLogo} alt="Obeey Logo" />
        <span className="ml-2 text-xl font-bold">Obeey</span>
      </Link>
      <nav className="hidden md:flex gap-4"></nav>
      <div className="flex gap-2">
        <Button
          variant="primaryOutline"
          className="flex gap-1 py-2.5 text-sm rounded-xl "
        >
          <User size={18} />
          Login
        </Button>
        <Button
          variant="primary"
          className="flex gap-1 py-2.5 text-sm rounded-xl"
        >
          <UserPlus size={18} />
          Sign Up
        </Button>
      </div>
    </header>
  );
}
