"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  coverNoteFor,
  emailDraft,
  formRules,
  internDesk,
  jobChannel,
  jobs,
  mailtoFor,
  resumeAbsPath,
  RESUME_FILE,
  statusLabel,
  type Job,
  type JobStatus,
} from "@/lib/intern-tracker";
import { PageCol } from "@/lib/ui";

type Filter = "to_apply" | "email" | "applied" | "hold" | "all";

type Marks = Record<
  string,
  { status: JobStatus; appliedOn?: string; note?: string }
>;

const FILTERS: { id: Filter; label: string }[] = [
  { id: "to_apply", label: "To apply" },
  { id: "email", label: "Cold email" },
  { id: "applied", label: "Applied" },
  { id: "hold", label: "Hold" },
  { id: "all", label: "All" },
];

const STATUS_OPTIONS: JobStatus[] = [
  "to_apply",
  "applied",
  "interview",
  "offer",
  "rejected",
  "hold",
];

const STORAGE_MARKS = "intern-desk-marks";
const STORAGE_STATUS = "intern-desk-status";

function loadMarks(): Marks {
  if (typeof window === "undefined") return {};
  try {
    const next = window.localStorage.getItem(STORAGE_MARKS);
    if (next) return JSON.parse(next) as Marks;
    const legacy = window.localStorage.getItem(STORAGE_STATUS);
    if (!legacy) return {};
    const parsed = JSON.parse(legacy) as Record<string, JobStatus>;
    return Object.fromEntries(
      Object.entries(parsed).map(([id, status]) => [id, { status }]),
    );
  } catch {
    return {};
  }
}

function statusTone(status: JobStatus) {
  if (status === "to_apply") return "border-coral/40 bg-coral/10 text-ink";
  if (status === "applied" || status === "interview")
    return "border-signal/30 bg-signal/10 text-ink";
  if (status === "offer") return "border-ink/20 bg-ink text-paper";
  if (status === "rejected") return "border-line bg-surface text-ink-muted";
  return "border-line bg-paper text-ink-muted";
}

