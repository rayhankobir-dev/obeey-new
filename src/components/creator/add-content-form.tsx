/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/lib/utils/ui/button";
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
import { ScrollArea } from "@/lib/utils/ui/scroll-area";
import { Separator } from "@/lib/utils/ui/separator";
import { Textarea } from "@/lib/utils/ui/textarea";
import { Heading } from "@/lib/utils/ui/heading";
import { Label } from "@/lib/utils/ui/label";
import { Input } from "@/lib/utils/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import * as z from "zod";

const formSchema = z.object({
  title: z
    .string()
    .min(10, { message: "Title must grater than 10 characters" }),
  genre: z.string(),
  language: z.string(),
  description: z
    .string()
    .min(10, { message: "Description must grater than 10 characters" }),
  thumbnail: z.string().url({ message: "Please enter thumbnail image" }),
  audio: z.string().url({ message: "Please enter audio file" }),
});

type ProductFormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
  initialData?: any | object;
}

const genres = [
  { id: 1, name: "History" },
  { id: 2, name: "Cribe" },
  { id: 3, name: "Finance" },
  { id: 4, name: "Word" },
  { id: 5, name: "Books" },
];

const languages = [
  { id: 1, name: "Bangla" },
  { id: 2, name: "English" },
  { id: 3, name: "Spanish" },
  { id: 4, name: "Hindi" },
  { id: 5, name: "Arabic" },
];

export const ContentCreateForm: React.FC<ProductFormProps> = ({
  initialData,
}) => {
  const [loading, setLoading] = useState(false);
  const title = initialData ? "Edit Content" : "Add New Content";
  const description = initialData
    ? "Please update your content and wait until approved."
    : "Please upload your original content and wait until approved.";
  const action = initialData ? "Save changes" : "Add Content";

  const defaultValues = initialData
    ? initialData
    : {
        title: "",
        genre: "",
        language: "",
        thumbnail: "",
        description: "",
        audio: "",
      };

  // create new form state
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  // on submit action
  const onSubmit = async (data: ProductFormValues) => {
    try {
      console.log(data);
      setLoading(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <Heading title={title} description={description} />
      </div>
      <Separator />
      <Form {...form}>
        <ScrollArea className="h-full mt-3">
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="px-1 space-y-8 w-full relative"
          >
            <div className="md:grid md:grid-cols-2 lg:grid-cols-3 gap-x-5 md:gap-y-3">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="col-span-1">
                    <Label>Content Title</Label>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Title of your content"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="font-light" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="genre"
                render={({ field }) => (
                  <FormItem>
                    <Label>Genre</Label>
                    <Select
                      disabled={loading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            defaultValue={field.value}
                            placeholder="Slect genre of Content"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {genres.map((genre) => (
                          <SelectItem key={genre.id} value={genre.name}>
                            {genre.name}
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
                  <FormItem>
                    <Label>Language</Label>
                    <Select
                      disabled={loading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            defaultValue={field.value}
                            placeholder="Select player's Genre"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {languages.map((lan) => (
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
                name="thumbnail"
                render={({ field }) => (
                  <FormItem className="col-span-5">
                    <Label>Thumbnail</Label>
                    <FormControl>
                      <Input
                        type="file"
                        disabled={loading}
                        placeholder="Upload your content thumbnail"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="font-light" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="audio"
                render={({ field }) => (
                  <FormItem className="col-span-5">
                    <Label>Audio File</Label>
                    <FormControl>
                      <Input
                        type="file"
                        disabled={loading}
                        placeholder="Upload your content thumbnail"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="font-light" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="col-span-5">
                    <Label>Description</Label>
                    <FormControl>
                      <Textarea
                        disabled={loading}
                        placeholder="Short description of your content"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="font-light" />
                  </FormItem>
                )}
              />
            </div>

            <Button
              variant="primary"
              disabled={loading}
              className="ml-auto min-w-fit w-1/4"
              type="submit"
            >
              {action}
            </Button>
          </form>
        </ScrollArea>
      </Form>
    </section>
  );
};
