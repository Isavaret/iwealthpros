"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  ChevronLeft,
  ChevronRight,
  Images,
  Trophy,
  X,
} from "lucide-react";
import { awardAlbums } from "@/lib/awards";

export default function AwardBadges() {
  const [albumIndex, setAlbumIndex] = useState<number | null>(null);
  const [photoIndex, setPhotoIndex] = useState(0);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);

  const album = albumIndex === null ? null : awardAlbums[albumIndex];
  const photos = album?.photos ?? [];

  const open = (index: number, opener: HTMLButtonElement) => {
    openerRef.current = opener;
    setAlbumIndex(index);
    setPhotoIndex(0);
  };

  const close = () => {
    setAlbumIndex(null);
    openerRef.current?.focus();
  };

  const step = (delta: number) => {
    setPhotoIndex((i) => (i + delta + photos.length) % photos.length);
  };

  const isOpen = albumIndex !== null;
  const photoCount = photos.length;

  /* ปิดด้วย Esc, เลื่อนภาพด้วยลูกศร และล็อกการสกรอลล์พื้นหลังระหว่างเปิดอัลบั้ม */
  useEffect(() => {
    if (!isOpen) return;

    closeRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setAlbumIndex(null);
        openerRef.current?.focus();
      } else if (e.key === "ArrowRight") {
        setPhotoIndex((i) => (i + 1) % photoCount);
      } else if (e.key === "ArrowLeft") {
        setPhotoIndex((i) => (i - 1 + photoCount) % photoCount);
      }
    };

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, photoCount]);

  const photo = photos[photoIndex];

  return (
    <>
      <div className="flex flex-wrap gap-2 sm:gap-3 mb-7">
        {awardAlbums.map((a, i) => (
          <button
            key={a.badge}
            type="button"
            onClick={(e) => open(i, e.currentTarget)}
            aria-haspopup="dialog"
            className="eyebrow group cursor-pointer border border-[#CBAE6B]/40 bg-[#CBAE6B]/10 text-[#F0DA8F] !gap-1.5 !px-2.5 !text-xs transition-colors hover:border-[#CBAE6B] hover:bg-[#CBAE6B]/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#CBAE6B]"
          >
            <Trophy size={14} className="text-[#CBAE6B] shrink-0" />
            <span>{a.badge}</span>
            <Images
              size={13}
              className="shrink-0 text-[#CBAE6B]/70 transition-colors group-hover:text-[#F0DA8F]"
            />
            <span className="sr-only">— ดูอัลบั้มภาพรับรางวัล</span>
          </button>
        ))}
      </div>

      {album && photo && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`อัลบั้มภาพรับรางวัล ${album.badge}`}
          className="fixed inset-0 z-100 flex flex-col bg-[#0A192C]/95 backdrop-blur-sm"
        >
          {/* คลิกพื้นหลังเพื่อปิด */}
          <button
            type="button"
            aria-label="ปิดอัลบั้ม"
            tabIndex={-1}
            onClick={close}
            className="absolute inset-0 cursor-default"
          />

          <div className="relative flex min-h-0 flex-1 flex-col">
            {/* หัวอัลบั้ม */}
            <div className="flex items-start justify-between gap-4 px-4 pt-4 sm:px-6 sm:pt-6">
              <div className="min-w-0">
                <p className="flex items-center gap-2 text-sm font-semibold text-[#F0DA8F] sm:text-base">
                  <Trophy size={16} className="shrink-0 text-[#CBAE6B]" />
                  <span className="truncate">{album.award}</span>
                </p>
                <p className="mt-1 text-xs text-white/50 sm:text-sm">
                  {album.event}
                </p>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                aria-label="ปิดอัลบั้ม"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/5 text-white/70 transition-colors hover:bg-[#CBAE6B]/20 hover:text-[#F0DA8F]"
              >
                <X size={20} />
              </button>
            </div>

            {/* สลับอัลบั้มระหว่างปี */}
            <div className="flex flex-wrap gap-2 px-4 pt-4 sm:px-6">
              {awardAlbums.map((a, i) => (
                <button
                  key={a.year}
                  type="button"
                  onClick={() => {
                    setAlbumIndex(i);
                    setPhotoIndex(0);
                  }}
                  className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                    i === albumIndex
                      ? "border-[#CBAE6B] bg-[#CBAE6B]/20 text-[#F0DA8F]"
                      : "border-white/15 text-white/50 hover:border-[#CBAE6B]/50 hover:text-white/80"
                  }`}
                >
                  {a.year}
                </button>
              ))}
            </div>

            {/* ภาพหลัก */}
            <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 py-4 sm:px-16 sm:py-6">
              <Image
                key={photo.src}
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                sizes="(max-width: 640px) 92vw, (max-width: 1024px) 80vw, 1100px"
                priority
                className="max-h-full w-auto max-w-full rounded-xl object-contain shadow-2xl"
              />

              {photos.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    aria-label="ภาพก่อนหน้า"
                    className="absolute left-1 flex h-11 w-11 items-center justify-center rounded-full bg-[#0A192C]/70 text-white/80 transition-colors hover:bg-[#CBAE6B]/30 hover:text-[#F0DA8F] sm:left-4"
                  >
                    <ChevronLeft size={22} />
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    aria-label="ภาพถัดไป"
                    className="absolute right-1 flex h-11 w-11 items-center justify-center rounded-full bg-[#0A192C]/70 text-white/80 transition-colors hover:bg-[#CBAE6B]/30 hover:text-[#F0DA8F] sm:right-4"
                  >
                    <ChevronRight size={22} />
                  </button>
                </>
              )}
            </div>

            {/* คำบรรยาย + แถบภาพย่อ */}
            <div className="px-4 pb-4 sm:px-6 sm:pb-6">
              <p className="mb-3 text-center text-xs text-white/60 sm:text-sm">
                {photo.alt}{" "}
                <span className="text-white/35">
                  ({photoIndex + 1}/{photos.length})
                </span>
              </p>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {photos.map((p, i) => (
                  <button
                    key={p.src}
                    type="button"
                    onClick={() => setPhotoIndex(i)}
                    aria-label={`ภาพที่ ${i + 1}`}
                    aria-current={i === photoIndex}
                    className={`relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border transition-all sm:h-16 sm:w-16 ${
                      i === photoIndex
                        ? "border-[#CBAE6B] opacity-100"
                        : "border-white/10 opacity-55 hover:opacity-90"
                    }`}
                  >
                    <Image
                      src={p.src}
                      alt=""
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
