import { useState } from "react";
import ForgotEmailStep from "./components/ForgetEmailStep";
import OtpStep from "./components/OtpStep";
import ResetPasswordStep from "./components/ResetPasswordStep";

type Step = "email" | "otp" | "reset";

const ForgotPassword = () => {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary p-4">
      {step === "email" && (
        <ForgotEmailStep
          onNext={(emailValue) => {
            setEmail(emailValue);
            setStep("otp");
          }}
        />
      )}

      {step === "otp" && (
        <OtpStep
          email={email}
          onNext={() => setStep("reset")}
        />
      )}

      {step === "reset" && (
        <ResetPasswordStep />
      )}
    </div>
  );
};

export default ForgotPassword;