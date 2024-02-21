import { Button } from "@/lib/utils/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/lib/utils/ui/card";
import { Separator } from "@/lib/utils/ui/separator";
import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function Subscription() {
  return (
    <section className="w-full py-6">
      <div className=" grid items-center justify-center gap-4 px-4 text-center lg:gap-10">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tighter">
            Choose your plan
          </h1>
          <p className="mx-auto max-w-[600px] text-gray-500 md:text-md/relaxed ">
            Start your 14-day trial. You can cancel at any time.
          </p>
        </div>
        <div className="w-full grid sm:grid-cols-2 md:grid-cols-3 gap-2">
          <Card className="flex flex-col rounded-lg border border-gray-100 overflow-hidden">
            <CardHeader className="flex-1 grid items-center justify-center p-6 bg-gray-200">
              <div className="space-y-2 text-center">
                <h3 className="text-xl font-bold">6 / Months Subscription</h3>
                <p className="text-sm text-gray-500">Billed monthly</p>
                <h4 className="text-2xl font-bold">$15</h4>
              </div>
            </CardHeader>
            <Separator />
            <CardContent className="py-12 list-none space-y-3 text-md  font-medium text-green-600">
              <li className="inline-flex items-center gap-2 ">
                <CheckCircle2 className="h-5" /> Unlimited Listning
              </li>
              <li className="inline-flex items-center gap-2 ">
                <CheckCircle2 className="h-5" />
                More Economical Subscription
              </li>
              <li className="inline-flex items-center gap-2 ">
                <CheckCircle2 className="h-5" />
                Various Content Exploration
              </li>
              <li className="inline-flex items-center gap-2 ">
                <CheckCircle2 className="h-5" />
                Advertisement Free Listning
              </li>
            </CardContent>
            <CardFooter className="p-0">
              <Button
                variant={"primary"}
                className="w-full rounded-none h-12"
                asChild
              >
                <Link to="https://buy.stripe.com/test_8wM7t95IvbhZdjO144">
                  Choose 1 Month
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="flex flex-col rounded-lg border border-gray-100 overflow-hidden">
            <CardHeader className="flex-1 grid items-center justify-center p-6 bg-gray-200">
              <div className="space-y-2 text-center">
                <h3 className="text-xl font-bold">6 / Months Subscription</h3>
                <p className="text-sm text-gray-500">Save 10% with this plan</p>
                <h4 className="text-2xl font-bold">$54</h4>
              </div>
            </CardHeader>
            <Separator />
            <CardContent className="py-14 list-none space-y-3 text-md  font-medium text-green-600">
              <li className="inline-flex items-center gap-2 ">
                <CheckCircle2 className="h-5" /> Unlimited Listning
              </li>
              <li className="inline-flex items-center gap-2 ">
                <CheckCircle2 className="h-5" />
                More Economical Subscription
              </li>
              <li className="inline-flex items-center gap-2 ">
                <CheckCircle2 className="h-5" />
                Various Content Exploration
              </li>
              <li className="inline-flex items-center gap-2 ">
                <CheckCircle2 className="h-5" />
                Advertisement Free Listning
              </li>
            </CardContent>
            <CardFooter className="p-0">
              <Button
                variant={"primary"}
                className="w-full rounded-none h-12"
                asChild
              >
                <Link to="https://buy.stripe.com/test_8wM7t95IvbhZdjO144">
                  Choose 6 Months
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="flex flex-col rounded-lg border border-gray-100 overflow-hidden">
            <CardHeader className="flex-1 grid items-center justify-center p-6 bg-gray-200">
              <div className="space-y-2 text-center">
                <h3 className="text-xl font-bold">1 / Year Subscription</h3>
                <p className="text-sm text-gray-500">Save 20% with this plan</p>
                <h4 className="text-2xl font-bold">$96</h4>
              </div>
            </CardHeader>
            <Separator />
            <CardContent className="py-12 list-none space-y-3 text-md  font-medium text-green-600">
              <li className="inline-flex items-center gap-2 ">
                <CheckCircle2 className="h-5" /> Unlimited Listning
              </li>
              <li className="inline-flex items-center gap-2 ">
                <CheckCircle2 className="h-5" />
                More Economical Subscription
              </li>
              <li className="inline-flex items-center gap-2 ">
                <CheckCircle2 className="h-5" />
                Various Content Exploration
              </li>
              <li className="inline-flex items-center gap-2 ">
                <CheckCircle2 className="h-5" />
                Advertisement Free Listning
              </li>
            </CardContent>
            <CardFooter className="p-0">
              <Button
                variant={"primary"}
                className="w-full rounded-none h-12"
                asChild
              >
                <Link to="https://buy.stripe.com/test_8wM7t95IvbhZdjO144">
                  Choose 1 Year
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}
