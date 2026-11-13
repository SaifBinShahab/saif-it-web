import { useEffect, useState } from "react";

// Review form for the Bangla e-book, posting to Web3Forms.
//
// Reader type is NOT user-selectable: it is read from the URL hash —
//   #review-full     → সম্পূর্ণ (read it fully)
//   #review-partial  → আংশিক (read some of it)
// — rendered as a visible, locked badge, and submitted as `reader_type`.
// Two shareable links land on the same form with the type preset.
const ASPECTS = [
  "সহজ ও স্পষ্ট বাংলা",
  "শুরু থেকে পড়ার মতো লেখা",
  "গুছানো ৮ অধ্যায়",
  "ব্যবহারিক পরামর্শ",
  "দাম ও মূল্যের মিল",
  "আনলিমিটেড ডাউনলোডের সুবিধা",
];

const RATING_BN = ["১", "২", "৩", "৪", "৫"];

type Status = "idle" | "submitting" | "success" | "error";
type ReaderType = "partial" | "full";

export default function ReviewForm({ accessKey }: { accessKey: string }) {
  const [type, setType] = useState<ReaderType>("full");
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    const read = () =>
      setType(window.location.hash.includes("review-partial") ? "partial" : "full");
    read();
    window.addEventListener("hashchange", read);
    return () => window.removeEventListener("hashchange", read);
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const form = e.currentTarget;
    const formData = new FormData(form);

    // Flatten the multi-select aspect checkboxes into one comma-joined
    // field so the notification email is easy to read.
    formData.set("loved", formData.getAll("loved").join(", "));
    formData.append("access_key", accessKey);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });
      const result = await res.json();
      setStatus(result.success ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  const inputClass =
    "w-full rounded-xl border border-[var(--eb-line)] bg-transparent px-4 py-3 text-[0.95rem] text-[var(--text)] placeholder:text-[var(--text-muted)] transition-colors focus:border-[var(--accent)] focus:outline-none";
  const labelClass =
    "mb-2 block font-mono text-[0.68rem] uppercase tracking-[0.18em] text-[var(--eb-brass)]";

  if (status === "success") {
    return (
      <div role="status" className="py-10 text-center">
        <p className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-[var(--eb-brass)]">
          অসংখ্য ধন্যবাদ
        </p>
        <h3 className="mt-3 font-['Tiro_Bangla',serif] text-[var(--fs-xl)] font-semibold text-[var(--text)]">
          আপনার রিভিউ পেয়েছি।
        </h3>
        <p className="mx-auto mt-3 max-w-[30rem] text-[0.95rem] leading-[1.9] text-[var(--text-muted)]">
          আপনার ফিডব্যাক সরাসরি লেখকের কাছে পৌঁছেছে — বইটাকে আরও সহজ,
          আরও কাজের করার কাজে লাগবে। আল্লাহ আপনার মঙ্গল করুন।
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Honeypot */}
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />
      <input
        type="hidden"
        name="subject"
        value={type === "full" ? "ই-বুক রিভিউ — সম্পূর্ণ পাঠক" : "ই-বুক রিভিউ — আংশিক পাঠক"}
      />
      <input type="hidden" name="reader_type" value={type} />

      {/* Reader type — visible, locked, not selectable */}
      <div className="rounded-2xl border border-dashed border-[var(--eb-line)] bg-[var(--eb-panel)] px-4 py-3">
        <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-[var(--text-muted)]">
          আপনি কতটুকু পড়েছেন
        </p>
        <p className="mt-1 text-[1.05rem] font-semibold text-[var(--text)]">
          {type === "full" ? "সম্পূর্ণ বইটি পড়েছি" : "আংশিক পড়েছি"}
        </p>
      </div>

      <div>
        <label htmlFor="review-name" className={labelClass}>নাম</label>
        <input id="review-name" name="name" type="text" required placeholder="আপনার নাম" className={inputClass} autoComplete="name" />
      </div>

      <fieldset>
        <legend className={labelClass}>সামগ্রিক রেটিং</legend>
        <div className="flex flex-wrap items-center gap-2" role="radiogroup" aria-label="সামগ্রিক রেটিং">
          {RATING_BN.map((n, i) => (
            <label
              key={n}
              className="flex cursor-pointer flex-col items-center gap-1 rounded-2xl border border-[var(--eb-line)] bg-[var(--eb-panel)] px-4 py-2.5 transition-colors [&:has(:checked)]:border-[var(--accent)] [&:has(:checked)]:bg-[rgba(var(--accent-rgb)/0.14)]"
            >
              <input type="radio" name="rating" value={String(i + 1)} required className="h-4 w-4 accent-[var(--accent)]" />
              <span className="text-[1.05rem] font-semibold text-[var(--text)]">{n}</span>
            </label>
          ))}
        </div>
        <p className="mt-1.5 text-[0.72rem] text-[var(--text-muted)]">১ = দুর্বল · ৫ = চমৎকার</p>
      </fieldset>

      <fieldset>
        <legend className={labelClass}>কী কী ভালো লেগেছে?</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {ASPECTS.map((a) => (
            <label
              key={a}
              className="flex cursor-pointer items-center gap-2.5 rounded-xl border border-[var(--eb-line)] bg-[var(--eb-panel)] px-3 py-2.5 text-[0.85rem] leading-snug text-[var(--text-muted)] transition-colors [&:has(:checked)]:border-[var(--accent)] [&:has(:checked)]:text-[var(--text)]"
            >
              <input type="checkbox" name="loved" value={a} className="h-4 w-4 shrink-0 accent-[var(--accent)]" />
              <span>{a}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="review-best" className={labelClass}>সবচেয়ে বেশি ভালো লেগেছে</label>
        <textarea
          id="review-best"
          name="best"
          rows={3}
          placeholder="যে অংশটি বা যে বিষয়টি আপনার সবচেয়ে কাজে লেগেছে…"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="review-improve" className={labelClass}>যেটা আরও ভালো হতে পারত</label>
        <textarea
          id="review-improve"
          name="improve"
          rows={3}
          placeholder="অভাব, অসুবিধা বা পরামর্শ — যাই হোক, খুলে লিখুন…"
          className={inputClass}
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center justify-center gap-2 rounded-full border border-[rgba(var(--accent-rgb)/0.7)] bg-[rgba(var(--accent-rgb)/0.9)] px-7 py-3.5 text-[0.95rem] font-semibold text-[#0b1013] transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 disabled:opacity-60"
      >
        {status === "submitting" ? "জমা হচ্ছে…" : "রিভিউ জমা দিন"}
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </button>

      {status === "error" && (
        <p role="alert" className="text-[0.85rem] text-red-400">
          কোথাও একটা সমস্যা হয়েছে — আবার চেষ্টা করুন, বা সরাসরি যোগাযোগ করুন।
        </p>
      )}
    </form>
  );
}
