"use client";

import { useMemo, useState } from "react";
import Image, { ImageProps } from "next/image";
import { FALLBACK_BLUR_DATA_URL } from "@/lib/ui/imagePlaceholders";

type SmartImageProps = Omit<ImageProps, "placeholder" | "blurDataURL"> & {
  blurDataURL?: string;
  withSkeleton?: boolean;
};

export default function SmartImage({
  blurDataURL,
  withSkeleton = true,
  className,
  onLoad,
  ...props
}: SmartImageProps) {
  const [loaded, setLoaded] = useState(false);

  const blur = useMemo(
    () => blurDataURL ?? FALLBACK_BLUR_DATA_URL,
    [blurDataURL],
  );

  return (
    <div className="relative h-full w-full overflow-hidden">

      {/* ── Actual image – hidden until fully loaded ── */}
      <Image
        {...props}
        draggable={false}
        placeholder="blur"
        blurDataURL={blur}
        className={[
          className ?? "",
          "transition-opacity duration-700 ease-out",
          loaded ? "opacity-100" : "opacity-0",
        ].join(" ")}
        onLoad={(e) => {
          setLoaded(true);
          onLoad?.(e);
        }}
      />

      {/* ── Skeleton overlay – visible while loading ── */}
      {withSkeleton && !loaded && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">

          {/* 1 · Dark navy base */}
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "var(--color-bg)" }}
          />

          {/* 2 · Subtle depth (lighter centre) */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 90% 70% at 50% 40%, rgba(255,255,255,0.035) 0%, transparent 70%)",
            }}
          />

          {/* 3 · Shimmer sweep — gold streak travelling left → right */}
          <div
            className="absolute inset-y-0"
            style={{
              width: "60%",
              left: 0,
              background:
                "linear-gradient(90deg, transparent 0%, rgba(214,181,109,0.14) 40%, rgba(255,255,255,0.07) 50%, rgba(214,181,109,0.14) 60%, transparent 100%)",
              animation: "smartShimmer 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
            }}
          />

          {/* 4 · Centre: gold ring spinner + label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">

            {/* Ring */}
            <div className="relative h-10 w-10">
              {/* Static outer track */}
              <div
                className="absolute inset-0 rounded-full"
                style={{ border: "1.5px solid rgba(214,181,109,0.18)" }}
              />
              {/* Animated arc */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  border: "2px solid transparent",
                  borderTopColor: "rgba(214,181,109,0.85)",
                  borderRightColor: "rgba(214,181,109,0.3)",
                  animation: "smartSpin 0.85s linear infinite",
                }}
              />
            </div>

            {/* Label */}
            <span
              style={{
                fontSize: "9px",
                fontWeight: 700,
                letterSpacing: "0.3em",
                color: "rgba(214,181,109,0.5)",
                textTransform: "uppercase",
              }}
            >
              LADEN
            </span>
          </div>

        </div>
      )}

      {/* ── Keyframes ── */}
      <style jsx global>{`
        @keyframes smartSpin {
          to { transform: rotate(360deg); }
        }
        @keyframes smartShimmer {
          0%   { transform: translateX(-120%); }
          100% { transform: translateX(280%);  }
        }
      `}</style>
    </div>
  );
}
