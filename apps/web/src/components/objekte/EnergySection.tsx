type Props = {
  certificateType?: "bedarf" | "verbrauch";
  value?: number; // kWh/(m²a)
  class?: string; // A+ ... H
  carrier?: string; // Gas, WP, ...
  year?: number; // Baujahr laut Ausweis
};

export function EnergySection(props: Props) {
  const hasAny =
    props.certificateType ||
    props.value ||
    props.class ||
    props.carrier ||
    props.year;

  if (!hasAny) return null;

  return (
    <section className="rounded-2xl border border-[rgba(214,181,109,0.22)] bg-black/25 p-6 backdrop-blur-xl">
      <h2 className="text-base font-semibold text-white">Energie & Heizung</h2>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <Row
          label="Energieausweis"
          value={
            props.certificateType
              ? props.certificateType === "bedarf"
                ? "Bedarfsausweis"
                : "Verbrauchsausweis"
              : undefined
          }
        />
        <Row
          label="Endenergie"
          value={
            typeof props.value === "number"
              ? `${props.value} kWh/(m²a)`
              : undefined
          }
        />
        <Row label="Effizienzklasse" value={props.class} />
        <Row label="Energieträger" value={props.carrier} />
        <Row
          label="Baujahr (EA)"
          value={props.year ? String(props.year) : undefined}
        />
      </div>
    </section>
  );
}

function Row({ label, value }: { label: string; value?: string }) {
  if (!value) return null;

  return (
    <div className="rounded-xl border border-[rgba(214,181,109,0.22)] bg-[rgba(255,255,255,0.06)] p-4">
      <div className="text-xs font-semibold uppercase tracking-widest text-white/60">
        {label}
      </div>
      <div className="mt-1 text-sm font-semibold text-white/90">{value}</div>
    </div>
  );
}
// type Props = {
//   certificateType?: "bedarf" | "verbrauch";
//   value?: number; // kWh/(m²a)
//   class?: string; // A+ ... H
//   carrier?: string; // Gas, WP, ...
//   year?: number; // Baujahr laut Ausweis
// };

// export function EnergySection(props: Props) {
//   const hasAny =
//     props.certificateType ||
//     props.value ||
//     props.class ||
//     props.carrier ||
//     props.year;

//   if (!hasAny) return null;

//   return (
//     <section className="rounded-2xl border border-white/10 bg-black/25 p-6 backdrop-blur-xl">
//       <h2 className="text-base font-semibold text-white">Energie & Heizung</h2>

//       <div className="mt-4 grid gap-3 sm:grid-cols-2">
//         <Row
//           label="Energieausweis"
//           value={
//             props.certificateType
//               ? props.certificateType === "bedarf"
//                 ? "Bedarfsausweis"
//                 : "Verbrauchsausweis"
//               : undefined
//           }
//         />
//         <Row
//           label="Endenergie"
//           value={
//             typeof props.value === "number"
//               ? `${props.value} kWh/(m²a)`
//               : undefined
//           }
//         />
//         <Row label="Effizienzklasse" value={props.class} />
//         <Row label="Energieträger" value={props.carrier} />
//         <Row
//           label="Baujahr (EA)"
//           value={props.year ? String(props.year) : undefined}
//         />
//       </div>
//     </section>
//   );
// }

// function Row({ label, value }: { label: string; value?: string }) {
//   if (!value) return null;
//   return (
//     <div className="rounded-xl border border-white/10 bg-white/5 p-4">
//       <div className="text-xs font-semibold uppercase tracking-widest text-white/60">
//         {label}
//       </div>
//       <div className="mt-1 text-sm font-semibold text-white/90">{value}</div>
//     </div>
//   );
// }
