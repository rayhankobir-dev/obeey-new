/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, Fragment, useRef, useEffect } from "react";
import { ErrorMessage } from "@hookform/error-message";
import { Button } from "@/lib/utils/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/lib/utils/ui/dialog";
import { Input } from "@/lib/utils/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/lib/utils/ui/form";
import { Label } from "@/lib/utils/ui/label";
import * as z from "zod";
import { handleOtpModal } from "@/redux/actions/modal.action";
import { useSelector } from "react-redux";
import { otpFormSchema } from "@/validation/auth.validtion";
import { useAuth, useAxios } from "@/context/AuthContext";
import toast from "react-hot-toast";
import SpinerLoading from "../spiner-loading";

type LoginFormValues = z.infer<typeof otpFormSchema>;

export default function OtpVerification() {
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(false);
  const isOpen = useSelector((state: any) => state.modal.otp);
  const { setUser }: any = useAuth();
  const api = useAxios();

  // reference of the input element
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const otpForm = useForm<LoginFormValues>({
    resolver: zodResolver(otpFormSchema),
    defaultValues: {
      otp: "",
    },
  });

  useEffect(() => {
    inputRefs[0].current?.focus();
  });

  const handleInputChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    let { value } = e.target;
    value = value.replace(/\D/, "");
    const otpArray = otpForm.getValues("otp").split("");
    otpArray[index] = value;
    otpForm.setValue("otp", otpArray.join(""));

    if (value.length === 1 && index < inputRefs.length - 1) {
      inputRefs[index + 1].current?.focus();
    } else if (value.length === 0 && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  // function to handle paste event
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text");
    const digits = pasteData.match(/\d/g);
    if (digits && digits.length >= 4) {
      const otpArray = Array.from({ length: 4 }, (_, index) =>
        digits[index] ? digits[index] : ""
      );
      otpForm.setValue("otp", otpArray.join(""));
      inputRefs[0].current?.focus();
    }
  };

  const handleResentOtp = async () => {
    try {
      setSending(true);
      const response = await api.post("/auth/send-otp");
      toast.success(response.data.message);
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setSending(false);
    }
  };

  const onSubmit = async (payload: LoginFormValues) => {
    try {
      setLoading(true);
      const response = await api.post("/auth/verify-otp", payload);
      setUser(response.data.data);
      toast.success(response.data.message);
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
      handleOtpModal(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => handleOtpModal(!isOpen)}>
      <DialogContent className="sm:max-w-[400px] md:max-w-md z-[102] rounded-2xl">
        <Form {...otpForm}>
          <form
            onSubmit={otpForm.handleSubmit(onSubmit)}
            className="px-1 space-y-5 w-full relative"
          >
            <DialogHeader>
              <DialogTitle className="text-2xl">
                Please Complete Verification
              </DialogTitle>
              <DialogDescription>
                Check your email and please enter your verfication code.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-2">
              <div className="flex gap-2 items-center w-full">
                {Array.from({ length: 4 }).map((_, index) => (
                  <Fragment key={index}>
                    <Input
                      ref={inputRefs[index]}
                      className="text-center h-12 text-lg flex-1 text-gray-700"
                      inputMode="numeric"
                      type="tel"
                      min={1}
                      maxLength={1}
                      value={otpForm.watch("otp")[index] || ""}
                      onChange={(e) => handleInputChange(index, e)}
                      autoFocus={index === 0}
                      tabIndex={index === 0 ? 0 : -1}
                      onPaste={handlePaste}
                    />
                    {index < 3 && <Label className="text-gray-600">-</Label>}{" "}
                  </Fragment>
                ))}
              </div>
              <ErrorMessage
                errors={otpForm.formState.errors}
                name="otp"
                render={({ message }) => (
                  <p className="text-rose-500 font-light text-sm">{message}</p>
                )}
              />
            </div>
            <DialogFooter>
              <Button
                disabled={loading}
                variant={"primary"}
                className="w-full h-11 rounded-xl text-md font-normal"
                type="submit"
              >
                {loading ? (
                  <SpinerLoading text="Verifying.." textHidden={false} />
                ) : (
                  "Verify"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
        <div className="mx-auto inline-flex items-center text-gray-500 text-light text-md">
          <p>You didn't get the verification code?</p>
          <Button
            disabled={sending}
            onClick={handleResentOtp}
            variant={"link"}
            className="text-green-600 px-1 py-1 h-fit"
          >
            {sending ? "Sending.." : "Resend"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
