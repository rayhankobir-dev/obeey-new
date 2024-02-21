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
import { Eye, EyeOff, LockKeyhole, Mail, User } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/lib/utils/ui/button";
import { Input } from "@/lib/utils/ui/input";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useState } from "react";
import * as z from "zod";
import {
  handleLoginModal,
  handleRegisterModal,
} from "@/redux/actions/modal.action";
import { registerFormSchema } from "@/validation/auth.validtion";
import SpinerLoading from "../spiner-loading";
import { useAuth } from "@/context/AuthContext";

export type RegisterData = z.infer<typeof registerFormSchema>;

export default function RegisterModal() {
  const [passwordShow, setPasswordShow] = useState(false);
  const isOpen = useSelector((state: any) => state.modal.register);
  const { loading, signUp }: any = useAuth();

  const registerForm = useForm<RegisterData>({
    mode: "onChange",
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      firstName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (userInfo: RegisterData) => {
    await signUp(userInfo.firstName, userInfo.email, userInfo.password);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        registerForm.reset();
        registerForm.clearErrors();
        handleRegisterModal(!isOpen);
      }}
    >
      <DialogContent className="max-w-[410px] md:max-w-md rounded-2xl">
        <Form {...registerForm}>
          <form
            onSubmit={registerForm.handleSubmit(onSubmit)}
            className="px-1 space-y-5 w-full relative"
          >
            <DialogHeader>
              <DialogTitle className="text-2xl">
                Register Your Account
              </DialogTitle>
              <DialogDescription>
                Please enter your credentials and wait for verfication email.
              </DialogDescription>
            </DialogHeader>
            <Button
              type="button"
              variant={"outline"}
              className="w-full rounded-xl h-11 space-x-3 text-gray-600 "
            >
              <FcGoogle size={20} />
              <p>Login with Google</p>
            </Button>
            <div className="space-y-2">
              <FormField
                control={registerForm.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="col-span-1 ">
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3.5 top-3.5 h-5 w-5 text-muted-foreground" />
                        <Input
                          className="pl-12 h-12 rounded-xl"
                          disabled={loading}
                          placeholder="First name"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="font-light px-1 py-0" />
                  </FormItem>
                )}
              />
              <FormField
                control={registerForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="col-span-1 ">
                    <FormControl className="h-12 rounded-xl ">
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-3.5 h-5 w-5 text-muted-foreground" />
                        <Input
                          className="pl-12 h-12 rounded-xl"
                          disabled={loading}
                          placeholder="Email address"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="font-light px-1" />
                  </FormItem>
                )}
              />

              <FormField
                control={registerForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="col-span-1">
                    <FormControl>
                      <div className="relative group">
                        <LockKeyhole className="absolute left-3.5 top-3.5 h-5 w-5 text-muted-foreground" />
                        <Input
                          className="pl-12 h-12 rounded-xl"
                          type={passwordShow ? "text" : "password"}
                          disabled={loading}
                          placeholder="Password"
                          {...field}
                        />
                        {passwordShow ? (
                          <EyeOff
                            onClick={() => {
                              setPasswordShow(false);
                            }}
                            className="absolute z-10 right-3.5 top-3.5 h-5 w-5 hover:cursor-pointer text-gray-400 hover:text-gay-700 duration-300"
                          />
                        ) : (
                          <Eye
                            onClick={() => {
                              setPasswordShow(true);
                            }}
                            className="absolute z-10 right-3.5 top-3.5 h-5 w-5 hover:cursor-pointer text-gray-400 group-hover:text-gray-700 duration-300"
                          />
                        )}
                      </div>
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
                {loading ? <SpinerLoading text="Creating" /> : "Create Account"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
        <div className="mx-auto inline-flex items-center text-gray-500 text-light text-md">
          <p>Already have an account?</p>
          <Button
            onClick={() => {
              handleRegisterModal(false);
              handleLoginModal(true);
            }}
            variant={"link"}
            className="text-green-600 px-1 py-1 h-fit"
          >
            Login
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
