import { Button } from "@/lib/utils/ui/button";
import { PlayCircle } from "lucide-react";

function PopularListItem() {
  return (
    <div className="flex items-center gap-4 p-2 rounded-lg bg-slate-100 group cursor-pointer">
      <div className="relative">
        <img
          className="aspect-square rounded-lg object-cover"
          height={50}
          src="https://cdn1.bioscopelive.com/c3c98d1b-c581-452d-a385-941ca69401e9/content/d827f751-d026-4579-b17f-3c4a8033d6fe/10bb14df-c629-4a96-8c44-0a36c4891f6f.jpg?width=300"
          width={50}
        />
        <Button
          className="w-full h-full absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-green-500 text-white group-hover:bg-green-500 duration-400"
          size="icon"
          variant="ghost"
        >
          <PlayCircle className="h-8 w-8 text-white" />
        </Button>
      </div>
      <div className="flex-1 min-w-0">
        <h2 className="text-md font-medium line-clamp-1 truncate">
          Detective Turjo - Chotushkon - Part 1
        </h2>
        <p className="text-xs text-gray-500 line-clamp-1 dark:text-gray-400">
          Artist Name - Chotushkon
        </p>
      </div>
    </div>
  );
}

export default PopularListItem;
