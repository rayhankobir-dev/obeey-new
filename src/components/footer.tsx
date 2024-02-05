import { InstagramLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import { PiFacebookLogo } from "react-icons/pi";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-10 bg-gray-50 w-full py-6 flex items-center justify-center gap-4 rounded-t-md">
      <div className="flex gap-4">
        <Link className="text-sm hover:underline underline-offset-4" to="#">
          <PiFacebookLogo className="h-6 w-6" />
        </Link>
        <Link className="text-sm hover:underline underline-offset-4" to="#">
          <TwitterLogoIcon className="h-6 w-6" />
        </Link>
        <Link className="text-sm hover:underline underline-offset-4" to="#">
          <InstagramLogoIcon className="h-6 w-6" />
        </Link>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        © 2024 Acme Inc. All rights reserved.
      </p>
    </footer>
  );
}
