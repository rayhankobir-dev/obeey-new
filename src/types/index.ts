import { Icons } from "@/components/icons";

export interface SideBarItem {
  type: string;
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
  label?: string;
  description?: string;
}

export interface NavItemWithChildren extends SideBarItem {
  items: NavItemWithChildren[];
}

export interface NavItemWithOptionalChildren extends SideBarItem {
  items?: NavItemWithChildren[];
}

export interface FooterItem {
  title: string;
  items: {
    title: string;
    href: string;
    external?: boolean;
  }[];
}

export type MainNavItem = NavItemWithOptionalChildren;

export type SidebarNavItem = NavItemWithChildren;
export type GeoDataType = [string, number | string][];
