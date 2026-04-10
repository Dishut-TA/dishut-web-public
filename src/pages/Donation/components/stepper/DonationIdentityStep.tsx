import React from "react";

interface DonationIdentityStepProps {
  name: string;
  email: string;
  phone: string;
  onChange: (field: "name" | "email" | "phone", value: string) => void;
}

const inputClassName =
  "w-full rounded-full border border-[#98C98A] bg-transparent px-5 py-4 text-sm text-primary outline-none transition-all duration-300 placeholder:text-primary/60 focus:border-primary";

const DonationIdentityStep: React.FC<DonationIdentityStepProps> = ({
  name,
  email,
  phone,
  onChange,
}) => {
  return (
    <div className="space-y-5">
      <div>
        <label className="mb-2 block text-sm font-medium text-primary">
          Nama
        </label>
        <input
          type="text"
          placeholder="Input Nama"
          value={name}
          onChange={(e) => onChange("name", e.target.value)}
          className={inputClassName}
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-primary">
          Email
        </label>
        <input
          type="email"
          placeholder="Cth: example@email.com"
          value={email}
          onChange={(e) => onChange("email", e.target.value)}
          className={inputClassName}
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-primary">
          No. Telepon
        </label>
        <input
          type="tel"
          placeholder="Cth: 08xxxxxxxxxx"
          value={phone}
          onChange={(e) => onChange("phone", e.target.value)}
          className={inputClassName}
        />
      </div>
    </div>
  );
};

export default DonationIdentityStep;