export function InternDesk() {
  const [filter, setFilter] = useState<Filter>("to_apply");
  const [marks, setMarks] = useState<Marks>({});
  const [ready, setReady] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [opening, setOpening] = useState<string | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    setMarks(loadMarks());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem(STORAGE_MARKS, JSON.stringify(marks));
  }, [marks, ready]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 2800);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const rows = useMemo(
    () =>
      jobs.map((job) => ({
        ...job,
        status: marks[job.id]?.status ?? job.status,
        appliedOn: marks[job.id]?.appliedOn,
        note: marks[job.id]?.note ?? "",
      })),
    [marks],
  );

  const visible = rows.filter((job) => {
    if (filter === "all") return true;
    if (filter === "email") return jobChannel(job) === "email";
    if (filter === "applied")
      return ["applied", "interview", "offer"].includes(job.status);
    return job.status === filter;
  });

  const left = rows.filter((job) => job.status === "to_apply").length;
  const mailed = rows.filter(
    (job) => jobChannel(job) === "email" && job.status === "to_apply",
  ).length;
  const applied = rows.filter((job) =>
    ["applied", "interview", "offer"].includes(job.status),
  ).length;

  async function copy(text: string, label: string) {
    await navigator.clipboard.writeText(text);
    setToast(`Copied ${label}`);
  }

  function setStatus(id: string, status: JobStatus) {
    setMarks((current) => ({
      ...current,
      [id]: {
        ...current[id],
        status,
        appliedOn:
          status === "applied"
            ? (current[id]?.appliedOn ??
              new Date().toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
              }))
            : current[id]?.appliedOn,
      },
    }));
  }

  function setNote(id: string, note: string) {
    setMarks((current) => ({
      ...current,
      [id]: {
        status: current[id]?.status ?? jobs.find((job) => job.id === id)?.status ?? "to_apply",
        ...current[id],
        note,
      },
    }));
  }

  function markApplied(job: Job) {
    if (job.status === "applied") {
      setStatus(job.id, jobChannel(job) === "email" ? "to_apply" : "to_apply");
      setToast(`Moved ${job.company} back to the queue`);
      return;
    }
    setStatus(job.id, "applied");
    setToast(
      jobChannel(job) === "email"
        ? `Marked ${job.company} sent`
        : `Marked ${job.company} applied`,
    );
  }

  async function applyNow(job: Job) {
    await copy(coverNoteFor(job), "cover + details");
    window.open(job.href, "_blank", "noreferrer");
    setToast("Details copied — paste into the form, upload the resume");
  }

  async function sendMail(job: Job) {
    const draft = emailDraft(job);
    if (draft) await copy(draft, "email");
    const href = mailtoFor(job);
    if (href) window.location.href = href;
    setToast(
      href
        ? "Mail.app should open with the email filled"
        : "Email copied — paste into LinkedIn or careers",
    );
  }

  async function openResume(job: Job) {
    setOpening(job.id);
    try {
      const response = await fetch("/api/intern/open-resume", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id: job.id }),
      });
      if (response.ok) {
        setToast(`Opened ${job.resume}/${RESUME_FILE} in Preview`);
        return;
      }
      await navigator.clipboard.writeText(resumeAbsPath(job));
      setToast("Copied Finder path — Cmd-Shift-G");
    } catch {
      setToast("Could not open that resume on this Mac");
    } finally {
      setOpening(null);
    }
  }

  return (
    <main id="main" className="animate-fade-in pb-24">
      <header className="border-b border-line">
        <PageCol className="flex h-16 items-center justify-between sm:h-[4.5rem]">
          <div>
            <p className="site-meta">Unlisted</p>
            <p className="text-[15px] font-semibold tracking-[-0.03em] text-ink">
              Intern desk
            </p>
          </div>
          <Link
            href="/"
            className="text-[14px] text-ink-muted transition-colors hover:text-ink"
          >
            Portfolio
          </Link>
        </PageCol>
      </header>

      <PageCol className="pt-10 sm:pt-14">
        <p className="site-meta">Ready pack · {internDesk.asOf}</p>
        <h1 className="mt-4 max-w-[18ch] font-display text-study font-semibold text-ink">
          You apply. I keep the resume, details, and mail ready.
        </h1>
        <p className="mt-4 max-w-[54ch] text-[16px] leading-[1.6] text-ink-muted">
          Job sites will not let this page type into their forms. Apply copies
          your details and cover, then opens the listing. Lost listings get a
          finished email. Resumes stay on this Mac.
        </p>

        <div className="mt-10 grid gap-3 sm:grid-cols-3">
          <Stat value={String(left)} label="Still to apply" />
          <Stat value={String(applied)} label="Applied / sent" />
          <Stat value={String(mailed)} label="Cold emails waiting" />
        </div>

        <section className="mt-10 rounded-[1.25rem] border border-line/70 bg-surface/70 px-5 py-5 sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-display text-[18px] font-semibold text-ink">
                Paste kit
              </p>
              <p className="mt-1 text-[13px] text-ink-muted">
                One tap copies a field. Apply on a card copies the full cover.
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                copy(
                  formRules.map(([label, value]) => `${label}: ${value}`).join("\n"),
                  "all details",
                )
              }
              className="inline-flex min-h-10 items-center rounded-full bg-ink px-4 text-[14px] text-paper"
            >
              Copy all details
            </button>
          </div>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {formRules.map(([label, value]) => (
              <li key={label}>
                <button
                  type="button"
                  onClick={() => copy(value, label.toLowerCase())}
                  className="flex w-full items-baseline justify-between gap-3 rounded-[1rem] border border-line bg-paper px-3 py-2.5 text-left transition-colors hover:border-signal"
                >
                  <span className="shrink-0 text-[12px] text-ink-muted">
                    {label}
                  </span>
                  <span className="truncate text-[13px] text-ink">{value}</span>
                </button>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-10 flex flex-wrap gap-2 border-b border-line pb-4">
          {FILTERS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setFilter(item.id)}
              className={`inline-flex min-h-10 items-center rounded-full px-3.5 text-[14px] transition-colors ${
                filter === item.id
                  ? "bg-ink text-paper"
                  : "bg-surface text-ink-muted hover:text-ink"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <ul className="mt-6 space-y-4">
          {visible.length === 0 ? (
            <li className="rounded-[1.25rem] border border-line/70 bg-surface/70 px-5 py-8 text-[15px] text-ink-muted">
              Nothing here. Prompt me with a new listing and I will add the
              resume, cover, and apply link.
            </li>
          ) : null}
          {visible.map((job) => {
            const email = jobChannel(job) === "email";
            const expanded = openId === job.id;
            return (
              <li key={job.id}>
                <article className="site-card hover:translate-y-0 hover:shadow-none">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="site-meta">
                        {String(job.order).padStart(2, "0")} ·{" "}
                        {email ? "Cold email" : "Apply"} · {job.term}
                      </p>
                      <h2 className="mt-2 font-display text-card font-semibold text-ink">
                        {job.company}
                      </h2>
                      <p className="mt-1 text-[16px] text-ink">{job.role}</p>
                    </div>
                    <span
                      className={`inline-flex rounded-full border px-2.5 py-1 text-[12px] ${statusTone(job.status)}`}
                    >
                      {statusLabel[job.status]}
                      {job.appliedOn ? ` · ${job.appliedOn}` : ""}
                    </span>
                  </div>
                  <p className="mt-4 text-[16px] leading-[1.6] text-ink">
                    {job.why}
                  </p>
                  <p className="mt-2 text-[14px] text-ink-muted">
                    {job.when} · {job.where}
                  </p>
                  <p className="mt-1 text-[13px] text-ink-muted">
                    Resume: {job.resume}/{RESUME_FILE} · {job.lead}
                  </p>

                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    {email ? (
                      <button
                        type="button"
                        onClick={() => sendMail(job)}
                        className="inline-flex min-h-10 items-center rounded-full bg-ink px-4 text-[14px] text-paper"
                      >
                        {mailtoFor(job) ? "Open filled email" : "Copy email"}
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => applyNow(job)}
                        className="inline-flex min-h-10 items-center rounded-full bg-ink px-4 text-[14px] text-paper"
                      >
                        Apply + copy details
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => openResume(job)}
                      disabled={opening === job.id}
                      className="inline-flex min-h-10 items-center rounded-full border border-line bg-paper px-4 text-[14px] text-ink disabled:opacity-50"
                    >
                      {opening === job.id ? "Opening…" : "Open resume"}
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        copy(coverNoteFor(job), "cover note")
                      }
                      className="inline-flex min-h-10 items-center rounded-full border border-line bg-paper px-4 text-[14px] text-ink"
                    >
                      Copy cover
                    </button>
                    <button
                      type="button"
                      onClick={() => markApplied(job)}
                      className={`inline-flex min-h-10 items-center rounded-full px-4 text-[14px] ${
                        job.status === "applied"
                          ? "border border-signal/40 bg-signal/10 text-ink"
                          : "bg-coral/15 text-ink"
                      }`}
                    >
                      {job.status === "applied"
                        ? "Undo"
                        : email
                          ? "Mark sent"
                          : "Mark applied"}
                    </button>
                    {job.extraHref ? (
                      <a
                        href={job.extraHref}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex min-h-10 items-center px-2 text-[14px] font-medium text-signal"
                      >
                        {job.extraLabel}
                      </a>
                    ) : null}
                    <button
                      type="button"
                      onClick={() =>
                        setOpenId(expanded ? null : job.id)
                      }
                      className="inline-flex min-h-10 items-center px-2 text-[14px] text-ink-muted hover:text-ink"
                    >
                      {expanded ? "Hide kit" : "Show kit"}
                    </button>
                    <label className="sr-only" htmlFor={`status-${job.id}`}>
                      Status for {job.company}
                    </label>
                    <select
                      id={`status-${job.id}`}
                      value={job.status}
                      onChange={(event) =>
                        setStatus(job.id, event.target.value as JobStatus)
                      }
                      className="min-h-10 rounded-full border border-line bg-paper px-3 text-[14px] text-ink"
                    >
                      {STATUS_OPTIONS.map((status) => (
                        <option key={status} value={status}>
                          {statusLabel[status]}
                        </option>
                      ))}
                    </select>
                  </div>

                  {expanded ? (
                    <div className="mt-5 space-y-4 border-t border-line pt-5">
                      <p className="text-[13px] leading-snug text-ink-muted">
                        {job.risk}
                      </p>
                      <pre className="overflow-x-auto whitespace-pre-wrap rounded-[1rem] bg-paper px-4 py-3 text-[13px] leading-[1.55] text-ink">
                        {email ? emailDraft(job) : coverNoteFor(job)}
                      </pre>
                      <label className="block text-[13px] text-ink-muted" htmlFor={`note-${job.id}`}>
                        Your note
                      </label>
                      <textarea
                        id={`note-${job.id}`}
                        value={job.note}
                        onChange={(event) => setNote(job.id, event.target.value)}
                        rows={3}
                        placeholder="Confirmation number, recruiter name, date submitted…"
                        className="w-full rounded-[1rem] border border-line bg-paper px-3 py-2.5 text-[14px] text-ink outline-none focus:border-signal"
                      />
                    </div>
                  ) : null}
                </article>
              </li>
            );
          })}
        </ul>
      </PageCol>

      {toast ? (
        <p className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-full bg-ink px-4 py-2 text-[13px] text-paper shadow-lg">
          {toast}
        </p>
      ) : null}
    </main>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-[1.25rem] border border-line/70 bg-surface/70 px-5 py-4">
      <p className="font-display text-[1.75rem] font-semibold tracking-[-0.04em] text-ink">
        {value}
      </p>
      <p className="mt-1 text-[13px] text-ink-muted">{label}</p>
    </div>
  );
}
