import { AppleIcon, PlayIcon } from "lucide-react";
import { Link } from "react-router-dom";

function DownLoadCta() {
  return (
    <section className="mt-5 w-full py-8 bg-gradient-to-r from-green-400 to-green-600 bg-pattern-noise rounded-lg">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h3 className="text-3xl font-bold tracking-tighter">
              Download our app
            </h3>
            <p className="max-w-[600px] text-gray-700 text-sm ">
              Get the best experience on your device.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Link
              className="inline-flex h-14 items-center justify-center rounded-md border-2 text-gray-900/90 px-8 text-sm font-medium shadow transition-colors border-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
              to="#"
            >
              <AppleIcon className="mr-2 h-4 w-4" />
              Download iOS App
            </Link>
            <Link
              className="inline-flex h-14 items-center justify-center rounded-md  px-8 text-sm font-medium text-green-500 shadow transition-colors bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
              to="#"
            >
              <PlayIcon className="mr-2 h-4 w-4" />
              Download Android App
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DownLoadCta;
