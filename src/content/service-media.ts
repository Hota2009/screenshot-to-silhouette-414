import ductingImg from "@/assets/service-ducting.jpg";
import generatorsImg from "@/assets/service-generators.jpg";
import hvacImg from "@/assets/service-hvac.jpg";
import motorsImg from "@/assets/service-motors.jpg";
import pumpsImg from "@/assets/service-pumps.jpg";
import transformersImg from "@/assets/service-transformers.jpg";
import firefightingImg from "@/assets/service-firefighting-ai.jpg";
import type { ServiceId } from "./site";

/** Shared cover imagery for service cards and detail-page heroes. */
export const SERVICE_IMAGES: Record<ServiceId, string> = {
  firefighting: firefightingImg,
  motors: motorsImg,
  pumps: pumpsImg,
  transformers: transformersImg,
  generators: generatorsImg,
  hvac: hvacImg,
  ducting: ductingImg,
};

// AI-generated artwork is used only for the service card and cover, not the field gallery.
export const SERVICE_COVERS: Record<ServiceId, string> = {
  ...SERVICE_IMAGES,
  firefighting: firefightingImg,
};
