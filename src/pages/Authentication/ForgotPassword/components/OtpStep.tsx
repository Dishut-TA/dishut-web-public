import { useState } from "react";
import AuthCard from "./AuthCard";

interface Props {
  email: string;
  onNext: () => void;
}

const OtpStep = ({ email, onNext }: Props) => {
  const [otp, setOtp] = useState(["", "", "", ""]);

  const handleChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  return (
    <AuthCard>
      <h2 className="text-xl font-bold text-center text-primary mb-2">
        Lupa Kata Sandi
      </h2>
      <p className="text-sm text-center text-primary mb-4">
        Kami membutuhkan emailmu {email} untuk mengirimkan kode OTP
      </p>

      <div className="flex justify-center gap-3 mb-4">
        {otp.map((digit, i) => (
          <input
            key={i}
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e.target.value, i)}
            className="w-12 h-12 text-center border-2 border-secondary rounded-full"
          />
        ))}
      </div>

      <button
        onClick={onNext}
        className="w-full bg-primary text-white p-3 rounded-full"
      >
        Selanjutnya
      </button>
    </AuthCard>
  );
};

export default OtpStep;