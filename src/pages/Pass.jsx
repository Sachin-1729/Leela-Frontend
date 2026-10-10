import { UpcomingEvents } from "../components/landing";

export default function Pass() {
  return (
    <main className="min-h-screen">
      <div className="mx-auto w-full max-w-arena px-8 pt-12">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="rounded-xl border border-[#b69acb]/25 px-6 py-3 font-bold transition hover:bg-[#49304f]"
        >
          ← Back
        </button>
      </div>

      <UpcomingEvents />
    </main>
  );
}
