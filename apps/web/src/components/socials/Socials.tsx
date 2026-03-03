"use client";

import React from "react";
import Link from "next/link";

export type SocialItem = {
  label: string;
  url: string;
};

type SocialsProps = {
  items: SocialItem[];
  hideLabels?: boolean;
};

const Socials = ({ items, hideLabels = false }: SocialsProps) => {
  if (!items.length) return null;

  return (
    <div className="flex flex-wrap items-center gap-4">
      {items.map((item) => (
        <Link
          key={item.url}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--color-text-muted)] transition hover:text-[color:var(--color-text)]"
        >
          {!hideLabels && item.label}
        </Link>
      ))}
    </div>
  );
};

export default Socials;
