import { useState } from "react";
import Button from "../Button";
import { useNavigate, NavLink } from "react-router-dom";

const menus = [
  { label: "Beranda", path: "/" },
  { label: "Pemetaan", path: "/pemetaan" },
  { label: "Monitoring", path: "/monitoring" },
  { label: "Donasi", path: "/donasi" },
  { label: "Investasi", path: "/investasi" },
  { label: "Tentang Kami", path: "/tentang-kami" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="absolute top-0 left-0 w-full z-50 bg-customWhite">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 flex items-center justify-between">

        {/* LOGO */}
        <div className="font-bold text-lg cursor-pointer" onClick={() => navigate("/")}>
          LOGO
        </div>

        {/* DESKTOP MENU */}
        <ul className="hidden md:flex gap-6 text-sm font-semibold">
          {menus.map((item) => (
            <li key={item.label}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `transition-all ${
                    isActive
                      ? "text-tertiary"
                      : "text-primary hover:text-tertiary"
                  }`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* ACTION BUTTON */}
        <div className="hidden md:flex gap-3">
          <Button
            label="Masuk"
            variant="outline"
            onClick={() => navigate("/login")}
          />
          <Button
            label="Buat Akun"
            onClick={() => navigate("/register")}
          />
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
            <NavLink
              key={item.label}
              to={item.path}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block py-2 border-b transition ${
                  isActive
                    ? "text-tertiary font-semibold"
                    : "hover:text-tertiary"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}

          <div className="flex flex-col gap-2 mt-3">
            <Button
              label="Masuk"
              onClick={() => {
                navigate("/login");
                setOpen(false);
              }}
            />
            <Button
              label="Buat Akun"
              onClick={() => {
                navigate("/register");
                setOpen(false);
              }}
            />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;