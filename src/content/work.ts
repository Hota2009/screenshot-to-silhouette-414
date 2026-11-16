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
  .filter((p) => p.id !== "pumps-020" && p.id !== "pumps-026")
  .sort(
    (a, b) => ORDER.indexOf(a.category) - ORDER.indexOf(b.category) || a.id.localeCompare(b.id),
  );

export const WORK_CATEGORIES = ORDER;

export function photosFor(category: WorkCategory, limit?: number) {
  const list = WORK_PHOTOS.filter((p) => p.category === category);
  return limit ? list.slice(0, limit) : list;
}

/** Red-pipe firefighting installations confirmed by the company, visually reviewed.
 * Keep the original PDF filenames and pump classification for the main gallery.
 */
const FIREFIGHTING_IDS = [
  "pumps-013",
  "pumps-021",
  "pumps-023",
  "pumps-024",
  "pumps-025",
  "pumps-034",
  "pumps-018",
  "pumps-019",
];
export const FIREFIGHTING_PHOTOS = FIREFIGHTING_IDS.flatMap((id) =>
  WORK_PHOTOS.filter((photo) => photo.id === id),
);
