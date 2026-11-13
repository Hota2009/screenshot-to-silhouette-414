import { describe, expect, it } from "vitest";

import { CONTACT, ENGINEERS } from "@/content/site";
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
  it("lists both engineers with their direct numbers and shared email", () => {
    expect(ENGINEERS.map(({ name }) => name.en)).toEqual([
      "Eng. Zain Al Abdeen",
      "Eng. Mohamed El Gendy",
    ]);
    expect(ENGINEERS.map(({ phone }) => phone)).toEqual(["0540950953", "0569316336"]);
    expect(ENGINEERS.every(({ email }) => email === CONTACT.email)).toBe(true);
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
