/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/lib/utils/ui/card";
import { Image } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/lib/utils/ui/avatar";
import { Button } from "@/lib/utils/ui/button";
import { Separator } from "@/lib/utils/ui/separator";
import { Heading } from "@/lib/utils/ui/heading";
import { SwitchForm } from "./email-settings";
import ChangePassword from "./profile/change-password";
import PersonalInformation from "./profile/personal-info-";
import { useEffect, useState } from "react";
import { Label } from "@/lib/utils/ui/label";
import SpinerLoading from "./spiner-loading";
import { useAuth, useAxios } from "@/context/AuthContext";
import toast from "react-hot-toast";

function validateImage(selectedImage: any): boolean {
  const maxSize = 5 * 1024 * 1024;
  if (!selectedImage) {
    toast.error("Thumbnail is required");
    return false;
  } else if (selectedImage.size > maxSize) {
    toast.error("Thumbnail exceeds maximum file size (5MB)");
    return false;
  } else {
    const allowedFormats = ["jpg", "jpeg", "png", "webp"];
    const fileNameParts = selectedImage.name.split(".");
    const fileExtension = fileNameParts[fileNameParts.length - 1].toLowerCase();
    if (!allowedFormats.includes(fileExtension)) {
      toast.error("Thumbnail format is not supported(jpg,jpeg,png,webp)");
      return false;
    }
    return true;
  }
}

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const { user, setUser }: any = useAuth();
  const api = useAxios();

  useEffect(() => {
    async function fetchInfo() {
      try {
        setLoading(true);
        const response = await api.get("/profile");
        setUser(response.data.data);
      } catch (error: any) {
        console.log(error.response);
      } finally {
        setLoading(false);
      }
    }

    fetchInfo();
  }, []);

  const [avatarImage, setAvatarImage] = useState(user?.avatar || null);
  const [coverImage, setCoverImage] = useState(user?.coverImage || null);

  const handleAvatarChange = async (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarImage(reader.result);
      };
      reader.readAsDataURL(file);

      if (validateImage(file)) {
        const formData = new FormData();
        formData.append("avatar", file);
        toast.promise(
          api.put("/profile/update-avatar", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }),
          {
            loading: "Updating...",
            success: (response: any) => {
              setUser(response.data.data.user);
              return response.data.message;
            },
            error: (error: any) => {
              return error.response.data.message;
            },
          }
        );
      }
    }
  };

  const handleCoverChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImage(reader.result);
      };
      reader.readAsDataURL(file);

      if (validateImage(file)) {
        const formData = new FormData();
        formData.append("coverImage", file);
        toast.promise(
          api.put("/profile/update-cover", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }),
          {
            loading: "Updating...",
            success: (response: any) => {
              setUser(response.data.data.user);
              return response.data.message;
            },
            error: (error: any) => {
              return error.response.data.message;
            },
          }
        );
      }
    }
  };

  return (
    <div className="space-y-10 mb-10">
      <div className="flex justify-between">
        <Heading title="Profile" description="Your personal information" />
        <Button variant={"primaryOutline"}>Go Home</Button>
      </div>
      {loading ? (
        <SpinerLoading />
      ) : (
        <Card className="grid grid-cols-1 md:grid-cols-5 border-none shadow-none space-y-4 md:space-y-0 md:space-x-4">
          <Card className="py-4 md:col-span-3 pt-0 overflow-hidden">
            <CardHeader className="relative flex flex-col gap-1 justify-center items-center bg-gray-300 overflow-hidden">
              <>
                <img
                  className="absolute top-0 left-0 w-full opacity-50 text-muted-foreground "
                  src={coverImage}
                />
                <input
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={handleCoverChange}
                  id="coverImageInput"
                />
              </>
              <Button
                className="h-8 w-8 absolute top-2 right-2 bg-gray-700 text-white p-2 rounded-full"
                asChild
              >
                <Label htmlFor="coverImageInput">
                  <Image />
                </Label>
              </Button>
              <div className="flex flex-col gap-1 justify-center items-center">
                <div className="relative">
                  <Avatar className="w-24 h-24">
                    <AvatarImage
                      className="aspect-square"
                      src={avatarImage}
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <input
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={handleAvatarChange}
                    id="avatarInput"
                  />

                  <Button
                    className="h-8 w-8 absolute top-8 -right-4 bg-gray-700 text-white p-2 rounded-full"
                    asChild
                  >
                    <Label htmlFor="avatarInput">
                      <Image />
                    </Label>
                  </Button>
                </div>
                <CardTitle className="relative text-2xl font-bold ">
                  {user.firstName} {user.lastName}
                </CardTitle>
              </div>
            </CardHeader>
            <Separator className="mb-4" />
            <PersonalInformation />
          </Card>

          <Card className="col-span-2 flex flex-col gap-3 border-none shadow-none">
            <ChangePassword />

            <Card className="py-5 h-fit">
              <CardContent>
                <CardTitle>Email Settings</CardTitle>
                <CardDescription className="mt-2">
                  Change your notification and email settings
                </CardDescription>
              </CardContent>
              <CardFooter className="flex flex-col gap-1 py-0">
                <SwitchForm settings={user.settings} />
              </CardFooter>
            </Card>
          </Card>
        </Card>
      )}
    </div>
  );
}
