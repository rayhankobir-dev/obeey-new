import PopularListItem from "./PopularListItem";
import { ScrollArea } from "@/lib/utils/ui/scroll-area";

export default function PopularItemsCard() {
  return (
    <div className="w-full max-h-96 col-span-3 lg:col-span-1 overflow-hidden shadow-sm border-2 border-slate-50 rounded-xl p-4">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">
          Popular Podcasts
        </h2>
        <p className="text-sm text-muted-foreground">
          Popular podcasts which currently trending.
        </p>
      </div>

      <ScrollArea className="w-full h-full py-2">
        <div className="grid gap-2">
          <PopularListItem />
          <PopularListItem />
          <PopularListItem />
          <PopularListItem />
          <PopularListItem />
          <PopularListItem />
          <PopularListItem />
          <PopularListItem />
        </div>
      </ScrollArea>
    </div>
  );
}
