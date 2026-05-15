"use client";

export function RebootPulseBar({ label }: { label: string }) {
  return (
    <div className="mt-16 pb-8">
      <p className="ch4-meta mb-4 text-center text-[#38bdf8]">
        {label}
      </p>
      <div
        className="ch4-reboot-bar w-full"
        role="progressbar"
        aria-label="Система перезагружается"
        aria-valuetext={label}
      />
    </div>
  );
}
