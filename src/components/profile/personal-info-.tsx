/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/lib/utils/ui/card";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/lib/utils/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/lib/utils/ui/select";
import { Input } from "@/lib/utils/ui/input";
import { Button } from "@/lib/utils/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Fragment, useEffect, useState } from "react";
import * as z from "zod";
import { Label } from "@/lib/utils/ui/label";
import { exclude } from "@/utils/helper";
import toast from "react-hot-toast";
import { useAuth, useAxios } from "@/context/AuthContext";
import SpinerLoading from "../spiner-loading";

// schema
const formSchema = z.object({
  firstName: z.string().min(3),
  lastName: z.string(),
  email: z.string().optional(),
  genreId: z.string().optional(),
  country: z.string().min(3),
  language: z.string().min(3),
  gender: z.string(),
});

type FormValues = z.infer<typeof formSchema>;
const languages = [
  { id: 1, name: "Bangla" },
  { id: 2, name: "English" },
  { id: 3, name: "Spanish" },
  { id: 4, name: "Hindi" },
  { id: 5, name: "Arabic" },
];
const genders = [
  { id: "male", name: "Male" },
  { id: "female", name: "Female" },
  { id: "other", name: "Other" },
];

export default function PersonalInformation() {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [genres, setGenres] = useState([]);
  const { user }: any = useAuth();
  const api = useAxios();

  useEffect(() => {
    (async function fetctGenres() {
      try {
        const response = await api.get("/genre");
        setGenres(response.data.data.genres);
      } catch (error: any) {
        console.log(error.response);
      } finally {
        setFetching(false);
      }
    })();
  }, []);

  // default
  const defaultValues = {
    firstName: user?.firstName || undefined,
    lastName: user?.lastName || undefined,
    email: user?.email || undefined,
    country: user?.country || undefined,
    language: user?.language || undefined,
    gender: user?.gender || undefined,
  };

  // create new form state
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true);
      const response = await api.put(
        "/profile/update",
        await exclude(data, ["email"])
      );
      toast.success(response.data.message);
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <CardContent className="py-5 mb-8">
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>Edit your personal information</CardDescription>
      </CardContent>
      <CardFooter className="px-3 md:px-5 flex flex-col gap-1 py-0">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="px-1 space-y-4 w-full relative"
          >
            <div className="grid md:grid-cols-4 gap-2">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="col-span-4 md:col-span-2 space-y-1">
                    <Label>First Name</Label>
                    <FormControl>
                      <Input
                        className="h-12 rounded-xl"
                        disabled={loading}
                        placeholder="First name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="font-light" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="col-span-4 md:col-span-2 space-y-1">
                    <Label>Last Name</Label>
                    <FormControl>
                      <Input
                        className="h-12 rounded-xl"
                        disabled={loading}
                        placeholder="Last name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="font-light" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="col-span-4 md:col-span-2 space-y-1">
                    <Label className="px-1">Email</Label>
                    <FormControl>
                      <Input
                        className="h-12 rounded-xl"
                        readOnly={true}
                        disabled={loading}
                        placeholder="example@gmail.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="font-light" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem className="col-span-4 md:col-span-2 space-y-1">
                    <Label>Country</Label>
                    <FormControl>
                      <Input
                        className="h-12 rounded-xl"
                        disabled={loading}
                        placeholder="Country name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="font-light" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem className="col-span-4 md:col-span-2 space-y-1">
                    <Label className="px-1">Gender</Label>
                    <Select
                      disabled={loading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={genders[0].name}
                    >
                      <FormControl className="h-12 rounded-xl">
                        <SelectTrigger>
                          <SelectValue
                            defaultValue={genders[0].name}
                            placeholder="Select your Gender"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {genders.map((lan) => (
                          <SelectItem key={lan.id} value={lan.name}>
                            {lan.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="font-light" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="genreId"
                render={({ field }) => (
                  <FormItem className="col-span-4 md:col-span-2 space-y-1">
                    <Label className="px-1">Genre</Label>
                    <Select
                      disabled={loading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={user?.genre?.genreName}
                    >
                      <FormControl className="h-12 rounded-xl">
                        <SelectTrigger>
                          <SelectValue
                            defaultValue={user?.genre?.id}
                            placeholder="Select genre"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {genres?.length > 0 &&
                          genres.map((genre: any) => (
                            <SelectItem key={genre.id} value={genre.id}>
                              {genre.genreName}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="font-light" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="language"
                render={({ field }) => (
                  <FormItem className="col-span-4 md:col-span-2 space-y-1">
                    <Label className="px-1">Language</Label>
                    <Select
                      disabled={loading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={languages[0].name}
                    >
                      <FormControl className="h-12 rounded-xl">
                        <SelectTrigger>
                          <SelectValue
                            defaultValue={languages[0].name}
                            placeholder="Select your Language"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {languages.map((lan: any) => (
                          <SelectItem key={lan.id} value={lan.name}>
                            {lan.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="font-light" />
                  </FormItem>
                )}
              />
            </div>

            <Button
              variant="primary"
              disabled={loading || fetching}
              className="h-11 rounded-xl min-w-fit w-full md:w-1/4"
              type="submit"
            >
              {loading ? (
                <SpinerLoading text="Save Changing.." textHidden={false} />
              ) : (
                "Save changes"
              )}
            </Button>
          </form>
        </Form>
      </CardFooter>
    </Fragment>
  );
}
