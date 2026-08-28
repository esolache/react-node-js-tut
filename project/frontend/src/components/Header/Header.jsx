import { NavLink } from "react-router-dom";
import { Phone } from "lucide-react";

// Main nav links — shown in the red bar under the logo.
const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Book Online", to: "/book-online" },
  { label: "Contact", to: "/contact" },
  { label: "About", to: "/about" },
  { label: "Todo Tutorial", to: "/todo-tutorial" },
];

function navLinkClasses({ isActive }) {
  return [
    "text-white font-bold text-[15px] tracking-tight py-2 transition-colors",
    "hover:text-neutral-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-sm",
    isActive ? "underline underline-offset-8 decoration-2" : "",
  ].join(" ");
}

export default function Header() {
  return (
    <header className="w-full font-sans">
      {/* Top utility bar */}
      <div className="bg-brand-dark text-white">
        <div className="mx-auto max-w-[1400px] flex items-center justify-between px-6 py-2.5">
          {/* TODO: replace with real availability / tagline text */}
          <span className="font-bold text-sm md:text-base hidden sm:block">
            Service Available 24/7
          </span>

          {/* TODO: replace with real phone number */}
          <a
            href="tel:0000000000"
            className="hidden sm:flex items-center gap-2 hover:text-neutral-200 transition-colors"
          >
            <Phone size={16} />
            <span className="font-bold text-sm md:text-base">(000) 000-0000</span>
          </a>

          <div className="flex items-center gap-2.5 ml-auto sm:ml-0">
            <NavLink
              to="/book-online"
              className="bg-brand-primary hover:opacity-90 transition-opacity text-white text-xs md:text-sm font-bold uppercase tracking-wide px-4 py-2.5 rounded-sm"
            >
              Book Online
            </NavLink>
            <NavLink
              to="/contact"
              className="bg-brand-primary hover:opacity-90 transition-opacity text-white text-xs md:text-sm font-bold uppercase tracking-wide px-4 py-2.5 rounded-sm"
            >
              Contact
            </NavLink>
          </div>
        </div>
      </div>

      {/* Main nav bar */}
      <div className="bg-brand-primary">
        <div className="mx-auto max-w-[1400px] flex items-center gap-10 px-6 py-3">
          {/* Logo — TODO: swap in the real logo image/SVG from src/assets */}
          <NavLink to="/" className="flex items-center gap-3 shrink-0">
            <div className="leading-none">
              <div className="text-white font-black text-2xl md:text-[28px] tracking-tight">
                SOLACHE CO
              </div>
              <div className="text-white text-[11px] md:text-xs font-semibold tracking-wide -mt-0.5">
                Tagline goes here
              </div>
            </div>
          </NavLink>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-7 flex-1">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.to} to={link.to} className={navLinkClasses} end={link.to === "/"}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Mobile fallback — TODO: wire up a real mobile menu (drawer, etc.) */}
          <button className="md:hidden ml-auto text-white font-bold text-sm">Menu</button>
        </div>
      </div>
    </header>
  );
}
