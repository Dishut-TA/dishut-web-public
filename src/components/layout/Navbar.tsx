import { useState } from "react";
import Button from "../Button";
import { useNavigate } from "react-router-dom";

const menus = [
  "Beranda",
  "Peta Kekritisan",
  "Monitoring",
  "Donasi",
  "Investasi",
  "Tentang Kami",
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate()

  return (
    <nav className="absolute top-0 left-0 w-full z-50 bg-customWhite">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 flex items-center justify-between">
        
        {/* LOGO */}
        <div className="font-bold text-lg">
          LOGO
        </div>

        {/* DESKTOP MENU */}
        <ul className="hidden md:flex gap-6 text-primary text-sm font-semibold">
          {menus.map((item) => (
            <li key={item} className="cursor-pointer hover:text-tertiary transition-all">
              {item}
            </li>
          ))}
        </ul>

        {/* ACTION BUTTON */}
        <div className="hidden md:flex gap-3">
            <Button label="Masuk" variant="outline" onClick={() => navigate("/login")} />
            <Button label="Buat Akun" onClick={() => navigate("/register")}/>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-primary"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-customWhite text-primary px-4 pb-4 shadow-md">
          {menus.map((item) => (
            <p key={item} className="py-2 border-b">
              {item}
            </p>
          ))}

          <div className="flex flex-col gap-2 mt-3">
            <Button label="Masuk"/>
            <Button label="Buat Akun"/>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;