import CategoryRow from "./CategoryRow";
import { CategoryRow as CategoryRowType } from "@/lib/types/listings";

type Props = {
  rows: CategoryRowType[];
};

export default function SliderArea({ rows }: Props) {
  return (
    <section className="w-full select-none">
      {rows.map((row) => (
        <div
          key={row.id}
          className="relative left-1/2 right-1/2 w-screen -ml-[50vw] -mr-[50vw] pb-6"
        >
          <CategoryRow row={row} />
        </div>
      ))}
    </section>
  );
}
