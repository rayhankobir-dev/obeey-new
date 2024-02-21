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
import { useEffect, useState } from "react";
import * as z from "zod";
import { useAxios } from "@/context/AuthContext";
import { podcastSchema } from "@/validation/auth.validtion";
import toast from "react-hot-toast";
import SpinerLoading from "../spiner-loading";

const formSchema = z.object({
  title: z.string().min(10, {}),
  genreId: z.string(),
  language: z.string(),
  description: z.string().min(10, { message: "Please" }),
});

type ProductFormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
  initialData?: any | object;
}

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
  const [posting, setPosting] = useState(false);
  const [genres, setGenres] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedAudio, setSelectedAudio] = useState(null);
  const [imageError, setImageError] = useState("");
  const [audioError, setAudioError] = useState("");

  const title = initialData ? "Edit Content" : "Add New Content";
  const description = initialData
    ? "Please update your content and wait until approved."
    : "Please upload your original content and wait until approved.";
  const action = initialData ? "Save changes" : "Add Content";
  const api = useAxios();

  useEffect(() => {
    async function fetchGenre() {
      setLoading(true);
      const response = await api.get("/genre");
      setGenres(response.data.data.genres);
      setLoading(false);
    }
    fetchGenre();
  }, []);

  const defaultValues = initialData && initialData;

  // create new form state
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  // on submit action
  const onSubmit = async (payload: ProductFormValues) => {
    if (validateImage(selectedImage) && validateAudio(selectedAudio)) {
      try {
        setPosting(true);
        const formData = new FormData();
        formData.append("title", payload.title);
        formData.append("genreId", payload.genreId);
        formData.append("language", payload.language);
        formData.append("description", payload.description);
        formData.append("thumbnail", selectedImage);
        formData.append("audio", selectedAudio);

        const response = await api.post("/podcast", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success(response.data.message);
      } catch (error: any) {
        toast.error(error.response.data.message);
      } finally {
        setPosting(false);
      }
    }
  };

  function validateImage(selectedImage: any): boolean {
    const maxSize = 5 * 1024 * 1024;
    if (!selectedImage) {
      setImageError("Thumbnail is required");
      return false;
    } else if (selectedImage.size > maxSize) {
      setImageError("Thumbnail exceeds maximum file size (5MB)");
      return false;
    } else {
      const allowedFormats = ["jpg", "jpeg", "png", "webp"];
      const fileNameParts = selectedImage.name.split(".");
      const fileExtension =
        fileNameParts[fileNameParts.length - 1].toLowerCase();
      if (!allowedFormats.includes(fileExtension)) {
        setImageError("Thumbnail format is not supported(jpg,jpeg,png,webp)");
        return false;
      }
      setImageError("");
      return true;
    }
  }

  function validateAudio(selectedAudio: any): boolean {
    const maxSize = 50 * 1024 * 1024;
    if (!selectedAudio) {
      setAudioError("Audio is required");
      return false;
    } else if (selectedAudio.size > maxSize) {
      setAudioError("Audio exceeds maximum file size (50MB)");
      return false;
    } else {
      const allowedFormats = ["mp3", "wav", "mpeg"];
      const fileNameParts = selectedAudio.name.split(".");
      const fileExtension =
        fileNameParts[fileNameParts.length - 1].toLowerCase();
      if (!allowedFormats.includes(fileExtension)) {
        setAudioError("Audio format is not supported(mpeg,wav,mp3)");
        return false;
      } else {
        setAudioError("");
        return true;
      }
    }
  }

  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    validateImage(file);
  };

  const handleAudioChange = (event: any) => {
    const file = event.target.files[0];
    setSelectedAudio(file);
    validateAudio(file);
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
            <div className="grid md:grid-cols-2 gap-3">
              <div className="col-span-2">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="col-span-1">
                      <Label>Content Title</Label>
                      <FormControl>
                        <Textarea
                          disabled={loading}
                          placeholder="Title of your content"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="font-light" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-1">
                <FormField
                  control={form.control}
                  name="genreId"
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
                          {genres?.map((genre: any) => (
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
              </div>
              <div className="col-span-1">
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
              </div>
              <div className="col-span-1">
                <FormItem>
                  <Label>Thumbnail</Label>
                  <Input
                    name="thumbnail"
                    type="file"
                    className="cols-span-2"
                    onChange={handleImageChange}
                    placeholder="Upload your content thumbnail"
                  />
                  <Label className="font-light text-rose-500">
                    {imageError && imageError}
                  </Label>
                </FormItem>
              </div>
              <div className="col-span-1">
                <FormItem>
                  <Label>Audio</Label>
                  <Input
                    className="cols-span-2"
                    name="audio"
                    type="file"
                    onChange={handleAudioChange}
                    placeholder="Upload your content audio"
                  />
                  <Label className="font-light text-rose-500">
                    {audioError && audioError}
                  </Label>
                </FormItem>
              </div>

              <div className="col-span-2">
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
            </div>

            <Button
              variant="primary"
              disabled={loading || posting}
              className="ml-auto min-w-fit w-1/4"
              type="submit"
            >
              {posting ? (
                <SpinerLoading text="Creating.." textHidden={false} />
              ) : (
                action
              )}
            </Button>
          </form>
        </ScrollArea>
      </Form>
    </section>
  );
};
