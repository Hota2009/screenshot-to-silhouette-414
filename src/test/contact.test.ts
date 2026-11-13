import { describe, expect, it } from "vitest";

import { CONTACT } from "@/content/site";
import { buildMailto, validateContact } from "@/lib/contact";

const valid = {
  name: "Ahmed",
  company: "",
  phone: "0551234567",
  email: "ahmed@example.com",
  service: "Pumps",
  message: "Our fire pump needs servicing.",
};

describe("contact details", () => {
  it("uses the unified engineer phone and email", () => {
    expect(CONTACT.phone).toBe("0540950953");
    expect(CONTACT.tel).toBe("+966540950953");
    expect(CONTACT.email).toBe("Engine-expert@outlook.com");
  });
});

describe("contact form", () => {
  it("rejects a missing name, bad email and short message", () => {
    const r = validateContact({ ...valid, name: "", email: "nope", message: "hi" });
    expect(r.ok).toBe(false);
    if (!r.ok) expect([...r.fields].sort()).toEqual(["email", "message", "name"]);
  });

  it("addresses the email to Engine Experts", () => {
    const r = validateContact(valid);
    expect(r.ok).toBe(true);
    if (r.ok) {
      const href = buildMailto(r.data, { subject: "Pumps", lines: [] });
      expect(href.startsWith(`mailto:${CONTACT.email}?`)).toBe(true);
    }
  });
});
