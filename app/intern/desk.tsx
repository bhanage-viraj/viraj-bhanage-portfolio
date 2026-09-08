"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  chatLog,
  coldMail,
  formRules,
  hold,
  internDesk,
  jobs,
  statusLabel,
  timeline,
  windows,
  type ChatEntry,
  type Job,
  type JobStatus,
} from "@/lib/intern-tracker";
import { PageCol } from "@/lib/ui";

type Tab = "queue" | "timeline" | "watch" | "mail" | "rules";

const TABS: { id: Tab; label: string }[] = [
  { id: "queue", label: "Apply queue" },
  { id: "timeline", label: "Timeline" },
  { id: "watch", label: "Hold" },
  { id: "mail", label: "Cold email" },
  { id: "rules", label: "Form rules" },
];

const STATUS_OPTIONS: JobStatus[] = [
  "to_apply",
  "applied",
  "interview",
  "offer",
  "rejected",
  "hold",
];

const STORAGE_STATUS = "intern-desk-status";
const STORAGE_NOTES = "intern-desk-notes";
const STORAGE_LOCAL_CHAT = "intern-desk-local-chat";

function loadJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
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
  const [tab, setTab] = useState<Tab>("queue");
  const [overrides, setOverrides] = useState<Record<string, JobStatus>>({});
  const [notes, setNotes] = useState("");
  const [localChat, setLocalChat] = useState<ChatEntry[]>([]);
  const [draft, setDraft] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setOverrides(loadJson(STORAGE_STATUS, {}));
    setNotes(loadJson(STORAGE_NOTES, ""));
    setLocalChat(loadJson(STORAGE_LOCAL_CHAT, []));
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem(STORAGE_STATUS, JSON.stringify(overrides));
  }, [overrides, ready]);

  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem(STORAGE_NOTES, JSON.stringify(notes));
  }, [notes, ready]);

  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem(STORAGE_LOCAL_CHAT, JSON.stringify(localChat));
  }, [localChat, ready]);

  const rows = useMemo(
    () =>
      jobs.map((job) => ({
        ...job,
        status: overrides[job.id] ?? job.status,
      })),
    [overrides],
  );

  const left = rows.filter((job) => job.status === "to_apply").length;
  const moving = rows.filter((job) =>
    ["applied", "interview", "offer"].includes(job.status),
  ).length;

  function setStatus(id: string, status: JobStatus) {
    setOverrides((current) => ({ ...current, [id]: status }));
  }

  function sendNote() {
    const text = draft.trim();
    if (!text) return;
    setLocalChat((current) => [
      ...current,
      {
        id: `local-${Date.now()}`,
        at: new Date().toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
        from: "you",
        text,
      },
    ]);
    setDraft("");
  }

  return (
    <main id="main" className="animate-fade-in pb-20">
      <header className="border-b border-line">
        <PageCol className="flex h-16 items-center justify-between sm:h-[4.5rem]">
          <div>
            <p className="site-meta">Private desk</p>
            <p className="text-[15px] font-semibold tracking-[-0.03em] text-ink">
              Intern 2027
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
        <p className="site-meta">Source · Cursor search chat · {internDesk.asOf}</p>
        <h1 className="mt-4 max-w-[18ch] font-display text-study font-semibold text-ink">
          Jobs, resumes, and the timeline from this search.
        </h1>
        <p className="mt-4 max-w-[52ch] text-[16px] leading-[1.6] text-ink-muted">
          Official rows live in the repo and I update them from the internship
          chat. Status you change here stays on this browser. Bookmark this
          unlisted URL — it is not in the public nav.
        </p>

        <div className="mt-10 grid gap-3 sm:grid-cols-4">
          <Stat value={String(left)} label="Still to apply" />
          <Stat value={String(moving)} label="Applied / in process" />
          <Stat value="10" label="Formal apps this week" />
          <Stat value="2" label="TikTok slots — use 1" />
        </div>

        <p className="mt-6 rounded-[1.25rem] border border-coral/30 bg-coral/5 px-5 py-4 text-[15px] leading-snug text-ink">
          Capital One OA closed 7 Sep. This week: Revolut, Argmax, ego, FrontPage,
          RunAnywhere email, AppLovin, TikTok Creation (slot 1). Hold TikTok Live
          Sydney. N26 only if you can move to Berlin/Barcelona. Location Bali.
          Phone +91 8855867440. Sponsorship needed.
        </p>
      </PageCol>

      <PageCol className="mt-12 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div>
          <div className="flex flex-wrap gap-2 border-b border-line pb-4">
            {TABS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setTab(item.id)}
                className={`inline-flex min-h-10 items-center rounded-full px-3.5 text-[14px] transition-colors ${
                  tab === item.id
                    ? "bg-ink text-paper"
                    : "bg-surface text-ink-muted hover:text-ink"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {tab === "queue" ? (
            <Queue
              rows={rows}
              notes={notes}
              onNotes={setNotes}
              onStatus={setStatus}
            />
          ) : null}
          {tab === "timeline" ? <Timeline /> : null}
          {tab === "watch" ? <Hold /> : null}
          {tab === "mail" ? <Mail /> : null}
          {tab === "rules" ? <Rules /> : null}
        </div>

        <aside className="lg:sticky lg:top-6">
          <div className="rounded-card border border-line/70 bg-surface/70">
            <div className="border-b border-line px-5 py-4">
              <p className="font-display text-[18px] font-semibold text-ink">
                This search
              </p>
              <p className="mt-1 text-[13px] leading-snug text-ink-muted">
                I write the official log. Notes you type stay on this device
                until you tell me in Cursor.
              </p>
            </div>
            <div className="flex max-h-[28rem] flex-col gap-4 overflow-y-auto px-5 py-4">
              {[...chatLog, ...localChat].map((entry) => (
                <div key={entry.id}>
                  <p className="site-meta">
                    {entry.from === "cursor" ? "Cursor" : "You"} · {entry.at}
                  </p>
                  <p className="mt-1.5 text-[14px] leading-[1.55] text-ink">
                    {entry.text}
                  </p>
                </div>
              ))}
            </div>
            <form
              className="border-t border-line p-4"
              onSubmit={(event) => {
                event.preventDefault();
                sendNote();
              }}
            >
              <label className="sr-only" htmlFor="desk-note">
                Note for this desk
              </label>
              <textarea
                id="desk-note"
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                rows={3}
                placeholder="I applied to Revolut — tell Cursor so the official row moves."
                className="w-full resize-none rounded-[1rem] border border-line bg-paper px-3 py-2.5 text-[14px] text-ink outline-none focus:border-signal"
              />
              <button
                type="submit"
                className="mt-2 inline-flex min-h-10 items-center rounded-full bg-ink px-4 text-[14px] text-paper"
              >
                Save note
              </button>
            </form>
          </div>
        </aside>
      </PageCol>
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

function Queue({
  rows,
  notes,
  onNotes,
  onStatus,
}: {
  rows: Job[];
  notes: string;
  onNotes: (value: string) => void;
  onStatus: (id: string, status: JobStatus) => void;
}) {
  return (
    <div className="mt-8 space-y-5">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[40rem] text-left text-[14px]">
          <thead>
            <tr className="site-meta border-b border-line">
              <th className="py-2 pr-3 font-medium">#</th>
              <th className="py-2 pr-3 font-medium">Company</th>
              <th className="py-2 pr-3 font-medium">Term</th>
              <th className="py-2 pr-3 font-medium">Status</th>
              <th className="py-2 font-medium">Resume</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((job) => (
              <tr key={job.id} className="border-b border-line/70">
                <td className="py-3 pr-3 text-ink-muted">{job.order}</td>
                <td className="py-3 pr-3 text-ink">{job.company}</td>
                <td className="py-3 pr-3 text-ink-muted">{job.term}</td>
                <td className="py-3 pr-3">
                  <span
                    className={`inline-flex rounded-full border px-2 py-0.5 text-[12px] ${statusTone(job.status)}`}
                  >
                    {statusLabel[job.status]}
                  </span>
                </td>
                <td className="py-3">
                  <a
                    href={`/api/intern/resume/${job.id}`}
                    className="text-signal underline decoration-signal/40 underline-offset-4 hover:decoration-signal"
                  >
                    PDF
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {rows.map((job) => (
        <article
          key={job.id}
          className="site-card hover:translate-y-0 hover:shadow-none"
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="site-meta">
                {String(job.order).padStart(2, "0")} · {job.term}
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
            </span>
          </div>
          <p className="mt-4 text-[16px] leading-[1.6] text-ink">{job.why}</p>
          <p className="mt-3 text-[15px] text-ink-muted">
            {job.when} · {job.where}
          </p>
          <p className="mt-2 text-[15px] text-ink-muted">Watch: {job.risk}</p>
          <p className="mt-2 text-[13px] text-ink-muted">
            Resume angle: {job.lead}
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <label className="sr-only" htmlFor={`status-${job.id}`}>
              Status for {job.company}
            </label>
            <select
              id={`status-${job.id}`}
              value={job.status}
              onChange={(event) =>
                onStatus(job.id, event.target.value as JobStatus)
              }
              className="min-h-10 rounded-full border border-line bg-paper px-3 text-[14px] text-ink"
            >
              {STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  {statusLabel[status]}
                </option>
              ))}
            </select>
            <a
              href={job.href}
              target="_blank"
              rel="noreferrer"
              className="text-[15px] font-medium text-ink underline decoration-ink/25 underline-offset-[5px] hover:decoration-ink"
            >
              {job.applyLabel}
            </a>
            {job.extraHref ? (
              <a
                href={job.extraHref}
                target="_blank"
                rel="noreferrer"
                className="text-[15px] font-medium text-signal"
              >
                {job.extraLabel}
              </a>
            ) : null}
            <a
              href={`/api/intern/resume/${job.id}`}
              className="text-[15px] font-medium text-signal"
            >
              Open {job.resume}
            </a>
          </div>
        </article>
      ))}

      <div>
        <h3 className="font-display text-[20px] font-semibold text-ink">
          Your notes
        </h3>
        <textarea
          value={notes}
          onChange={(event) => onNotes(event.target.value)}
          rows={4}
          placeholder="Confirmation emails, recruiter names, dates you submitted…"
          className="mt-3 w-full rounded-[1.25rem] border border-line bg-paper px-4 py-3 text-[15px] text-ink outline-none focus:border-signal"
        />
      </div>
    </div>
  );
}

function Timeline() {
  return (
    <div className="mt-8 space-y-10">
      <section>
        <h2 className="font-display text-[22px] font-semibold text-ink">
          When to act
        </h2>
        <p className="mt-2 max-w-[48ch] text-[15px] text-ink-muted">
          Only periods that start January 2027, Summer 2027, or 2027 with the
          date unpublished.
        </p>
        <dl className="mt-6 divide-y divide-line border-y border-line">
          {timeline.map((row) => (
            <div
              key={row.when}
              className="grid gap-2 py-4 sm:grid-cols-[13rem_minmax(0,1fr)]"
            >
              <dt className="text-[15px] font-medium text-ink">{row.when}</dt>
              <dd className="text-[15px] text-ink-muted">{row.jobs}</dd>
            </div>
          ))}
        </dl>
      </section>
      <section>
        <h2 className="font-display text-[22px] font-semibold text-ink">
          By start window
        </h2>
        <dl className="mt-6 divide-y divide-line border-y border-line">
          {windows.map((row) => (
            <div
              key={row.window}
              className="grid gap-2 py-4 sm:grid-cols-[13rem_minmax(0,1fr)]"
            >
              <dt className="text-[15px] font-medium text-ink">{row.window}</dt>
              <dd className="text-[15px] text-ink-muted">{row.companies}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}

function Hold() {
  return (
    <div className="mt-8">
      <h2 className="font-display text-[22px] font-semibold text-ink">
        Do not spend a slot on these yet
      </h2>
      <dl className="mt-6 divide-y divide-line border-y border-line">
        {hold.map((row) => (
          <div key={row.company} className="grid gap-2 py-4 sm:grid-cols-2">
            <dt className="text-[15px] font-medium text-ink">{row.company}</dt>
            <dd className="text-[15px] text-ink-muted">{row.why}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function Mail() {
  return (
    <div className="mt-8">
      <h2 className="font-display text-[22px] font-semibold text-ink">
        After the formal apps
      </h2>
      <p className="mt-2 max-w-[48ch] text-[15px] text-ink-muted">
        Companies under ~50 with an iOS product. Do not spray CRED / PhonePe /
        Meta / Google HR.
      </p>
      <ul className="mt-6 space-y-4">
        {coldMail.map((row) => (
          <li
            key={row.company}
            className="rounded-[1.25rem] border border-line/70 bg-surface/70 px-5 py-4"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="font-medium text-ink">{row.company}</p>
              <p className="site-meta">{row.chance}</p>
            </div>
            <p className="mt-1 text-[15px] text-ink-muted">{row.who}</p>
            <p className="mt-2 text-[15px] text-ink">{row.hook}</p>
            <a
              href={row.href}
              className="mt-3 inline-block text-[15px] text-signal underline decoration-signal/40 underline-offset-4 hover:decoration-signal"
            >
              {row.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Rules() {
  return (
    <div className="mt-8">
      <h2 className="font-display text-[22px] font-semibold text-ink">
        What goes on every form
      </h2>
      <dl className="mt-6 divide-y divide-line border-y border-line">
        {formRules.map(([label, value]) => (
          <div
            key={label}
            className="grid gap-1 py-3 sm:grid-cols-[10rem_minmax(0,1fr)]"
          >
            <dt className="text-[14px] text-ink-muted">{label}</dt>
            <dd className="text-[15px] text-ink">{value}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-6 rounded-[1.25rem] border border-coral/30 bg-coral/5 px-5 py-4 text-[15px] leading-snug text-ink">
        Never invent RxSwift, Core Data, Realm, Firebase, Instruments writeups, a
        Core ML export pipeline, or visa/work-auth you do not have.
      </p>
    </div>
  );
}
