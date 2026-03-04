import Image from "next/image";
import Link from "next/link";
import {
  BadgeCheck,
  Calendar,
  CheckCircle2,
  Euro,
  Info,
  Mail,
  Phone,
  Ruler,
  ShieldCheck,
  Home,
  Images,
  MapPin,
  KeyRound,
  Flame,
  Leaf,
  LandPlot,
  BedDouble,
  Bath,
  Navigation,
  FileText,
} from "lucide-react";
import type { EstateDetails } from "@/lib/types/listings";
import { Section } from "./ui/Section";
import { InfoRow } from "./ui/InfoRow";
import { ContactRow } from "./ui/ContactRow";
import { formatEUR, getListingVariant } from "./utils";
import { MediaGallery } from "@/components/media/MediaGallery";
import { ObjectDownloadCard } from "./ObjectDownloadCard";
import { EnergySection } from "./EnergySection";

export function ObjectMain({ listing }: { listing: EstateDetails }) {
  const variant = getListingVariant(listing);

  const anyListing = listing as any;
  const slug = anyListing.slug ?? listing.id ?? "";
  const title = listing.title ?? "";

  const contactHref = `/kontakt?listing=${encodeURIComponent(slug)}&title=${encodeURIComponent(
    title,
  )}`;

  const makler = listing.ansprechpartner;
  const agent = {
    name: makler?.name ?? "Immowo Ventures",
    role: makler?.titleRole ?? "Immobilienberatung",
    phone: makler?.phone ?? "+49 821 / 000 000",
    phoneHref: makler?.phone ? `tel:${makler.phone.replace(/\s/g, "")}` : "tel:+4982100000",
    email: makler?.email ?? "kontakt@immowo.de",
    emailHref: makler?.email ? `mailto:${makler.email}` : "mailto:kontakt@immowo.de",
    imageSrc: makler?.photoUrl ?? null,
    availability: makler?.availability ?? "Mo\u2013Fr 9\u201318 Uhr",
  };

  const ctaText =
    variant === "build"
      ? "Projektberatung anfragen"
      : variant === "investment"
        ? "Investment-Details anfragen"
        : "Rückruf anfordern";

  const energyCertificateType = (anyListing.energyCertificateType ??
    anyListing.energy?.certificateType) as "bedarf" | "verbrauch" | undefined;

  const energyValue = (anyListing.energyValue ?? anyListing.energy?.value) as
    | number
    | undefined;

  const energyClass = (anyListing.energyClass ??
    anyListing.energy?.class ??
    listing.energyClass) as string | undefined;

  const energyCarrier = (anyListing.energyCarrier ??
    anyListing.energy?.carrier ??
    listing.heatingType) as string | undefined;

  const energyYear = (anyListing.energyYear ??
    anyListing.energy?.year ??
    listing.yearBuilt) as number | undefined;

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-10">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-8">
          <Section
            icon={<ShieldCheck className="h-5 w-5" />}
            title="Kurzprofil"
          >
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <Kpi label="Preis" value={priceLabel(listing)} />
              {listing.location ? (
                <Kpi label="Region" value={listing.location} />
              ) : null}
              {typeof listing.livingArea === "number" ? (
                <Kpi label="Wohnfläche" value={`${listing.livingArea} m²`} />
              ) : null}
              {typeof listing.plotArea === "number" ? (
                <Kpi label="Grundstück" value={`${listing.plotArea} m²`} />
              ) : null}
              {typeof listing.rooms === "number" ? (
                <Kpi label="Zimmer" value={`${listing.rooms}`} />
              ) : null}
              {typeof listing.bedrooms === "number" ? (
                <Kpi label="Schlafzimmer" value={`${listing.bedrooms}`} />
              ) : null}
              {typeof listing.bathrooms === "number" ? (
                <Kpi label="Bäder" value={`${listing.bathrooms}`} />
              ) : null}
              {typeof listing.yearBuilt === "number" ? (
                <Kpi label="Baujahr" value={`${listing.yearBuilt}`} />
              ) : null}
              {listing.availability ? (
                <Kpi label="Verfügbarkeit" value={listing.availability} />
              ) : null}
            </div>

            {variant === "build" ? (
              <div className="mt-4 rounded-2xl border border-[rgba(214,181,109,0.22)] bg-black/20 p-4 text-sm text-[rgba(255,255,255,0.76)]">
                <div className="flex items-start gap-3">
                  <LandPlot className="mt-0.5 h-5 w-5 text-[rgba(255,255,255,0.74)]" />
                  <div>
                    <div className="font-semibold text-white/90">
                      Bauprojekt / Neubau – Kauf ab Plan
                    </div>
                    <div className="mt-1 leading-relaxed">
                      Visuals, Leistungsbeschreibung, Zeitplan und weitere
                      Unterlagen erhalten Sie auf Anfrage. Wir bestätigen
                      Details transparent im Gespräch.
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </Section>

          {listing.highlights?.length ? (
            <Section
              icon={<ShieldCheck className="h-5 w-5" />}
              title="Highlights"
            >
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {listing.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex items-start gap-3 rounded-xl border border-[rgba(214,181,109,0.22)] bg-[rgba(255,255,255,0.06)] p-4 text-sm text-white/90"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-[rgba(255,255,255,0.82)]" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </Section>
          ) : null}

          {listing.description ? (
            <Section icon={<Info className="h-5 w-5" />} title="Beschreibung">
              <p className="text-sm leading-relaxed text-white/85 md:text-base">
                {listing.description}
              </p>
            </Section>
          ) : null}

          <EnergySection
            certificateType={energyCertificateType}
            value={energyValue}
            class={energyClass}
            carrier={energyCarrier}
            year={energyYear}
          />

          {listing.features?.length ? (
            <Section icon={<Home className="h-5 w-5" />} title="Ausstattung">
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {listing.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-3 rounded-xl border border-[rgba(214,181,109,0.22)] bg-[rgba(255,255,255,0.06)] p-4 text-sm text-white/90"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-[rgba(255,255,255,0.82)]" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </Section>
          ) : null}

          {listing.gallery?.length || listing.videoSrc ? (
            <Section icon={<Images className="h-5 w-5" />} title="Galerie">
              <MediaGallery
                altBase={listing.title}
                media={[
                  ...(listing.gallery ?? []),
                  ...(listing.videoSrc ? [listing.videoSrc] : []),
                ]}
              />
            </Section>
          ) : null}

          {listing.geo?.lat && listing.geo?.lng ? (
            <Section icon={<MapPin className="h-5 w-5" />} title="Lage">
              <p className="text-sm leading-relaxed text-[rgba(255,255,255,0.76)]">
                Aus Diskretionsgründen zeigen wir die exakte Adresse erst nach
                Anfrage. Einen groben Kartenpunkt können Sie über den Link
                öffnen.
              </p>

              <div className="mt-4">
                <a
                  href={googleMapsLink(listing.geo.lat, listing.geo.lng)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-2xl border border-[rgba(214,181,109,0.32)] bg-[rgba(255,255,255,0.06)] px-4 py-3 text-sm font-semibold text-white/90 backdrop-blur transition hover:bg-[rgba(214,181,109,0.10)]"
                >
                  <Navigation className="h-4 w-4" />
                  Karte öffnen
                </a>
              </div>
            </Section>
          ) : null}
        </div>
        <aside className="space-y-6 lg:col-span-4">
          <Section
            icon={<BadgeCheck className="h-5 w-5" />}
            title="Ihr Ansprechpartner"
          >
            <div className="flex items-start gap-4">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-[rgba(214,181,109,0.22)] bg-[rgba(255,255,255,0.06)]">
                {agent.imageSrc ? (
                  <Image
                    src={agent.imageSrc}
                    alt={agent.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-xl font-semibold text-[rgba(214,181,109,0.7)]">
                    {agent.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>

              <div className="min-w-0">
                <div className="text-sm font-semibold text-white/95">
                  {agent.name}
                </div>
                <div className="mt-1 text-sm text-white/65">{agent.role}</div>

                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(214,181,109,0.32)] bg-[rgba(255,255,255,0.06)] px-3 py-1 text-[11px] font-semibold tracking-widest text-[rgba(255,255,255,0.82)] backdrop-blur">
                    <BadgeCheck className="h-4 w-4" />
                    DIREKTKONTAKT
                  </span>
                  {agent.availability ? (
                    <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(214,181,109,0.32)] bg-[rgba(255,255,255,0.06)] px-3 py-1 text-[11px] font-semibold tracking-widest text-[rgba(255,255,255,0.76)] backdrop-blur">
                      <Calendar className="h-4 w-4" />
                      {agent.availability}
                    </span>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-3">
              <ContactRow
                icon={<Phone className="h-5 w-5" />}
                label="Telefon"
                value={agent.phone}
                href={agent.phoneHref}
              />
              <ContactRow
                icon={<Mail className="h-5 w-5" />}
                label="E-Mail"
                value={agent.email}
                href={agent.emailHref}
              />

              <Link
                href={contactHref}
                className="mt-1 inline-flex h-11 items-center justify-center rounded-xl bg-[var(--color-accent)] px-5 text-sm font-semibold text-black shadow-[0_18px_45px_rgba(0,0,0,0.35)] transition hover:bg-[var(--color-accent-hover)]"
              >
                {ctaText}
              </Link>
            </div>
          </Section>

          <ObjectDownloadCard listing={listing} />

          <Section icon={<Ruler className="h-5 w-5" />} title="Eckdaten">
            <div className="grid grid-cols-1 gap-3">
              <InfoRow
                icon={<Euro className="h-5 w-5" />}
                label="Kaufpreis"
                value={
                  typeof listing.price === "number" && listing.price > 0
                    ? formatEUR(listing.price)
                    : undefined
                }
              />

              <InfoRow
                icon={<Ruler className="h-5 w-5" />}
                label="Wohnfläche"
                value={
                  typeof listing.livingArea === "number"
                    ? `${listing.livingArea} m²`
                    : undefined
                }
              />

              <InfoRow
                icon={<LandPlot className="h-5 w-5" />}
                label="Grundstück"
                value={
                  typeof listing.plotArea === "number"
                    ? `${listing.plotArea} m²`
                    : undefined
                }
              />

              <InfoRow
                icon={<Home className="h-5 w-5" />}
                label="Zimmer"
                value={
                  typeof listing.rooms === "number" ? listing.rooms : undefined
                }
              />

              <InfoRow
                icon={<BedDouble className="h-5 w-5" />}
                label="Schlafzimmer"
                value={
                  typeof listing.bedrooms === "number"
                    ? listing.bedrooms
                    : undefined
                }
              />

              <InfoRow
                icon={<Bath className="h-5 w-5" />}
                label="Bäder"
                value={
                  typeof listing.bathrooms === "number"
                    ? listing.bathrooms
                    : undefined
                }
              />

              <InfoRow
                icon={<Calendar className="h-5 w-5" />}
                label="Baujahr"
                value={
                  typeof listing.yearBuilt === "number"
                    ? listing.yearBuilt
                    : undefined
                }
              />

              <InfoRow
                icon={<Leaf className="h-5 w-5" />}
                label="Energieklasse"
                value={energyClass}
              />
              <InfoRow
                icon={<Flame className="h-5 w-5" />}
                label="Energieträger / Heizung"
                value={energyCarrier}
              />
              <InfoRow
                icon={<KeyRound className="h-5 w-5" />}
                label="Verfügbarkeit"
                value={listing.availability}
              />
              <InfoRow
                icon={<KeyRound className="h-5 w-5" />}
                label="Courtage"
                value={listing.commissionText}
              />
            </div>
          </Section>

          <Section
            icon={<ShieldCheck className="h-5 w-5" />}
            title="So geht’s weiter"
          >
            <ol className="space-y-3">
              <Step
                n={1}
                title="Anfrage"
                text="Exposé/Unterlagen anfordern oder Rückruf wünschen."
              />
              <Step
                n={2}
                title="Bestätigung"
                text="Wir melden uns mit Termin- oder Unterlagen-Update."
              />
              <Step
                n={3}
                title="Besichtigung / Beratung"
                text="Diskret, vorbereitet, effizient – damit Sie sicher entscheiden."
              />
            </ol>

            <Link
              href={contactHref}
              className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-xl border border-[rgba(214,181,109,0.32)] bg-[rgba(255,255,255,0.06)] px-5 text-sm font-semibold text-white/90 backdrop-blur transition hover:bg-[rgba(214,181,109,0.10)]"
            >
              <FileText className="mr-2 h-4 w-4" />
              Exposé auf Anfrage
            </Link>

            <p className="mt-3 text-xs text-[rgba(255,255,255,0.56)]">
              Hinweis: Aus Diskretionsgründen können Dokumente/Adresse erst nach
              Anfrage freigegeben werden.
            </p>
          </Section>
        </aside>
      </div>
    </div>
  );
}

function priceLabel(listing: EstateDetails) {
  if (typeof listing.price === "number" && listing.price > 0)
    return formatEUR(listing.price);
  return "Preis auf Anfrage";
}

function googleMapsLink(lat: number, lng: number) {
  return `https://www.google.com/maps?q=${lat},${lng}`;
}

function Kpi({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[rgba(214,181,109,0.22)] bg-black/20 p-4">
      <div className="text-xs font-semibold uppercase tracking-widest text-[rgba(255,255,255,0.62)]">
        {label}
      </div>
      <div className="mt-1 text-sm font-semibold text-white/90">{value}</div>
    </div>
  );
}

function Step({ n, title, text }: { n: number; title: string; text: string }) {
  return (
    <li className="flex gap-3 rounded-2xl border border-[rgba(214,181,109,0.22)] bg-[rgba(255,255,255,0.06)] p-4">
      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-black">
        <span className="text-xs font-bold">{n}</span>
      </div>
      <div>
        <div className="text-sm font-semibold text-white/90">{title}</div>
        <div className="mt-1 text-sm text-[rgba(255,255,255,0.74)]">{text}</div>
      </div>
    </li>
  );
}

// // components/objekte/ObjectMain.tsx
// import Image from "next/image";
// import Link from "next/link";
// import {
//   BadgeCheck,
//   Calendar,
//   CheckCircle2,
//   Euro,
//   Info,
//   Mail,
//   Phone,
//   Ruler,
//   ShieldCheck,
//   Home,
//   Images,
//   MapPin,
//   KeyRound,
//   Flame,
//   Leaf,
//   LandPlot,
//   BedDouble,
//   Bath,
//   Navigation,
//   FileText,
//   Lock,
// } from "lucide-react";
// import type { EstateDetails } from "@/lib/types/listings";
// import { Section } from "./ui/Section";
// import { InfoRow } from "./ui/InfoRow";
// import { ContactRow } from "./ui/ContactRow";
// import { formatEUR, getListingVariant } from "./utils";
// import { MediaGallery } from "@/components/media/MediaGallery";
// import { ObjectDownloadCard } from "./ObjectDownloadCard";
// import { EnergySection } from "./EnergySection";

// export function ObjectMain({ listing }: { listing: EstateDetails }) {
//   const variant = getListingVariant(listing);

//   const anyListing = listing as any;
//   const slug = anyListing.slug ?? listing.id ?? "";
//   const title = listing.title ?? "";

//   // ✅ Objekt-Kontext an Kontakt übergeben
//   const contactHref = `/kontakt?listing=${encodeURIComponent(slug)}&title=${encodeURIComponent(
//     title,
//   )}`;

//   const agent = {
//     name: "Max Mustermann",
//     role: "Immobilienberater • ArchiVend",
//     phone: "+49 123 456 789",
//     phoneHref: "tel:+49123456789",
//     email: "makler@archivend.de",
//     emailHref: "mailto:makler@archivend.de",
//     imageSrc: "/assets/team/makler.jpg",
//     availability: "Mo–Fr 9–18 Uhr",
//   };

//   // Optional: Variant-spezifische Sidebar-Copy/CTA
//   const ctaText =
//     variant === "build"
//       ? "Projektberatung anfragen"
//       : variant === "investment"
//         ? "Investment-Details anfragen"
//         : "Rückruf anfordern";

//   // ✅ Energie-Felder (MVP: aus listing.energyClass + listing.heatingType + yearBuilt)
//   const energyCertificateType = (anyListing.energyCertificateType ??
//     anyListing.energy?.certificateType) as "bedarf" | "verbrauch" | undefined;

//   const energyValue = (anyListing.energyValue ?? anyListing.energy?.value) as
//     | number
//     | undefined;

//   const energyClass = (anyListing.energyClass ??
//     anyListing.energy?.class ??
//     listing.energyClass) as string | undefined;

//   const energyCarrier = (anyListing.energyCarrier ??
//     anyListing.energy?.carrier ??
//     listing.heatingType) as string | undefined;

//   const energyYear = (anyListing.energyYear ??
//     anyListing.energy?.year ??
//     listing.yearBuilt) as number | undefined;

//   return (
//     <div className="mx-auto w-full max-w-7xl px-6 py-10">
//       <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
//         {/* LEFT */}
//         <div className="space-y-6 lg:col-span-8">
//           {/* ✅ Kurzprofil / KPI Block */}
//           <Section
//             icon={<ShieldCheck className="h-5 w-5" />}
//             title="Kurzprofil"
//           >
//             <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
//               <Kpi label="Preis" value={priceLabel(listing)} />
//               {listing.location ? (
//                 <Kpi label="Region" value={listing.location} />
//               ) : null}
//               {typeof listing.livingArea === "number" ? (
//                 <Kpi label="Wohnfläche" value={`${listing.livingArea} m²`} />
//               ) : null}
//               {typeof listing.plotArea === "number" ? (
//                 <Kpi label="Grundstück" value={`${listing.plotArea} m²`} />
//               ) : null}
//               {typeof listing.rooms === "number" ? (
//                 <Kpi label="Zimmer" value={`${listing.rooms}`} />
//               ) : null}
//               {typeof listing.bedrooms === "number" ? (
//                 <Kpi label="Schlafzimmer" value={`${listing.bedrooms}`} />
//               ) : null}
//               {typeof listing.bathrooms === "number" ? (
//                 <Kpi label="Bäder" value={`${listing.bathrooms}`} />
//               ) : null}
//               {typeof listing.yearBuilt === "number" ? (
//                 <Kpi label="Baujahr" value={`${listing.yearBuilt}`} />
//               ) : null}
//               {listing.availability ? (
//                 <Kpi label="Verfügbarkeit" value={listing.availability} />
//               ) : null}
//             </div>

//             {/* ✅ Variant-Hinweis (macht die Seite „größer“ + professioneller) */}
//             {variant === "build" ? (
//               <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/75">
//                 <div className="flex items-start gap-3">
//                   <LandPlot className="mt-0.5 h-5 w-5 text-white/70" />
//                   <div>
//                     <div className="font-semibold text-white/90">
//                       Bauprojekt / Neubau – vom Papier weg
//                     </div>
//                     <div className="mt-1 leading-relaxed">
//                       Visuals, Leistungsbeschreibung, Zeitplan und weitere
//                       Unterlagen erhalten Sie auf Anfrage. Wir bestätigen
//                       Details transparent im Gespräch.
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ) : null}
//           </Section>

//           {listing.highlights?.length ? (
//             <Section
//               icon={<ShieldCheck className="h-5 w-5" />}
//               title="Highlights"
//             >
//               <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
//                 {listing.highlights.map((h) => (
//                   <li
//                     key={h}
//                     className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/90"
//                   >
//                     <CheckCircle2 className="mt-0.5 h-5 w-5 text-white/80" />
//                     <span>{h}</span>
//                   </li>
//                 ))}
//               </ul>
//             </Section>
//           ) : null}

//           {listing.description ? (
//             <Section icon={<Info className="h-5 w-5" />} title="Beschreibung">
//               <p className="text-sm leading-relaxed text-white/85 md:text-base">
//                 {listing.description}
//               </p>
//             </Section>
//           ) : null}

//           {/* ✅ Energie & Heizung (GEG-relevant) */}
//           <EnergySection
//             certificateType={energyCertificateType}
//             value={energyValue}
//             class={energyClass}
//             carrier={energyCarrier}
//             year={energyYear}
//           />

//           {listing.features?.length ? (
//             <Section icon={<Home className="h-5 w-5" />} title="Ausstattung">
//               <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
//                 {listing.features.map((f) => (
//                   <li
//                     key={f}
//                     className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/90"
//                   >
//                     <CheckCircle2 className="mt-0.5 h-5 w-5 text-white/80" />
//                     <span>{f}</span>
//                   </li>
//                 ))}
//               </ul>
//             </Section>
//           ) : null}

//           {listing.gallery?.length || listing.videoSrc ? (
//             <Section icon={<Images className="h-5 w-5" />} title="Galerie">
//               <MediaGallery
//                 altBase={listing.title}
//                 media={[
//                   ...(listing.gallery ?? []),
//                   ...(listing.videoSrc ? [listing.videoSrc] : []),
//                 ]}
//               />
//             </Section>
//           ) : null}

//           {/* ✅ Lage (diskret) */}
//           {listing.geo?.lat && listing.geo?.lng ? (
//             <Section icon={<MapPin className="h-5 w-5" />} title="Lage">
//               <p className="text-sm leading-relaxed text-white/75">
//                 Aus Diskretionsgründen zeigen wir die exakte Adresse erst nach
//                 Anfrage. Einen groben Kartenpunkt können Sie über den Link
//                 öffnen.
//               </p>

//               <div className="mt-4">
//                 <a
//                   href={googleMapsLink(listing.geo.lat, listing.geo.lng)}
//                   target="_blank"
//                   rel="noreferrer"
//                   className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-white/90 backdrop-blur transition hover:bg-white/10"
//                 >
//                   <Navigation className="h-4 w-4" />
//                   Karte öffnen
//                 </a>
//               </div>
//             </Section>
//           ) : null}
//         </div>

//         {/* RIGHT */}
//         <aside className="space-y-6 lg:col-span-4">
//           {/* ✅ Ansprechpartner + Rückruf mit Objektbezug */}
//           <Section
//             icon={<BadgeCheck className="h-5 w-5" />}
//             title="Ihr Ansprechpartner"
//           >
//             <div className="flex items-start gap-4">
//               <div className="relative h-16 w-16 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
//                 <Image
//                   src={agent.imageSrc}
//                   alt={agent.name}
//                   fill
//                   className="object-cover"
//                   sizes="64px"
//                 />
//               </div>

//               <div className="min-w-0">
//                 <div className="text-sm font-semibold text-white/95">
//                   {agent.name}
//                 </div>
//                 <div className="mt-1 text-sm text-white/65">{agent.role}</div>

//                 <div className="mt-3 flex flex-wrap gap-2">
//                   <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-semibold tracking-widest text-white/80 backdrop-blur">
//                     <BadgeCheck className="h-4 w-4" />
//                     DIREKTKONTAKT
//                   </span>
//                   {agent.availability ? (
//                     <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-semibold tracking-widest text-white/75 backdrop-blur">
//                       <Calendar className="h-4 w-4" />
//                       {agent.availability}
//                     </span>
//                   ) : null}
//                 </div>
//               </div>
//             </div>

//             <div className="mt-5 grid grid-cols-1 gap-3">
//               <ContactRow
//                 icon={<Phone className="h-5 w-5" />}
//                 label="Telefon"
//                 value={agent.phone}
//                 href={agent.phoneHref}
//               />
//               <ContactRow
//                 icon={<Mail className="h-5 w-5" />}
//                 label="E-Mail"
//                 value={agent.email}
//                 href={agent.emailHref}
//               />

//               {/* ✅ Jetzt mit Objekt in Kontaktformular */}
//               <Link
//                 href={contactHref}
//                 className="mt-1 inline-flex h-11 items-center justify-center rounded-xl bg-white px-5 text-sm font-semibold text-black shadow-lg shadow-black/20 transition hover:bg-white/90"
//               >
//                 {ctaText}
//               </Link>
//             </div>
//           </Section>

//           {/* ✅ Dokumente / Exposé (auf Anfrage) – nutzt deine Komponente */}
//           <ObjectDownloadCard listing={listing} />

//           {/* ✅ Eckdaten (viel vollständiger) */}
//           <Section icon={<Ruler className="h-5 w-5" />} title="Eckdaten">
//             <div className="grid grid-cols-1 gap-3">
//               <InfoRow
//                 icon={<Euro className="h-5 w-5" />}
//                 label="Kaufpreis"
//                 value={
//                   typeof listing.price === "number" && listing.price > 0
//                     ? formatEUR(listing.price)
//                     : undefined
//                 }
//               />

//               <InfoRow
//                 icon={<Ruler className="h-5 w-5" />}
//                 label="Wohnfläche"
//                 value={
//                   typeof listing.livingArea === "number"
//                     ? `${listing.livingArea} m²`
//                     : undefined
//                 }
//               />

//               <InfoRow
//                 icon={<LandPlot className="h-5 w-5" />}
//                 label="Grundstück"
//                 value={
//                   typeof listing.plotArea === "number"
//                     ? `${listing.plotArea} m²`
//                     : undefined
//                 }
//               />

//               <InfoRow
//                 icon={<Home className="h-5 w-5" />}
//                 label="Zimmer"
//                 value={
//                   typeof listing.rooms === "number" ? listing.rooms : undefined
//                 }
//               />

//               <InfoRow
//                 icon={<BedDouble className="h-5 w-5" />}
//                 label="Schlafzimmer"
//                 value={
//                   typeof listing.bedrooms === "number"
//                     ? listing.bedrooms
//                     : undefined
//                 }
//               />

//               <InfoRow
//                 icon={<Bath className="h-5 w-5" />}
//                 label="Bäder"
//                 value={
//                   typeof listing.bathrooms === "number"
//                     ? listing.bathrooms
//                     : undefined
//                 }
//               />

//               <InfoRow
//                 icon={<Calendar className="h-5 w-5" />}
//                 label="Baujahr"
//                 value={
//                   typeof listing.yearBuilt === "number"
//                     ? listing.yearBuilt
//                     : undefined
//                 }
//               />

//               <InfoRow
//                 icon={<Leaf className="h-5 w-5" />}
//                 label="Energieklasse"
//                 value={energyClass}
//               />

//               <InfoRow
//                 icon={<Flame className="h-5 w-5" />}
//                 label="Energieträger / Heizung"
//                 value={energyCarrier}
//               />

//               <InfoRow
//                 icon={<KeyRound className="h-5 w-5" />}
//                 label="Verfügbarkeit"
//                 value={listing.availability}
//               />

//               <InfoRow
//                 icon={<KeyRound className="h-5 w-5" />}
//                 label="Courtage"
//                 value={listing.commissionText}
//               />
//             </div>
//           </Section>

//           {/* ✅ zusätzlicher Trust / Prozess Block (mehr “Substanz”) */}
//           <Section
//             icon={<ShieldCheck className="h-5 w-5" />}
//             title="So geht’s weiter"
//           >
//             <ol className="space-y-3">
//               <Step
//                 n={1}
//                 title="Anfrage"
//                 text="Exposé/Unterlagen anfordern oder Rückruf wünschen."
//               />
//               <Step
//                 n={2}
//                 title="Bestätigung"
//                 text="Wir melden uns mit Termin- oder Unterlagen-Update."
//               />
//               <Step
//                 n={3}
//                 title="Besichtigung / Beratung"
//                 text="Diskret, vorbereitet, effizient – damit Sie sicher entscheiden."
//               />
//             </ol>

//             <Link
//               href={contactHref}
//               className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 text-sm font-semibold text-white/90 backdrop-blur transition hover:bg-white/10"
//             >
//               <FileText className="mr-2 h-4 w-4" />
//               Exposé auf Anfrage
//             </Link>

//             <p className="mt-3 text-xs text-white/55">
//               Hinweis: Aus Diskretionsgründen können Dokumente/Adresse erst nach
//               Anfrage freigegeben werden.
//             </p>
//           </Section>
//         </aside>
//       </div>
//     </div>
//   );
// }

// function priceLabel(listing: EstateDetails) {
//   if (typeof listing.price === "number" && listing.price > 0)
//     return formatEUR(listing.price);
//   return "Preis auf Anfrage";
// }

// function googleMapsLink(lat: number, lng: number) {
//   return `https://www.google.com/maps?q=${lat},${lng}`;
// }

// function Kpi({ label, value }: { label: string; value: string }) {
//   return (
//     <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
//       <div className="text-xs font-semibold uppercase tracking-widest text-white/60">
//         {label}
//       </div>
//       <div className="mt-1 text-sm font-semibold text-white/90">{value}</div>
//     </div>
//   );
// }

// function Step({ n, title, text }: { n: number; title: string; text: string }) {
//   return (
//     <li className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
//       <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-black">
//         <span className="text-xs font-bold">{n}</span>
//       </div>
//       <div>
//         <div className="text-sm font-semibold text-white/90">{title}</div>
//         <div className="mt-1 text-sm text-white/70">{text}</div>
//       </div>
//     </li>
//   );
// }
