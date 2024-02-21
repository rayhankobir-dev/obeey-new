/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/lib/utils/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/lib/utils/ui/form";
import { Switch } from "@/lib/utils/ui/switch";
import { toast } from "@/lib/utils/ui/use-toast";
import { useState } from "react";
import { useAuth, useAxios } from "@/context/AuthContext";
import SpinerLoading from "./spiner-loading";

const FormSchema = z.object({
  promotionalEmail: z.boolean().default(true).optional(),
  securityEmail: z.boolean(),
});

export function SwitchForm({ settings }: any) {
  const [updating, setUpdating] = useState(false);
  const { setUser }: any = useAuth();
  const api = useAxios();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: settings || {
      promotionalEmail: true,
      securityEmail: true,
    },
  });

  async function onSubmit(payload: z.infer<typeof FormSchema>) {
    try {
      setUpdating(true);
      const response = await api.put("/profile/email-setting", payload);
      setUser(response.data.data.user);
      toast({
        variant: "success",
        title: response.data.message,
        description:
          "You'll not getting our promotional email. Recommend to turn on to get offers.",
      });
    } catch (error: any) {
      toast({
        variant: "error",
        title: error.response.data.message,
        description: "Please check your internet conntection!.",
      });
    } finally {
      setUpdating(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <div>
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="promotionalEmail"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border px-4 py-3">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Marketing emails
                    </FormLabel>
                    <FormDescription>
                      Receive emails about new products, features, and more.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="securityEmail"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border px-4 py-3">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Security emails</FormLabel>
                    <FormDescription>
                      Receive emails about your account security.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled
                      aria-readonly
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button
          type="submit"
          variant="primary"
          className="min-w-fit w-full md:w-1/4 h-11 rounded-xl"
        >
          {updating ? (
            <SpinerLoading text="Save Changing.." textHidden={false} />
          ) : (
            "Save Changes"
          )}
        </Button>
      </form>
    </Form>
  );
}
