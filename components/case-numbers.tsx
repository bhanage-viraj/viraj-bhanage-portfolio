import type { ProjectNumbers } from "@/lib/types";

export function CaseNumbers({ numbers }: { numbers: ProjectNumbers }) {
  return (
    <section className="mt-14">
      <h2 className="font-display text-[22px] font-semibold text-ink">
        {numbers.heading}
      </h2>

      <dl className="mt-6 grid gap-5 sm:grid-cols-2">
        {numbers.facts.map((fact) => (
          <div key={fact.label} className="border-t border-line/80 pt-3">
            <dt className="site-meta">{fact.label}</dt>
            <dd className="mt-2 text-[15px] leading-[1.65] text-ink">{fact.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-10 overflow-x-auto">
        <table className="w-full min-w-[36rem] border-collapse text-left">
          <caption className="sr-only">
            Three experiments, in order of how close they get to real field audio
          </caption>
          <thead>
            <tr className="border-b border-line">
              <th scope="col" className="site-meta py-3 pr-4 font-normal">
                Setup
              </th>
              <th scope="col" className="site-meta py-3 pr-4 font-normal">
                ReefSet held-out recall
              </th>
              <th scope="col" className="site-meta py-3 pr-4 font-normal">
                Confuses real reef sounds?
              </th>
              <th scope="col" className="site-meta py-3 font-normal">
                Unseen field recordings
              </th>
            </tr>
          </thead>
          <tbody>
            {numbers.experiments.map((row) => (
              <tr key={row.setup} className="border-b border-line/80 align-top">
                <th
                  scope="row"
                  className="py-3.5 pr-4 text-[15px] font-medium leading-snug text-ink"
                >
                  {row.setup}
                </th>
                <td className="py-3.5 pr-4 font-mono text-[13px] leading-snug tracking-normal text-ink">
                  {row.recall}
                </td>
                <td className="py-3.5 pr-4 font-mono text-[13px] leading-snug tracking-normal text-ink">
                  {row.fpr}
                </td>
                <td className="py-3.5 font-mono text-[13px] leading-snug tracking-normal text-ink">
                  {row.field}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-8 max-w-study text-body text-ink">{numbers.takeaway}</p>
    </section>
  );
}
