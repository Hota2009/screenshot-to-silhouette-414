import { z } from "zod";

import { CONTACT } from "@/content/site";

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  company: z.string().trim().max(120).optional().default(""),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9][0-9\s-]{7,15}$/),
  email: z.string().trim().email().max(255),
  service: z.string().trim().max(160).optional().default(""),
  message: z.string().trim().min(10).max(2000),
});

export type ContactInput = z.input<typeof contactSchema>;
export type ContactData = z.output<typeof contactSchema>;
export type ContactField = "name" | "phone" | "email" | "message";

export function validateContact(input: ContactInput) {
  const result = contactSchema.safeParse(input);
  if (result.success) return { ok: true as const, data: result.data };
  const fields = new Set<ContactField>();
  for (const issue of result.error.issues) {
    const key = issue.path[0];
    if (key === "name" || key === "phone" || key === "email" || key === "message") fields.add(key);
  }
  return { ok: false as const, fields };
}

/** Builds the mailto: link that opens the visitor's email app, addressed to Engine Experts. */
export function buildMailto(data: ContactData, labels: { subject: string; lines: string[] }) {
  const body = [...labels.lines, "", data.message].join("\n");
  return `mailto:${CONTACT.email}?subject=${encodeURIComponent(labels.subject)}&body=${encodeURIComponent(body)}`;
}
