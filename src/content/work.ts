import type { WorkCategory } from "./site";

/** Field photographs extracted from the company profile, grouped by the profile's own sections. */
const files = import.meta.glob<string>("../assets/work/*.jpg", {
  eager: true,
  import: "default",
});

export type WorkPhoto = { id: string; src: string; category: WorkCategory };

const ORDER: WorkCategory[] = ["pumps", "generators", "motors", "transformers", "hvac"];

export const WORK_PHOTOS: WorkPhoto[] = Object.entries(files)
  .map(([path, src]) => {
    const name = path.split("/").pop()!.replace(".jpg", "");
    const [category] = name.split("-") as [string];
    return { id: name, src, category: category as WorkCategory };
  })
  .filter((p) => (ORDER as string[]).includes(p.category))
  .sort((a, b) => ORDER.indexOf(a.category) - ORDER.indexOf(b.category) || a.id.localeCompare(b.id));

export const WORK_CATEGORIES = ORDER;

export function photosFor(category: WorkCategory, limit?: number) {
  const list = WORK_PHOTOS.filter((p) => p.category === category);
  return limit ? list.slice(0, limit) : list;
}
