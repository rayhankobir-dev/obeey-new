import { Link } from "react-router-dom";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { NavItem } from "@/types";
import { Dispatch, SetStateAction } from "react";
import { useLocation } from "react-router-dom";

interface DashboardNavProps {
  items: NavItem[];
  setOpen?: Dispatch<SetStateAction<boolean>>;
}

export function DashboardNav({ items, setOpen }: DashboardNavProps) {
  const location = useLocation();
  const path = location.pathname;

  return (
    <nav className="grid items-start gap-2">
      {items.map((item, index) => {
        const Icon = Icons[item.icon || "arrowRight"];
        return item.type === "link" && item.href ? (
          <Link
            key={index}
            to={item.disabled ? "/" : item.href}
            onClick={() => {
              if (setOpen) setOpen(false);
            }}
          >
            <span
              className={cn(
                "group flex items-center rounded-md mx-2 px-3 py-2.5 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                path === item.href ? "bg-accent" : "transparent",
                item.disabled && "cursor-not-allowed opacity-80"
              )}
            >
              <Icon className="mr-2 h-4 w-4" />
              <span>{item.title}</span>
            </span>
          </Link>
        ) : (
          <div key={index} className="relative mx-2 px-3 py-2">
            <h2 className="flex gap-2 items-center text-lg font-semibold tracking-tight text-green-600">
              {item.title}
              <Icon size={20} />
            </h2>
            <p className="pt-1 text-sm text-gray-600">{item.description}</p>
          </div>
        );
      })}
    </nav>
  );
}
