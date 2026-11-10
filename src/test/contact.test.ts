import { describe, expect, it } from "vitest";

import { BRANCHES } from "@/content/site";
import { buildMailto, validateContact } from "@/lib/contact";

const valid = {
  name: "Ahmed",
  company: "",
  phone: "0551234567",
  email: "ahmed@example.com",
  branch: "dammam" as const,
  service: "Pumps",
  message: "Our fire pump needs servicing.",
};

describe("branch contact details", () => {
  it("keeps the Riyadh branch phone and email from the profile", () => {
    const riyadh = BRANCHES.find((b) => b.id === "riyadh")!;
    expect(riyadh.phone).toBe("0583454844");
    expect(riyadh.email).toBe("zahmed2030@outlook.sa");
  });

  it("keeps the Dammam branch phone and email from the profile", () => {
    const dammam = BRANCHES.find((b) => b.id === "dammam")!;
    expect(dammam.phone).toBe("0569316336");
    expect(dammam.email).toBe("Mohamedelgendy20@outlook.sa");
  });
});

describe("contact form", () => {
  it("rejects a missing name, bad email and short message", () => {
    const r = validateContact({ ...valid, name: "", email: "nope", message: "hi" });
    expect(r.ok).toBe(false);
    if (!r.ok) expect([...r.fields].sort()).toEqual(["email", "message", "name"]);
  });

  it("addresses the email to the chosen branch", () => {
    const r = validateContact(valid);
    expect(r.ok).toBe(true);
    if (r.ok) {
      const href = buildMailto(r.data, { subject: "Pumps", lines: [] });
      expect(href.startsWith("mailto:Mohamedelgendy20@outlook.sa?")).toBe(true);
    }
  });
});
