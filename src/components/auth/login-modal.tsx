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
import {
  handleLoginModal,
  handleRegisterModal,
} from "@/redux/actions/modal.action";
import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/lib/utils/ui/button";
import { Input } from "@/lib/utils/ui/input";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useState } from "react";
import * as z from "zod";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "@/redux/features/api.slice";
import { setTokens, setUser } from "@/redux/features/auth.slice";
import SpinerLoading from "../spiner-loading";
import { toast } from "@/lib/utils/ui/use-toast";
import { loginFormSchema } from "@/validation/auth.validtion";

export type LoginFormData = z.infer<typeof loginFormSchema>;

export default function LoginModal() {
  const [loading, setLoading] = useState(false);
  const [passwordShow, setPasswordShow] = useState(true);
  const isOpen = useSelector((state: any) => state.modal.login);
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  const loginForm = useForm<LoginFormData>({
    mode: "onChange",
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (credentials: LoginFormData) => {
    try {
      setLoading(true);
      const response: any = await login(credentials);
      dispatch(setTokens(response.data.data.tokens));
      dispatch(setUser(response.data.data.user));
      handleRegisterModal(false);
    } catch (error) {
      toast({
        variant: "error",
        title: "Email or Password is Incorrect!",
        description: "Please check your credentials and retry.",
      });
    } finally {
      setLoading(false);
      loginForm.reset();
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        loginForm.reset();
        loginForm.clearErrors();
        handleLoginModal(!isOpen);
      }}
    >
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
              type="button"
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
                    <FormControl>
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
                control={loginForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="col-span-1">
                    <FormControl>
                      <div className="relative group">
                        <LockKeyhole className="absolute left-3.5 top-3.5 h-5 w-5 text-muted-foreground" />
                        <Input
                          className="pl-12 h-12 rounded-xl "
                          type={passwordShow ? "password" : "text"}
                          disabled={loading}
                          placeholder="Password"
                          {...field}
                        />
                        {passwordShow ? (
                          <Eye
                            onClick={() => {
                              setPasswordShow(false);
                            }}
                            className="absolute z-10 right-3.5 top-3.5 h-5 w-5 hover:cursor-pointer text-gray-400 group-hover:text-gay-700 duration-300"
                          />
                        ) : (
                          <EyeOff
                            onClick={() => {
                              setPasswordShow(true);
                            }}
                            className="absolute z-10 right-3.5 top-3.5 h-5 w-5 hover:cursor-pointer text-gray-400 group-hover:text-gay-700 duration-300"
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
                {isLoading ? (
                  <SpinerLoading
                    className="text-md text-white"
                    text="Authenticating"
                  />
                ) : (
                  "Login"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
        <div className="mx-auto inline-flex items-center text-gray-500 text-light text-md">
          <p>Don't have an account?</p>
          <Button
            onClick={() => {
              handleLoginModal(false);
              handleRegisterModal(true);
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
