// components/unternehmen/CompanyPage.tsx
import { CompanyShell } from "./CompanyShell";
import { CompanyHero } from "./CompanyHero";
import { CompanyStats } from "./CompanyStats";
import { CompanyPillars } from "./CompanyPillars";
import { CompanyProcess } from "./CompanyProcess";
import { CompanyHighlights } from "./CompanyHighlights";
import { CompanyCta } from "./CompanyCta";

import { fetchCompanyPageContent } from "@/lib/cms/companyPage";

export default async function CompanyPage() {
  const content = await fetchCompanyPageContent();

  return (
    <CompanyShell>
      <CompanyHero content={content.hero} />
      <CompanyStats content={content.stats} />
      <CompanyPillars content={content.pillars} />
      <CompanyProcess content={content.process} />
      <CompanyHighlights content={content.highlights} />
      <CompanyCta content={content.cta} />
    </CompanyShell>
  );
}

// // components/unternehmen/CompanyPage.tsx
// import { CompanyShell } from "./CompanyShell";
// import { CompanyHero } from "./CompanyHero";
// import { CompanyStats } from "./CompnayStats";
// import { CompanyPillars } from "./CompnayPillars";
// import { CompanyProcess } from "./CompanyProcess";
// import { CompanyHighlights } from "./CompanyHighlights";
// import { CompanyCta } from "./CompantyCta";

// export function CompanyPage() {
//   return (
//     <CompanyShell>
//       <CompanyHero />
//       <CompanyStats />
//       <CompanyPillars />
//       <CompanyProcess />
//       <CompanyHighlights />
//       <CompanyCta />
//     </CompanyShell>
//   );
// }
