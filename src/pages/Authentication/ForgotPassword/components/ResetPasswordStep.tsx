import { useState } from "react";
import AuthCard from "./AuthCard";
import PasswordField from "../../../../components/PasswordField";

const ResetPasswordStep = () => {
  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });

  return (
    <AuthCard>
      <h2 className="text-xl font-bold text-center text-primary mb-2">
        Ganti Kata Sandi
      </h2>
      <p className="text-sm text-center text-primary mb-4">
        Pastikan kata sandi mudah diingat
      </p>

      <PasswordField
        label="Kata Sandi Baru"
        name="password"
        value={form.password}
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
      />

      <PasswordField
        label="Konfirmasi Kata Sandi Baru"
        name="confirmPassword"
        value={form.confirmPassword}
        onChange={(e) =>
          setForm({ ...form, confirmPassword: e.target.value })
        }
      />

      <button className="w-full bg-primary text-white p-3 rounded-full mt-2">
        Ganti Kata Sandi
      </button>
    </AuthCard>
  );
};

export default ResetPasswordStep;