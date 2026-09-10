import type { ProjectNumbers } from "@/lib/types";

export function CaseNumbers({ numbers }: { numbers: ProjectNumbers }) {
  return (
    <section className="mt-20 border-t border-ink pt-5 sm:mt-28">
      <div className="flex items-baseline justify-between gap-6">
        <p className="eyebrow-signal">Data</p>
        <h2 className="eyebrow">{numbers.heading}</h2>
      </div>

      <dl className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
        {numbers.facts.map((fact) => (
          <div key={fact.label} className="border-t border-line pt-4">
            <dt className="eyebrow">{fact.label}</dt>
            <dd className="mt-3 text-[15px] leading-[1.65] text-ink">{fact.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-14 overflow-x-auto">
        <table className="w-full min-w-[40rem] border-collapse text-left">
          <caption className="sr-only">
            Three experiments, in order of how close they get to real field audio
          </caption>
          <thead>
            <tr className="border-b border-ink">
              <th scope="col" className="eyebrow py-3 pr-6 font-normal">
                Setup
              </th>
              <th scope="col" className="eyebrow py-3 pr-6 font-normal">
                ReefSet held-out recall
              </th>
              <th scope="col" className="eyebrow py-3 pr-6 font-normal">
                Confuses real reef sounds?
              </th>
              <th scope="col" className="eyebrow py-3 font-normal">
                Unseen field recordings
              </th>
            </tr>
          </thead>
          <tbody>
            {numbers.experiments.map((row) => (
              <tr key={row.setup} className="border-b border-line align-top">
                <th
                  scope="row"
                  className="py-4 pr-6 font-display text-[1.25rem] leading-snug tracking-[-0.01em] text-ink"
                >
                  {row.setup}
                </th>
                <td className="py-4 pr-6 font-mono text-[13px] leading-snug text-ink">
                  {row.recall}
                </td>
                <td className="py-4 pr-6 font-mono text-[13px] leading-snug text-ink">
                  {row.fpr}
                </td>
                <td className="py-4 font-mono text-[13px] leading-snug text-ink">{row.field}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-12 max-w-study text-[17px] leading-[1.7] text-ink">{numbers.takeaway}</p>
    </section>
  );
}
