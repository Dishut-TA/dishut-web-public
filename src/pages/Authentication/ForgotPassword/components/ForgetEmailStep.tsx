import { useState } from "react";
import AuthCard from "./AuthCard";
import InputField from "@/components/InputField";

interface Props {
  onNext: (email: string) => void;
}

const ForgotEmailStep = ({ onNext }: Props) => {
  const [email, setEmail] = useState("");

  return (
    <AuthCard>
      <h2 className="text-xl font-bold text-center text-primary mb-2">
        Lupa Kata Sandi
      </h2>
      <p className="text-sm text-center text-primary mb-4">
        Masukkan emailmu untuk mendapatkan kode OTP
      </p>

      <InputField
        label="Email"
        name="email"
        value={email}
        placeholder="example@gmail.com"
        onChange={(e) => setEmail(e.target.value)}
      />

      <button
        onClick={() => onNext(email)}
        className="w-full bg-primary text-white p-3 rounded-full mt-2"
      >
        Kirim Kode OTP
      </button>
    </AuthCard>
  );
};

export default ForgotEmailStep;