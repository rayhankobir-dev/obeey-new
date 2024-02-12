import { Button } from "@/lib/utils/ui/button";
import {
  PopoverTrigger,
  PopoverContent,
  Popover,
} from "@/lib/utils/ui/popover";
import { Calendar } from "@/lib/utils/ui/calendar";
import {
  CardDescription,
  CardTitle,
  CardHeader,
  CardContent,
  Card,
  CardFooter,
} from "@/lib/utils/ui/card";
import SpLineAreaChart, {
  SPDataItem,
} from "@/components/charts/spline-area-chart";
import PopularItemsCard from "@/components/podcast/popular-card";
import GeoChart from "@/components/charts/geo-chart";
import BarChart from "@/components/charts/bar-chart";
import PieChart from "@/components/charts/pie-chart";
import EarningSvg from "@/assets/earnings.svg";
import { CalendarClock } from "lucide-react";
import { GeoDataType } from "@/types";

// eslint-disable-next-line react-refresh/only-export-components
export const geoData: GeoDataType = [
  ["Country", "Listners"],
  ["Germany", 200],
  ["United States", 300],
  ["Brazil", 400],
  ["Canada", 500],
  ["France", 600],
  ["Russia", 700],
  ["Bangladesh", 800],
];

const pieData: object[] = [
  {
    id: "hack",
    label: "hack",
    value: 321,
    color: "hsl(128, 70%, 50%)",
  },
  {
    id: "css",
    label: "css",
    value: 519,
    color: "hsl(139, 70%, 50%)",
  },
  {
    id: "js",
    label: "js",
    value: 519,
    color: "hsl(139, 70%, 50%)",
  },
];

const barData: [string, string | number][] = [
  ["January", 500],
  ["February", 300],
  ["March", 600],
  ["April", 500],
  ["May", 300],
  ["June", 700],
  ["July", 600],
];

const spData: SPDataItem[] = [
  { month: "January", impressions: 10000 },
  { month: "February", impressions: 12000 },
  { month: "March", impressions: 15000 },
  { month: "April", impressions: 1000 },
  { month: "May", impressions: 12000 },
];

export default function CreatorAnalytics() {
  return (
    <main className="flex flex-1 flex-col gap-4">
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <div className="space-y-1">
          <h1 className="font-semibold text-lg lg:text-2xl">
            Creator Dashboard
          </h1>
          <p className="text-sm font-light">
            While makeing Withdraw please check your payement method.
          </p>
        </div>
        <div className="md:ml-auto grid grid-cols-3 lg:flex items-center gap-2">
          <Button className="col-span-1" variant="outline">
            Today
          </Button>
          <Button className="col-span-1" variant="outline">
            This Month
          </Button>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="min-w-[280px] col-span-2 lg:col-span-1 justify-start text-left font-normal"
                id="date"
                variant="outline"
              >
                <CalendarClock className="mr-2 h-4 w-4" />
                June 01, 2023 - June 30, 2023
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-auto p-0">
              <Calendar initialFocus mode="range" numberOfMonths={2} />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-2">
        <Card className="bg-green-50 border-green-200">
          <CardHeader className="py-2">
            <CardDescription className="text-gray-600">
              All Contents
            </CardDescription>
            <CardTitle className="text-green-600">Total Content</CardTitle>
          </CardHeader>
          <CardContent>
            <CardTitle className="text-lg font-bold">1240</CardTitle>
          </CardContent>
        </Card>

        <Card className="bg-gray-50 border-gray-200">
          <CardHeader className="py-2">
            <CardDescription className="text-gray-700">
              Pending contents all time.
            </CardDescription>
            <CardTitle className="text-gray-600">Total Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <CardTitle className="text-lg font-bold">1240</CardTitle>
          </CardContent>
        </Card>

        <Card className="bg-rose-50 border-rose-200">
          <CardHeader className="py-2">
            <CardDescription className="text-gray-700">
              Rejected contents all time.
            </CardDescription>
            <CardTitle className="text-rose-600">Total Rejection</CardTitle>
          </CardHeader>
          <CardContent>
            <CardTitle className="text-lg font-bold">1240</CardTitle>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-blue-200">
          <CardHeader className="py-2">
            <CardDescription className="text-gray-700">
              Rejected contents all time.
            </CardDescription>
            <CardTitle className="text-blue-500">Approved Contents</CardTitle>
          </CardHeader>
          <CardContent>
            <CardTitle className="text-lg font-bold">1240</CardTitle>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="h-fit col-span-2 md:col-span-1">
          <CardHeader className="mb-3">
            <CardDescription>Listener Demographics</CardDescription>
            <CardTitle>Revenues($50,000)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <CardFooter className="w-full inline-flex justify-center py-2">
              <img className="w-28" src={EarningSvg} />
            </CardFooter>
            <Card className="bg-green-50 border-green-200">
              <CardHeader className="py-2">
                <CardTitle className="text-2xl">Aviable Balance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <h2 className="font-bold text-green-700 text-xl mb-4 tracking-tighter">
                  $1,200.00
                </h2>
                <Button variant={"primary"} className="w-fit px-10">
                  Withdraw
                </Button>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
        <div className="col-span-2 md:col-span-1">
          <PopularItemsCard />
        </div>
      </div>

      <Card className="space-y-2">
        <CardHeader>
          <CardDescription>Listener Demographics</CardDescription>
          <CardTitle>Content Impressions</CardTitle>
        </CardHeader>
        <CardContent className="h-48">
          <SpLineAreaChart showY={false} data={spData} />
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="flex flex-col">
          <CardHeader>
            <CardDescription>Listener Demographics</CardDescription>
            <CardTitle>Total Episodes</CardTitle>
          </CardHeader>
          <CardContent className="w-full h-96">
            <PieChart data={pieData} />
          </CardContent>
        </Card>
        <Card className="flex flex-col">
          <CardHeader>
            <CardDescription>Total Revenues</CardDescription>
            <CardTitle>Revenue Growth</CardTitle>
          </CardHeader>
          <CardContent className="w-full h-96">
            <BarChart title="Revenues" color="#13ad4c" data={barData} />
          </CardContent>
        </Card>
      </div>
      <Card className="mb-12">
        <CardHeader>
          <CardDescription>Geographical Distribution</CardDescription>
          <CardTitle>Top Countries</CardTitle>
        </CardHeader>
        <CardContent className="w-full h-[450px]">
          <GeoChart data={geoData} />
        </CardContent>
      </Card>
    </main>
  );
}
