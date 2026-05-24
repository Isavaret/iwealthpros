"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "กองทุนสำรองเลี้ยงชีพ", href: "#pvd" },
    { label: "บริการของเรา", href: "#services" },
    { label: "ติดต่อ", href: "#contact-form" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#0D1E45]/95 backdrop-blur shadow-lg" : "bg-[#0D1E45]"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <a href="#" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-[#C9A84C] tracking-wide">
            I Wealth
          </span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-white/80 hover:text-[#C9A84C] transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact-form"
            className="px-5 py-2 rounded-full bg-[#C9A84C] hover:bg-[#E0C070] text-[#0D1E45] font-semibold text-sm transition-colors"
          >
            ปรึกษาฟรี
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#0D1E45] border-t border-white/10 px-6 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-white/80 hover:text-[#C9A84C] transition-colors py-1"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact-form"
            onClick={() => setOpen(false)}
            className="mt-2 px-5 py-2 rounded-full bg-[#C9A84C] hover:bg-[#E0C070] text-[#0D1E45] font-semibold text-sm text-center transition-colors"
          >
            ปรึกษาฟรี
          </a>
        </div>
      )}
    </header>
  );
}
