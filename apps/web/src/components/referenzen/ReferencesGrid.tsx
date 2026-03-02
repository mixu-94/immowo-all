import { ReferenceCard } from "./ReferencesCard";

type LocationLike = string | { label?: string; region?: string } | undefined;

type ReferenceLike = {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  category: string;
  year: string;
  description: string;
  highlights: string[];
  isFeatured?: boolean;
  location?: LocationLike;
  facts?: any;
  coverImage?: { src: string; alt: string };
  links?: { label: string; href: string }[];
};

type Props = {
  projects: ReferenceLike[];
};

export function ReferencesGrid({ projects }: Props) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-2">
      {projects.map((p) => (
        <ReferenceCard key={p.id} project={p} />
      ))}
    </div>
  );
}
