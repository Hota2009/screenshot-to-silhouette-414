import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { BRANCHES, SERVICE_ORDER, type BranchId, type ServiceId } from "@/content/site";
import { buildMailto, validateContact, type ContactField } from "@/lib/contact";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

import { Reveal, SectionLabel, SectionTitle } from "./primitives";

const fieldBase =
  "w-full rounded-md border bg-background px-4 py-3 text-base text-foreground transition-[border-color,box-shadow] duration-300 placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/15";

export function Contact({ requestedService }: { requestedService: ServiceId | null }) {
  const { t } = useI18n();
  const c = t.contact;
  const [form, setForm] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    branch: "riyadh" as BranchId,
    service: "" as ServiceId | "",
    message: "",
  });
  const [errors, setErrors] = useState<Set<ContactField>>(new Set());

  useEffect(() => {
    if (requestedService) setForm((f) => ({ ...f, service: requestedService }));
  }, [requestedService]);

  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors.has(key as ContactField)) {
      const next = new Set(errors);
      next.delete(key as ContactField);
      setErrors(next);
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const serviceTitle = form.service ? t.services.items[form.service].title : c.fields.serviceAny;
    const result = validateContact({ ...form, service: serviceTitle });
    if (!result.ok) {
      setErrors(result.fields);
      const first = [...result.fields][0];
      document.getElementById(`cf-${first}`)?.focus();
      return;
    }
    const d = result.data;
    const href = buildMailto(d, {
      subject: `${serviceTitle} — ${d.name}`,
      lines: [
        `${c.fields.name}: ${d.name}`,
        d.company ? `${c.fields.company}: ${d.company}` : "",
        `${c.fields.phone}: ${d.phone}`,
        `${c.fields.email}: ${d.email}`,
        `${c.fields.branch}: ${t.branches[d.branch].city}`,
        `${c.fields.service}: ${serviceTitle}`,
      ].filter(Boolean),
    });
    window.location.href = href;
    toast.success(c.sent);
  };

  const err = (k: ContactField) =>
    errors.has(k) ? (
      <p id={`cf-${k}-err`} className="mt-1.5 text-sm text-destructive">
        {c.errors[k]}
      </p>
    ) : null;

  const aria = (k: ContactField) => ({
    id: `cf-${k}`,
    "aria-invalid": errors.has(k) || undefined,
    "aria-describedby": errors.has(k) ? `cf-${k}-err` : undefined,
  });

  return (
    <section id="contact" className="relative bg-background py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Reveal>
            <SectionLabel index={c.index}>{c.label}</SectionLabel>
            <SectionTitle className="mt-8">{c.title}</SectionTitle>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{c.body}</p>
          </Reveal>

          <div className="mt-10 grid gap-4">
            {BRANCHES.map((b, i) => (
              <Reveal key={b.id} delay={i * 0.08}>
                <article className="surface-navy relative overflow-hidden rounded-lg p-6 sm:p-7">
                  <div className="bg-blueprint absolute inset-0 opacity-50" />
                  <div className="relative">
                    <p className="eyebrow flex items-center gap-2 text-primary-glow">
                      <MapPin className="size-3.5" aria-hidden />
                      {t.branches[b.id].city}
                    </p>
                    <h3 className="font-display-wide mt-3 text-xl font-bold">{t.branches[b.id].engineer}</h3>
                    <div className="mt-5 grid gap-2 sm:grid-cols-2">
                      <a
                        href={`tel:${b.tel}`}
                        className="flex items-center gap-3 rounded-md border border-navy-line bg-navy-foreground/5 px-4 py-3 text-sm transition-colors hover:border-primary hover:bg-primary/15"
                      >
                        <Phone className="size-4 text-primary-glow" aria-hidden />
                        <span className="sr-only">{c.call}: </span>
                        <span dir="ltr" className="tabular-nums">
                          {b.phone}
                        </span>
                      </a>
                      <a
                        href={`mailto:${b.email}`}
                        className="flex min-w-0 items-center gap-3 rounded-md border border-navy-line bg-navy-foreground/5 px-4 py-3 text-sm transition-colors hover:border-primary hover:bg-primary/15"
                      >
                        <Mail className="size-4 shrink-0 text-primary-glow" aria-hidden />
                        <span className="sr-only">{c.email}: </span>
                        <span dir="ltr" className="truncate">
                          {b.email}
                        </span>
                      </a>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.1} className="lg:col-span-7">
          <form
            noValidate
            onSubmit={onSubmit}
            className="rounded-xl border bg-card p-6 shadow-elegant sm:p-10"
          >
            <h3 className="font-display-wide text-2xl font-bold">{c.formTitle}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{c.formNote}</p>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="cf-name" className="mb-2 block text-sm font-medium">
                  {c.fields.name} <span className="text-primary">*</span>
                </label>
                <input
                  {...aria("name")}
                  autoComplete="name"
                  value={form.name}
                  maxLength={100}
                  onChange={(e) => set("name", e.target.value)}
                  className={cn(fieldBase, errors.has("name") && "border-destructive")}
                />
                {err("name")}
              </div>
              <div>
                <label htmlFor="cf-company" className="mb-2 block text-sm font-medium">
                  {c.fields.company}
                </label>
                <input
                  id="cf-company"
                  autoComplete="organization"
                  value={form.company}
                  maxLength={120}
                  onChange={(e) => set("company", e.target.value)}
                  className={fieldBase}
                />
              </div>
              <div>
                <label htmlFor="cf-phone" className="mb-2 block text-sm font-medium">
                  {c.fields.phone} <span className="text-primary">*</span>
                </label>
                <input
                  {...aria("phone")}
                  type="tel"
                  dir="ltr"
                  inputMode="tel"
                  autoComplete="tel"
                  value={form.phone}
                  maxLength={17}
                  onChange={(e) => set("phone", e.target.value)}
                  className={cn(fieldBase, "rtl:text-right", errors.has("phone") && "border-destructive")}
                />
                {err("phone")}
              </div>
              <div>
                <label htmlFor="cf-email" className="mb-2 block text-sm font-medium">
                  {c.fields.email} <span className="text-primary">*</span>
                </label>
                <input
                  {...aria("email")}
                  type="email"
                  dir="ltr"
                  autoComplete="email"
                  value={form.email}
                  maxLength={255}
                  onChange={(e) => set("email", e.target.value)}
                  className={cn(fieldBase, "rtl:text-right", errors.has("email") && "border-destructive")}
                />
                {err("email")}
              </div>

              <fieldset className="sm:col-span-2">
                <legend className="mb-2 block text-sm font-medium">{c.fields.branch}</legend>
                <div className="grid grid-cols-2 gap-2">
                  {BRANCHES.map((b) => (
                    <label
                      key={b.id}
                      className={cn(
                        "flex cursor-pointer items-center gap-3 rounded-md border px-4 py-3 text-sm transition-[border-color,background-color] duration-300",
                        form.branch === b.id ? "border-primary bg-accent" : "hover:border-foreground/30",
                      )}
                    >
                      <input
                        type="radio"
                        name="branch"
                        value={b.id}
                        checked={form.branch === b.id}
                        onChange={() => set("branch", b.id)}
                        className="accent-primary"
                      />
                      {t.branches[b.id].city}
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="sm:col-span-2">
                <label htmlFor="cf-service" className="mb-2 block text-sm font-medium">
                  {c.fields.service}
                </label>
                <select
                  id="cf-service"
                  value={form.service}
                  onChange={(e) => set("service", e.target.value as ServiceId | "")}
                  className={cn(fieldBase, "appearance-none bg-[length:0]")}
                >
                  <option value="">{c.fields.serviceAny}</option>
                  {SERVICE_ORDER.map((id) => (
                    <option key={id} value={id}>
                      {t.services.items[id].title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="cf-message" className="mb-2 block text-sm font-medium">
                  {c.fields.message} <span className="text-primary">*</span>
                </label>
                <textarea
                  {...aria("message")}
                  rows={5}
                  maxLength={2000}
                  value={form.message}
                  placeholder={c.fields.messagePh}
                  onChange={(e) => set("message", e.target.value)}
                  className={cn(fieldBase, "resize-y", errors.has("message") && "border-destructive")}
                />
                {err("message")}
              </div>
            </div>

            <Button type="submit" variant="electric" size="xl" className="mt-8 w-full sm:w-auto">
              {c.submit}
              <Send className="flip-rtl" />
            </Button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
