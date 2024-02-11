import { cn } from "@/lib/utils";
import SideBarItems from "./sidebar-items";
import { ScrollArea } from "@/lib/utils/ui/scroll-area";
import { SideBarItem } from "@/types";
import { useSelector } from "react-redux";

interface Props {
  className: string;
  menus: SideBarItem[];
}

export function Sidebar({ className, menus }: Props) {
  const user = useSelector((state) => state);
  console.log(user);
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
