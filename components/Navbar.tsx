"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const links = [
  { label: "กองทุนสำรองเลี้ยงชีพ", href: "/#pvd" },
  { label: "บริการของเรา", href: "/#services" },
  { label: "บทความ", href: "/articles" },
  { label: "ติดต่อ", href: "/#contact-form" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0A192C]/95 backdrop-blur shadow-lg shadow-black/30"
          : "bg-[#0A192C]"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-18 py-2">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo-iwealthpros.jpg"
            alt="I Wealth Pros"
            width={96}
            height={102}
            priority
            className="w-10 h-10 object-cover rounded-lg ring-1 ring-[#CBAE6B]/40"
          />
          <span className="leading-none">
            <span className="block text-xl font-bold tracking-[0.12em] text-gold-metallic">
              I WEALTH
            </span>
            <span className="block text-[11px] font-semibold tracking-[0.35em] text-[#CBAE6B]/70">
              PROS
            </span>
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-white/80 hover:text-[#CBAE6B] transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/#contact-form"
            className="px-5 py-2 rounded-full bg-gold-metallic text-[#0A192C] font-semibold text-sm transition-all hover:shadow-lg hover:shadow-[#CBAE6B]/25"
          >
            ขอข้อเสนอ PVD
          </Link>
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
        <div className="md:hidden bg-[#0A192C] border-t border-white/10 px-6 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-white/80 hover:text-[#CBAE6B] transition-colors py-1"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/#contact-form"
            onClick={() => setOpen(false)}
            className="mt-2 px-5 py-2 rounded-full bg-gold-metallic text-[#0A192C] font-semibold text-sm text-center transition-colors"
          >
            ขอข้อเสนอ PVD
          </Link>
        </div>
      )}
    </header>
  );
}
