import { SideBarItem } from "@/types";

export type User = {
  id: number;
  name: string;
  company: string;
  role: string;
  verified: boolean;
  status: string;
};
export const users: User[] = [
  {
    id: 1,
    name: "Candice Schiner",
    company: "Dell",
    role: "Frontend Developer",
    verified: false,
    status: "Active",
  },
  {
    id: 2,
    name: "John Doe",
    company: "TechCorp",
    role: "Backend Developer",
    verified: true,
    status: "Active",
  },
  {
    id: 3,
    name: "Alice Johnson",
    company: "WebTech",
    role: "UI Designer",
    verified: true,
    status: "Active",
  },
  {
    id: 4,
    name: "David Smith",
    company: "Innovate Inc.",
    role: "Fullstack Developer",
    verified: false,
    status: "Inactive",
  },
  {
    id: 5,
    name: "Emma Wilson",
    company: "TechGuru",
    role: "Product Manager",
    verified: true,
    status: "Active",
  },
  {
    id: 6,
    name: "James Brown",
    company: "CodeGenius",
    role: "QA Engineer",
    verified: false,
    status: "Active",
  },
  {
    id: 7,
    name: "Laura White",
    company: "SoftWorks",
    role: "UX Designer",
    verified: true,
    status: "Active",
  },
  {
    id: 8,
    name: "Michael Lee",
    company: "DevCraft",
    role: "DevOps Engineer",
    verified: false,
    status: "Active",
  },
  {
    id: 9,
    name: "Olivia Green",
    company: "WebSolutions",
    role: "Frontend Developer",
    verified: true,
    status: "Active",
  },
  {
    id: 10,
    name: "Robert Taylor",
    company: "DataTech",
    role: "Data Analyst",
    verified: false,
    status: "Active",
  },
];

export const user = {
  id: 10,
  name: "Robert Taylor",
  email: "rayhan@gmail.com",
  image: "",
  company: "DataTech",
  role: "Data Analyst",
  verified: false,
  status: "Active",
};

export type Employee = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  date_of_birth: string; // Consider using a proper date type if possible
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  longitude?: number; // Optional field
  latitude?: number; // Optional field
  job: string;
  profile_picture?: string | null; // Profile picture can be a string (URL) or null (if no picture)
};

export interface SideBar {
  USER: SideBarItem[];
  CREATOR: SideBarItem[];
  ADMIN: SideBarItem[];
}

export const sideMenu: SideBar = {
  USER: [
    {
      type: "label",
      title: "Discover",
      icon: "globe",
      description: "Discover podcasts",
    },

    {
      type: "link",
      title: "Listen Now",
      href: "/listen-now",
      icon: "playCircle",
      label: "Listen Now",
    },
    {
      type: "link",
      title: "Browse",
      href: "/podcast",
      icon: "layoutGrid",
      label: "Browse",
    },
    {
      type: "link",
      title: "Genres",
      href: "/genres",
      icon: "radio",
      label: "Genres",
    },
    {
      type: "label",
      title: "Library",
      icon: "library",
      description: "Your all Libraries",
    },
    {
      type: "link",
      title: "Playlists",
      href: "/playlists",
      icon: "musicList",
      label: "Playlists",
    },
    {
      type: "link",
      title: "Made for You",
      href: "/made-for-you",
      icon: "user",
      label: "Made for You",
    },
    {
      type: "link",
      title: "Artists",
      href: "/artists",
      icon: "mic2",
      label: "reports",
    },
    {
      type: "link",
      title: "Subscription",
      href: "/subscription",
      icon: "coinHand",
      label: "reports",
    },
  ],
  CREATOR: [
    {
      type: "label",
      title: "Discover",
      icon: "globe",
      description: "Discover podcasts",
    },

    {
      type: "link",
      title: "Listen Now",
      href: "/listen-now",
      icon: "playCircle",
      label: "Listen Now",
    },
    {
      type: "link",
      title: "Browse",
      href: "/podcast",
      icon: "layoutGrid",
      label: "Browse",
    },
    {
      type: "link",
      title: "Genres",
      href: "/genres",
      icon: "radio",
      label: "Genres",
    },
    {
      type: "label",
      title: "Library",
      icon: "library",
      description: "Your all Libraries",
    },
    {
      type: "link",
      title: "Playlists",
      href: "/playlists",
      icon: "musicList",
      label: "Playlists",
    },
    {
      type: "link",
      title: "Made for You",
      href: "/made-for-you",
      icon: "user",
      label: "Made for You",
    },
    {
      type: "link",
      title: "Artists",
      href: "/artists",
      icon: "mic2",
      label: "reports",
    },
    {
      type: "link",
      title: "Subscriptions",
      href: "/subscription",
      icon: "coinHand",
      label: "Subscriptions",
    },
    {
      type: "label",
      title: "Your Contents",
      icon: "podcast",
      description: "Your all contents",
    },
    {
      type: "link",
      title: "Analytics",
      href: "/creator-analytics",
      icon: "stastics",
      label: "Analytics",
    },
    {
      type: "link",
      title: "Podcasts",
      href: "/my-podcast",
      icon: "musicList",
      label: "Playlists",
    },
  ],
  ADMIN: [
    {
      type: "label",
      title: "Dashboard",
      icon: "globe",
      description: "Admin dashboard controls",
    },

    {
      type: "link",
      title: "Analytics",
      href: "/admin-analytics",
      icon: "stastics",
      label: "Analytics",
    },
    {
      type: "link",
      title: "Artists",
      href: "/artists",
      icon: "mic2",
      label: "Artists",
    },
    {
      type: "link",
      title: "Listners",
      href: "/listners",
      icon: "user",
      label: "Listners",
    },
    {
      type: "label",
      title: "Contents",
      icon: "library",
      description: "Informations about contents",
    },
    {
      type: "link",
      title: "Contents",
      href: "/playlists",
      icon: "podcast",
      label: "Playlists",
    },
    {
      type: "link",
      title: "Payrolls",
      href: "/payrolls",
      icon: "pay",
      label: "Made for You",
    },
    {
      type: "link",
      title: "Transactions",
      href: "/transaction",
      icon: "transaction",
      label: "Transaction",
    },
  ],
};
