export default function Pass() {
  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,_#39204f_0%,_#241331_48%,_#180d21_100%)] px-4 py-12 text-[#fff8ed] sm:px-6 lg:py-20">
      <div className="mx-auto max-w-xl">
        <div className="mb-8">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="rounded-xl border border-[#b69acb]/25 px-6 py-3 font-bold transition hover:bg-[#49304f]"
          >
            ← Back
          </button>
        </div>

        <section className="rounded-[24px] border border-[#b69acb]/15 bg-[#2c1a3b]/85 p-6 text-center shadow-2xl sm:p-10">
          <div className="mb-5 text-6xl" aria-hidden="true">
            🎟️
          </div>

          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#f2cc72]">
            Buy a Pass
          </p>

          <h1 className="text-3xl font-extrabold">
            No upcoming public events
          </h1>

          <p className="mt-4 leading-7 text-[#c7b6d5]">
            There are no public events open for passes right now. Please
            check back soon for new events at Leela.
          </p>
        </section>
      </div>
    </main>
  );
}
