import { useState } from "react";

// Modular contact form (name, phone/email, message) posting to Web3Forms.
// Drop this component anywhere — homepage Contact section, /contact page,
// an order form on a sales page — with no per-page wiring needed beyond
// passing accessKey (see contact.web3formsAccessKey in siteConfig.ts).
//
// `subject` tags the notification email (useful to tell "ebook order" apart
// from a general inquiry). `defaultMessage` pre-fills the message field.
// `labels` lets a page override the (English-by-default) UI text — e.g. for
// a fully Bangla page — without forking the component.
type Status = "idle" | "submitting" | "success" | "error";

type Labels = {
  namePlaceholder?: string;
  contactPlaceholder?: string;
  messagePlaceholder?: string;
  submitLabel?: string;
  submittingLabel?: string;
  successMessage?: string;
  errorMessage?: string;
};

export default function ContactForm({
  accessKey,
  compact = false,
  className = "",
  subject,
  defaultMessage,
  labels = {},
}: {
  accessKey: string;
  compact?: boolean;
  className?: string;
  subject?: string;
  defaultMessage?: string;
  labels?: Labels;
}) {
  const [status, setStatus] = useState<Status>("idle");

  const t = {
    namePlaceholder: labels.namePlaceholder ?? "Name",
    contactPlaceholder: labels.contactPlaceholder ?? "Email or phone",
    messagePlaceholder: labels.messagePlaceholder ?? "What would you like to ask or discuss?",
    submitLabel: labels.submitLabel ?? "Send Message",
    submittingLabel: labels.submittingLabel ?? "Sending…",
    successMessage: labels.successMessage ?? "Message received — I'll get back to you soon, in shaa Allah.",
    errorMessage: labels.errorMessage ?? "Something went wrong. Please try again or email directly.",
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append("access_key", accessKey);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });
      const result = await res.json();
      if (result.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const inputClass =
    "w-full rounded-lg border border-[var(--border)] bg-transparent px-4 py-3 text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] transition-colors focus:border-[var(--accent)] focus:outline-none";

  return (
    <form
      onSubmit={handleSubmit}
      className={`space-y-4 ${compact ? "max-w-md" : "max-w-xl"} ${className}`}
    >
      {/* Honeypot field — hidden from real users, catches basic bots */}
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />
      {subject && <input type="hidden" name="subject" value={subject} />}

      <div>
        <label htmlFor="name" className="sr-only">Name</label>
        <input id="name" name="name" type="text" required placeholder={t.namePlaceholder} className={inputClass} />
      </div>

      <div>
        <label htmlFor="contact" className="sr-only">Email or phone</label>
        <input id="contact" name="email_or_phone" type="text" required placeholder={t.contactPlaceholder} className={inputClass} />
      </div>

      <div>
        <label htmlFor="message" className="sr-only">Message</label>
        <textarea
          id="message"
          name="message"
          required
          rows={compact ? 3 : 5}
          placeholder={t.messagePlaceholder}
          defaultValue={defaultMessage}
          className={inputClass}
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--accent)] bg-[var(--accent)] px-6 py-3 text-sm font-medium text-ink transition-all duration-200 hover:brightness-110 hover:-translate-y-0.5 disabled:opacity-60"
      >
        {status === "submitting" ? t.submittingLabel : t.submitLabel}
      </button>

      {status === "success" && (
        <p className="text-sm text-[var(--secondary)]">{t.successMessage}</p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-400">{t.errorMessage}</p>
      )}
    </form>
  );
}
