import SliderArea from "@/components/home/SliderArea";
import Header from "@/components/base/header/Header";
import { fetchHomeContent } from "@/lib/cms/home";
import { getCategoryRows } from "@/lib/data/listings";

export default async function Home() {
  const [homeContent, rows] = await Promise.all([
    fetchHomeContent(),
    getCategoryRows(),
  ]);

  return (
    <div className="relative">
      {/* HERO */}
      <Header content={homeContent.header} />

      {/* OVERLAP CONTENT */}
      <section className="relative z-20 -mt-24 md:-mt-36">
        <SliderArea rows={rows} />
      </section>
    </div>
  );
}
