import React, { useState } from "react";
import { type DonationFormData } from "./DonationStepper";

interface DonationIdentityStepProps {
  name: string;
  onChange: (field: keyof DonationFormData, value: any) => void;
}

const inputClassName =
  "w-full rounded-full border border-[#98C98A] bg-transparent px-5 py-4 text-sm text-primary outline-none transition-all duration-300 placeholder:text-primary/60 focus:border-primary";

const DonationIdentityStep: React.FC<DonationIdentityStepProps> = ({
  name,
  onChange,
}) => {
  const [isAnonymous, setIsAnonymous] = useState<boolean>(name === "Orang Baik");

  const handleAnonymousChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setIsAnonymous(checked);
    if (checked) {
      onChange("name", "Orang Baik");
    } else {
      onChange("name", "");
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="anonymous"
          checked={isAnonymous}
          onChange={handleAnonymousChange}
          className="h-5 w-5 rounded border-[#98C98A] text-primary focus:ring-primary accent-[#98C98A] cursor-pointer"
        />
        <label htmlFor="anonymous" className="text-sm font-medium text-primary cursor-pointer">
          Donasi tanpa identitas (Sembunyikan nama)
        </label>
      </div>

      {!isAnonymous && (
        <div>
          <label className="mb-2 block text-sm font-medium text-primary">
            Nama Lengkap
          </label>
          <input
            type="text"
            placeholder="Input Nama"
            value={name === "Orang Baik" ? "" : name}
            onChange={(e) => onChange("name", e.target.value)}
            className={inputClassName}
          />
          <label className="mb-2 mt-4 block text-sm font-medium text-primary">
            Alamat
          </label>
          <input
            type="text"
            placeholder="Input Alamat"
            value={name === "Orang Baik" ? "" : name}
            onChange={(e) => onChange("name", e.target.value)}
            className={inputClassName}
          />
        </div>
      )}
    </div>
  );
};

export default DonationIdentityStep;