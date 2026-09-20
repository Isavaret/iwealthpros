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
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ล็อกการเลื่อนหน้าเมื่อเปิดเมนูมือถือ
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-2 sm:pt-3">
      <div className="container-page">
        <nav
          className={`flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-[#0A192C]/80 px-3 backdrop-blur-xl transition-all duration-300 sm:px-5 ${
            scrolled || open
              ? "bg-[#0A192C]/95 py-2 shadow-xl shadow-black/40"
              : "py-2.5"
          }`}
        >
          <Link
            href="/"
            className="flex items-center gap-3 rounded-xl py-1"
            aria-label="I Wealth Pros — หน้าแรก"
          >
            <Image
              src="/logo-iwealthpros.jpg"
              alt="โลโก้ I Wealth Pros"
              width={192}
              height={204}
              priority
              sizes="(max-width: 640px) 48px, 56px"
              className="w-12 h-12 sm:w-14 sm:h-14 object-cover rounded-xl ring-1 ring-[#CBAE6B]/45 shadow-lg shadow-black/30"
            />
            <span className="leading-none">
              <span className="block text-lg sm:text-xl font-bold tracking-[0.12em] text-gold-metallic">
                I WEALTH
              </span>
              <span className="block text-[10px] sm:text-[11px] font-semibold tracking-[0.35em] text-[#CBAE6B]/70">
                PROS
              </span>
            </span>
          </Link>

          {/* Desktop */}
          <div className="hidden lg:flex items-center gap-7">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm text-white/75 hover:text-[#F0DA8F] transition-colors py-2"
              >
                {l.label}
              </Link>
            ))}
            <Link href="/#contact-form" className="btn btn-gold text-sm !min-h-11 !py-2.5">
              ขอข้อเสนอ PVD
            </Link>
          </div>

          {/* Mobile toggle — 44x44 ขั้นต่ำ */}
          <button
            type="button"
            className="lg:hidden flex items-center justify-center w-11 h-11 rounded-xl text-white hover:bg-white/10 transition-colors cursor-pointer"
            onClick={() => setOpen(!open)}
            aria-label={open ? "ปิดเมนู" : "เปิดเมนู"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>

        {/* Mobile menu */}
        {open && (
          <div
            id="mobile-menu"
            className="lg:hidden mt-2 rounded-2xl border border-white/10 bg-[#0A192C]/95 backdrop-blur-xl shadow-2xl shadow-black/50 overflow-hidden"
          >
            <div className="flex flex-col p-2">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center min-h-12 px-4 rounded-xl text-white/80 hover:text-[#F0DA8F] hover:bg-white/5 transition-colors"
                >
                  {l.label}
                </Link>
              ))}
              <Link
                href="/#contact-form"
                onClick={() => setOpen(false)}
                className="btn btn-gold mt-2 w-full"
              >
                ขอข้อเสนอ PVD
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
