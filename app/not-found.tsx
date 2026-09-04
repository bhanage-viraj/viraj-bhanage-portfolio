import { BackButton } from "@/components/back-button";
import { PageCol } from "@/lib/rich-text";

export default function NotFound() {
  return (
    <main id="main" className="py-24">
      <PageCol>
        <h1 className="font-display text-section font-semibold text-ink">Not found</h1>
        <div className="mt-6">
          <BackButton />
        </div>
      </PageCol>
    </main>
  );
}
