import { SERVICE_ORDER, type ServiceId, type Lang } from "@/content/site";
// Current public deployment; override when the approved domain changes.
export const SITE_ORIGIN = (
  import.meta.env["VITE_SITE_URL"] || "https://screenshot-to-silhouette.ahmedhota2009.workers.dev"
).replace(/\/$/, "");
export const SERVICE_SLUGS: Record<ServiceId, string> = {
  firefighting: "firefighting-systems",
  motors: "electric-motors",
  pumps: "pump-maintenance",
  transformers: "transformer-maintenance",
  generators: "generators-ats",
  hvac: "central-hvac",
  ducting: "hvac-ducting",
};
export function serviceId(slug: string) {
  return SERVICE_ORDER.find((id) => SERVICE_SLUGS[id] === slug);
}
export function serviceHref(id: ServiceId, lang: Lang) {
  return `/services/${SERVICE_SLUGS[id]}?lang=${lang}`;
}
export function homeHref(lang: Lang, section = "services") {
  return `/?lang=${lang}#${section}`;
}
export const RELATED: Record<ServiceId, ServiceId[]> = {
  firefighting: ["pumps", "motors"],
  motors: ["pumps", "generators"],
  pumps: ["motors", "firefighting"],
  transformers: ["generators", "motors"],
  generators: ["transformers", "motors"],
  hvac: ["ducting", "pumps"],
  ducting: ["hvac", "motors"],
};
