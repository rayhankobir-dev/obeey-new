import { ImSpinner2 } from "react-icons/im";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  text?: string;
  size?: number;
}

export default function SpinerLoading({
  className,
  text = "Loading..",
  size = 17,
}: Props) {
  return (
    <span className={cn("flex gap-2 items-center", className)}>
      <ImSpinner2 size={size} className="animate-spin" />
      {text}
    </span>
  );
}
