import { ScrollArea } from "@/lib/utils/ui/scroll-area";
import { cn } from "@/lib/utils";
import SideBarItems from "./sidebar-items";
import { SideBarItem } from "@/types";

interface Props {
  className: string;
  menus: SideBarItem[];
}

export function Sidebar({ className, menus }: Props) {
  return (
    <aside className={cn("", className, "md:hidden lg:block bg-gray-50")}>
      <div className="w-64 max-w-96 fixed top-14 left-0 h-full space-y-4 py-4 bg-slate">
        <ScrollArea className="h-full">
          <SideBarItems items={menus} />
        </ScrollArea>
      </div>
    </aside>
  );
}
