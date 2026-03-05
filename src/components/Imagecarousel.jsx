import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";

/**
 * ImageCarousel
 *
 * Usage — wrap in a sized parent, the carousel fills it completely:
 *
 *   <div className="relative h-48">
 *     <ImageCarousel images={[...]} alt="My photos" />
 *   </div>
 *
 * The root div is always `relative w-full h-full overflow-hidden`.
 * All card images are `absolute inset-0 object-cover`.
 * The lightbox is a fixed overlay rendered via a portal-like fragment.
 */
const ImageCarousel = ({ images = [], alt = "Event photo" }) => {
  const total = images.length;

  // ── State ────────────────────────────────────────────────
  const [current, setCurrent] = useState(0);
  const [lbOpen, setLbOpen] = useState(false);
  const [lbIdx, setLbIdx] = useState(0);

  // ── Refs ─────────────────────────────────────────────────
  const dragStartX = useRef(null);

  // ── Lightbox controls (stable references) ────────────────
  const closeLb = useCallback(() => setLbOpen(false), []);
  const lbPrev = useCallback(
    () => setLbIdx((i) => (i - 1 + total) % total),
    [total],
  );
  const lbNext = useCallback(() => setLbIdx((i) => (i + 1) % total), [total]);

  // ── Keyboard navigation for lightbox ─────────────────────
  useEffect(() => {
    if (!lbOpen) return;

    document.body.style.overflow = "hidden";

    const handleKey = (e) => {
      if (e.key === "ArrowRight") lbNext();
      if (e.key === "ArrowLeft") lbPrev();
      if (e.key === "Escape") closeLb();
    };

    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [lbOpen, lbNext, lbPrev, closeLb]);

  // ── Early return after all hooks ─────────────────────────
  if (!total) return null;

  // ── Helpers ──────────────────────────────────────────────
  const wrap = (i) => ((i % total) + total) % total;

  const handleThumbPrev = (e) => {
    e.stopPropagation();
    setCurrent((c) => wrap(c - 1));
  };
  const handleThumbNext = (e) => {
    e.stopPropagation();
    setCurrent((c) => wrap(c + 1));
  };
  const handleOpenLb = () => {
    setLbIdx(current);
    setLbOpen(true);
  };

  const handleTouchStart = (e) => {
    dragStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    if (dragStartX.current === null) return;
    const delta = dragStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) delta > 0 ? lbNext() : lbPrev();
    dragStartX.current = null;
  };

  // ─────────────────────────────────────────────────────────
  return (
    <>
      {/* ── Card carousel ── */}
      <div className="relative w-full h-full overflow-hidden select-none group">
        {/* Stacked images — only active one is visible */}
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`${alt} ${i + 1}`}
            draggable={false}
            onClick={handleOpenLb}
            className={[
              "absolute inset-0 w-full h-full object-cover",
              "cursor-zoom-in transition-opacity duration-500",
              i === current ? "opacity-100" : "opacity-0 pointer-events-none",
            ].join(" ")}
          />
        ))}

        {/* Hover overlay hint */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center pointer-events-none">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/60 text-white text-xs font-medium px-3 py-1.5 rounded-full backdrop-blur-sm tracking-wide">
            ⤢ View photos
          </span>
        </div>

        {/* Prev / Next arrows */}
        {total > 1 && (
          <>
            <button
              onClick={handleThumbPrev}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/50 hover:bg-black/75 text-white flex items-center justify-center backdrop-blur-sm transition-colors text-lg leading-none"
            >
              ‹
            </button>
            <button
              onClick={handleThumbNext}
              aria-label="Next image"
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/50 hover:bg-black/75 text-white flex items-center justify-center backdrop-blur-sm transition-colors text-lg leading-none"
            >
              ›
            </button>
          </>
        )}

        {/* Dot indicators */}
        {total > 1 && (
          <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrent(i);
                }}
                aria-label={`Go to image ${i + 1}`}
                className={[
                  "rounded-full transition-all duration-300",
                  i === current
                    ? "w-4 h-1.5 bg-white"
                    : "w-1.5 h-1.5 bg-white/50 hover:bg-white/80",
                ].join(" ")}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Lightbox — portalled to document.body to escape any parent stacking context ── */}
      {lbOpen &&
        createPortal(
          <div
            onClick={closeLb}
            className="fixed inset-0 z-[200] overflow-hidden"
            style={{
              backgroundColor: "rgba(5,5,10,0.95)",
              backdropFilter: "blur(10px)",
              display: "grid",
              gridTemplateRows: "52px 1fr 90px",
            }}
          >
            {/* Top bar */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-between px-5"
            >
              <span className="text-white/40 text-xs font-mono tracking-widest">
                {String(lbIdx + 1).padStart(2, "0")} /{" "}
                {String(total).padStart(2, "0")}
              </span>
              <button
                onClick={closeLb}
                aria-label="Close lightbox"
                className="text-white/50 hover:text-white transition-colors text-3xl leading-none pb-1 bg-transparent border-none cursor-pointer"
              >
                ×
              </button>
            </div>

            {/* Main image row — grid bounds it, no overflow possible */}
            <div
              onClick={(e) => e.stopPropagation()}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              className="relative flex items-center justify-center min-h-0 overflow-hidden"
              style={{ padding: "8px 68px", boxSizing: "border-box" }}
            >
              {total > 1 && (
                <button
                  onClick={lbPrev}
                  aria-label="Previous photo"
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full border border-white/15 bg-white/5 hover:bg-white/15 text-white flex items-center justify-center text-xl transition-colors backdrop-blur-sm"
                >
                  ‹
                </button>
              )}

              <img
                key={lbIdx}
                src={images[lbIdx]}
                alt={`${alt} ${lbIdx + 1}`}
                draggable={false}
                className="block rounded-xl shadow-2xl"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  width: "auto",
                  height: "auto",
                  objectFit: "contain",
                  animation: "lbIn 0.28s cubic-bezier(0.25,0.46,0.45,0.94)",
                }}
              />

              {total > 1 && (
                <button
                  onClick={lbNext}
                  aria-label="Next photo"
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full border border-white/15 bg-white/5 hover:bg-white/15 text-white flex items-center justify-center text-xl transition-colors backdrop-blur-sm"
                >
                  ›
                </button>
              )}
            </div>

            {/* Thumbnail strip */}
            {total > 1 && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="flex items-center justify-center gap-2.5 px-5 flex-wrap"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.6), transparent)",
                }}
              >
                {images.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setLbIdx(i)}
                    aria-label={`View photo ${i + 1}`}
                    className={[
                      "flex-shrink-0 rounded-lg overflow-hidden border-none p-0 cursor-pointer transition-all duration-200",
                      i === lbIdx
                        ? "opacity-100 scale-110 outline outline-2 outline-white/80 outline-offset-2"
                        : "opacity-40 hover:opacity-70 scale-100",
                    ].join(" ")}
                    style={{ width: 56, height: 40 }}
                  >
                    <img
                      src={src}
                      alt={`Thumbnail ${i + 1}`}
                      className="w-full h-full object-cover block"
                      draggable={false}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>,
          document.body,
        )}

      <style>{`
        @keyframes lbIn {
          from { opacity: 0; transform: scale(0.95); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </>
  );
};

export default ImageCarousel;
