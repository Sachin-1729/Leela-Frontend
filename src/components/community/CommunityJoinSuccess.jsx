/** Confirmation shown after a community join request is saved. */
export default function CommunityJoinSuccess({ registration, onDone, doneLabel }) {
  return (
    <div className="text-center" role="status">
      <div className="mb-5 text-6xl">🎉</div>

      <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#f2cc72]">
        Registration Received
      </p>

      <h2 className="text-3xl font-extrabold">Welcome, {registration.name}!</h2>

      <p className="mt-4 leading-7 text-[#c7b6d5]">
        Thank you for joining our {registration.community} community.
        We're excited to have you as part of Leela!
      </p>

      <div className="mt-7 rounded-xl border border-[#b69acb]/15 bg-[#241331]/70 p-5 text-left">
        <p className="mb-3 font-bold text-[#f2cc72]">Registration Details</p>
        <p className="mb-2">
          <span className="text-[#bba9ca]">Name:</span> {registration.name}
        </p>
        <p className="mb-2">
          <span className="text-[#bba9ca]">Community:</span>{" "}
          {registration.community}
        </p>
        <p className="mb-2">
          <span className="text-[#bba9ca]">Mobile:</span> {registration.mobile}
        </p>
        <p>
          <span className="text-[#bba9ca]">City:</span> {registration.city}
        </p>
      </div>

      <button
        type="button"
        onClick={onDone}
        className="mt-7 w-full rounded-xl bg-[#f2cc72] px-6 py-4 font-extrabold text-[#261431] transition hover:bg-[#ffda87]"
      >
        {doneLabel}
      </button>
    </div>
  );
}
