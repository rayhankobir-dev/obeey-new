import { cn } from "@/lib/utils";
import { DashboardNav } from "./sidebar-items";
import { creatorMenus } from "@/constants/data";
import { ScrollArea } from "@/lib/utils/ui/scroll-area";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Sidebar({ className }: string | any) {
  return (
    <aside className={cn("", className, "md:hidden lg:block bg-gray-50")}>
      <div className="w-64 max-w-96 fixed top-14 left-0 h-full space-y-4 py-4 bg-slate">
        <ScrollArea className="h-full">
          <DashboardNav items={creatorMenus} />
        </ScrollArea>
      </div>
    </aside>
  );
}
