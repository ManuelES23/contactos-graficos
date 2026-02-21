import { useState, useRef, useCallback } from "react";
import useStore from "../../store/catalogStore";

const MIN = 0;
const MAX = 5000;

export default function PriceRangeSlider() {
  const { priceRange, setPriceRange } = useStore();
  const [values, setValues] = useState(priceRange);
  const dragging = useRef(null);
  const trackRef = useRef(null);

  const toPercent = (v) => ((v - MIN) / (MAX - MIN)) * 100;

  const clamp = (v) => Math.max(MIN, Math.min(MAX, v));

  const handleMouseMove = useCallback((e) => {
    if (!dragging.current || !trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const ratio = (clientX - rect.left) / rect.width;
    const raw = Math.round((ratio * (MAX - MIN) + MIN) / 50) * 50;
    const val = clamp(raw);

    setValues((prev) => {
      let [lo, hi] = prev;
      if (dragging.current === "lo") lo = Math.min(val, hi - 50);
      else hi = Math.max(val, lo + 50);
      return [lo, hi];
    });
  }, []);

  const handleMouseUp = useCallback(() => {
    if (dragging.current) {
      setPriceRange(values);
      dragging.current = null;
    }
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
    window.removeEventListener("touchmove", handleMouseMove);
    window.removeEventListener("touchend", handleMouseUp);
  }, [values, setPriceRange, handleMouseMove]);

  const startDrag = (thumb) => (e) => {
    e.preventDefault();
    dragging.current = thumb;
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchmove", handleMouseMove);
    window.addEventListener("touchend", handleMouseUp);
  };

  const loPercent = toPercent(values[0]);
  const hiPercent = toPercent(values[1]);

  return (
    <div className='w-full select-none'>
      {/* Labels */}
      <div
        className='flex justify-between text-xs font-semibold mb-4'
        style={{ color: "#1A3A8F" }}
      >
        <span>Q{values[0].toLocaleString()}</span>
        <span>Q{values[1].toLocaleString()}</span>
      </div>

      {/* Track */}
      <div
        ref={trackRef}
        className='relative h-1.5 rounded-full w-full'
        style={{ backgroundColor: "#e5e7eb" }}
      >
        {/* Active range */}
        <div
          className='absolute h-full rounded-full'
          style={{
            left: `${loPercent}%`,
            width: `${hiPercent - loPercent}%`,
            backgroundColor: "#1A3A8F",
          }}
        />

        {/* Thumb Lo */}
        <div
          onMouseDown={startDrag("lo")}
          onTouchStart={startDrag("lo")}
          className='absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-white cursor-pointer shadow-md transition-transform hover:scale-110 active:scale-110'
          style={{ left: `${loPercent}%`, backgroundColor: "#1A3A8F" }}
        />

        {/* Thumb Hi */}
        <div
          onMouseDown={startDrag("hi")}
          onTouchStart={startDrag("hi")}
          className='absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-white cursor-pointer shadow-md transition-transform hover:scale-110 active:scale-110'
          style={{ left: `${hiPercent}%`, backgroundColor: "#1A3A8F" }}
        />
      </div>

      {/* Range labels */}
      <div className='flex justify-between text-xs text-gray-400 mt-3'>
        <span>Q0</span>
        <span>Q5,000+</span>
      </div>
    </div>
  );
}
