import { useState } from "react";

// Modular contact form (name, phone/email, message) posting to Web3Forms.
// Drop this component anywhere — homepage Contact section, /contact page,
// a future "book a call" page — with no per-page wiring needed beyond the
// PUBLIC_WEB3FORMS_ACCESS_KEY env var.
type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm({
  accessKey,
  compact = false,
  className = "",
}: {
  accessKey: string;
  compact?: boolean;
  className?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");

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

      <div>
        <label htmlFor="name" className="sr-only">Name</label>
        <input id="name" name="name" type="text" required placeholder="Name" className={inputClass} />
      </div>

      <div>
        <label htmlFor="contact" className="sr-only">Email or phone</label>
        <input id="contact" name="email_or_phone" type="text" required placeholder="Email or phone" className={inputClass} />
      </div>

      <div>
        <label htmlFor="message" className="sr-only">Message</label>
        <textarea
          id="message"
          name="message"
          required
          rows={compact ? 3 : 5}
          placeholder="What would you like to ask or discuss?"
          className={inputClass}
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--accent)] bg-[var(--accent)] px-6 py-3 text-sm font-medium text-ink transition-all duration-200 hover:brightness-110 hover:-translate-y-0.5 disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Send Message"}
      </button>

      {status === "success" && (
        <p className="text-sm text-[var(--secondary)]">
          Message received — I'll get back to you soon, in shaa Allah.
        </p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-400">
          Something went wrong. Please try again or email directly.
        </p>
      )}
    </form>
  );
}
