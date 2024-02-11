/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/lib/utils/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/lib/utils/ui/form";
import { Button } from "@/lib/utils/ui/button";
import { Input } from "@/lib/utils/ui/input";
import { FcGoogle } from "react-icons/fc";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "@/lib/utils/ui/use-toast";
import { useDispatch, useSelector } from "react-redux";
import { setLoginModal, setRegisterModal } from "@/redux/slices/modalSlice";
import * as z from "zod";

export type LoginFormData = {
  email: string;
  password: string;
};

export const loginFormSchema = z.object({
  email: z.string().min(10, { message: "Please enter valid email!" }),
  password: z.string(),
});

export type LoginData = z.infer<typeof loginFormSchema>;

export default function LoginModal() {
  const [loading, setLoading] = useState(false);
  const isOpen = useSelector((state: any) => state.modal.login);
  const dispatch = useDispatch();

  const loginForm = useForm<LoginData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: undefined,
      password: undefined,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      console.log(data);
      setLoading(true);
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please check your input value and retry.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => dispatch(setLoginModal(!isOpen))}>
      <DialogContent className="max-w-[400px] z-[102] rounded-2xl">
        <Form {...loginForm}>
          <form
            onSubmit={loginForm.handleSubmit(onSubmit)}
            className="px-1 space-y-5 w-full relative"
          >
            <DialogHeader>
              <DialogTitle className="text-2xl">Login Your Account</DialogTitle>
              <DialogDescription>
                Please enter your credentials and wait for verfication email.
              </DialogDescription>
            </DialogHeader>
            <Button
              variant={"outline"}
              className="w-full rounded-xl h-11 space-x-3 text-gray-600 "
            >
              <FcGoogle size={20} />
              <p>Login with Google</p>
            </Button>
            <div className="space-y-2">
              <FormField
                control={loginForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="col-span-1 ">
                    <FormControl className="h-12 rounded-xl">
                      <Input
                        disabled={loading}
                        placeholder="Email address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="font-light px-1" />
                  </FormItem>
                )}
              />

              <FormField
                control={loginForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="col-span-1">
                    <FormControl className="h-12 rounded-xl">
                      <Input
                        type="password"
                        disabled={loading}
                        placeholder="Password"
                        {...field}
                        className="py-5"
                      />
                    </FormControl>
                    <FormMessage className="font-light px-1" />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button
                disabled={loading}
                variant={"primary"}
                className="w-full h-11 rounded-xl"
                type="submit"
              >
                Login
              </Button>
            </DialogFooter>
          </form>
        </Form>
        <div className="mx-auto inline-flex items-center text-gray-500 text-light text-md">
          <p>Don't have an account?</p>
          <Button
            onClick={() => {
              dispatch(setLoginModal(false));
              dispatch(setRegisterModal(true));
            }}
            variant={"link"}
            className="text-green-600 px-1 py-1 h-fit"
          >
            Create Account
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
