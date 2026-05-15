"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export function RoRoRamp({
  imageSrc,
  alt,
  children,
}: {
  imageSrc: string;
  alt: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const rotateX = useTransform(scrollYProgress, [0.2, 0.55, 0.8], [0, -15, -8]);

  return (
    <div ref={ref} className="ch4-iso-plate ch4-plate--2 mt-12 border-[#0284c7] p-0">
      <div className="grid gap-0 md:grid-cols-[1fr_300px] md:items-stretch">
        <div className="order-2 border-t-2 border-[#0284c7] p-6 md:order-1 md:border-t-0 md:border-r-2">
          {children}
        </div>
        <div className="ch4-ramp-perspective order-1 md:order-2">
          <motion.div style={{ rotateX }} className="origin-bottom">
            <div className="ch4-corrugated relative aspect-[4/3] min-h-[220px]">
              <Image
                src={imageSrc}
                alt={alt}
                fill
                className="object-cover object-center contrast-110"
                sizes="300px"
              />
            </div>
          </motion.div>
          <p className="ch4-meta mt-3 px-4 pb-4 text-[#0284c7]">Аппарель · ро-ро</p>
        </div>
      </div>
    </div>
  );
}
