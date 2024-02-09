// OtpInput.tsx

import React, { useState } from "react";

interface OtpInputProps {
  onVerify: (otp: string) => void;
}

export const OtpInput: React.FC<OtpInputProps> = ({ onVerify }) => {
  const [otp, setOtp] = useState("");

  const handleInputChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp.join(""));

    // Optional: Auto-focus next field if value is entered and it's not the last field
    if (value.length === 1 && index < 5) {
      const nextInputRef = refs.current[index + 1];
      if (nextInputRef) {
        nextInputRef.focus();
      }
    }
  };

  const refs = React.createRef<HTMLInputElement[]>([]);

  const handleSubmit = () => {
    if (otp.length === 6) {
      onVerify(otp);
    } else {
      // Handle incomplete OTP gracefully (e.g., display an error message)
      console.error("Please enter a complete 6-digit OTP.");
    }
  };

  return (
    <div className="otp-input">
      {Array.from({ length: 6 }).map((_, index) => (
        <OtpInputItem
          key={index}
          index={index}
          value={otp[index]}
          onChange={handleInputChange}
          ref={refs}
        />
      ))}
      <button onClick={handleSubmit}>Verify</button>
    </div>
  );
};

// OtpInputItem.tsx

interface OtpInputItemProps {
  index: number;
  value?: string;
  onChange: (value: string, index: number) => void;
  ref?: React.RefObject<HTMLInputElement>;
}

const OtpInputItem: React.FC<OtpInputItemProps> = ({
  index,
  value,
  onChange,
  ref,
}) => {
  return (
    <input
      type="text"
      maxLength={1}
      className={`otp-input-item ${index === 5 && "last"}`}
      value={value}
      onChange={(e) => onChange(e.target.value, index)}
      ref={ref}
    />
  );
};
