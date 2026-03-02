"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";
import { Listing } from "@/lib/types/listings";
import ListingCard from "./ListingCard";

type Props = {
  items: Listing[];
};

export default function ListingCarousel({ items }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    dragFree: true,
    loop: true,
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={scrollPrev}
        aria-label="Scroll left"
        className="absolute left-0 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-black/40 text-white backdrop-blur hover:bg-black/55 md:grid"
      >
        ‹
      </button>

      <button
        type="button"
        onClick={scrollNext}
        aria-label="Scroll right"
        className="absolute right-0 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-black/40 text-white backdrop-blur hover:bg-black/55 md:grid"
      >
        ›
      </button>

      <div ref={emblaRef} className="">
        <div className="flex items-stretch gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="
                flex-[0_0_85%] sm:flex-[0_0_420px] lg:flex-[0_0_460px] pl-4
              "
            >
              <ListingCard listing={item} className="h-full w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
