
import { useState } from "react";
import { communities } from "../data/communities";
import CommunityJoinForm from "../components/community/CommunityJoinForm";
import CommunityJoinSuccess from "../components/community/CommunityJoinSuccess";

export default function CommunityList() {
  const [communityToJoin, setCommunityToJoin] = useState(null);
  const [registration, setRegistration] = useState(null);

  const handleBackToCommunities = () => {
    setCommunityToJoin(null);
    setRegistration(null);
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,_#39204f_0%,_#241331_48%,_#180d21_100%)] px-4 py-12 text-[#fff8ed] sm:px-6 lg:py-20">
      <div className="mx-auto max-w-6xl">
        {/* Back button */}
        <div className="mb-8">
          <button
            type="button"
            onClick={() => {
              if (communityToJoin || registration) {
                handleBackToCommunities();
              } else {
                window.history.back();
              }
            }}
            className="rounded-xl border border-[#b69acb]/25 px-6 py-3 font-bold transition hover:bg-[#49304f]"
          >
            ← Back
          </button>
        </div>

        {/* Registration success message */}
        {registration ? (
          <section className="mx-auto max-w-xl rounded-[24px] border border-[#b69acb]/15 bg-[#2c1a3b]/85 p-6 shadow-2xl sm:p-10">
            <CommunityJoinSuccess
              registration={registration}
              onDone={handleBackToCommunities}
              doneLabel="Explore More Communities →"
            />
          </section>
        ) : communityToJoin ? (
          /* Registration form */
          <section className="mx-auto max-w-xl rounded-[24px] border border-[#b69acb]/15 bg-[#2c1a3b]/85 p-6 shadow-2xl sm:p-10">
            <CommunityJoinForm
              community={communityToJoin}
              onSuccess={(newRegistration) => {
                setRegistration(newRegistration);
                setCommunityToJoin(null);
              }}
            />
          </section>
        ) : (
          /* Community selection page */
          <>
            <header className="mb-10 text-center sm:mb-14">
              <span className="mb-4 inline-flex rounded-full border border-[#e8bd55]/25 bg-[#e8bd55]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#f2cc72]">
                Find your people
              </span>

              <h1 className="text-3xl font-extrabold leading-[1.15] tracking-tight sm:text-4xl lg:text-[40px]">
                Discover Your{" "}
                <span className="text-[#f2cc72]">
                  Community
                </span>
              </h1>

              <p className="mx-auto mt-5 max-w-2xl text-base leading-8 tracking-wide text-[#c7b6d5] sm:text-lg">
                Find your passion, meet like-minded people, and become part
                of something meaningful at Leela.
              </p>
            </header>

            <section className="rounded-[24px] border border-[#b69acb]/15 bg-[#2c1a3b]/85 p-5 shadow-[0_20px_60px_rgba(12,5,20,0.22)] backdrop-blur sm:p-8 lg:p-10">
              <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="text-2xl font-extrabold leading-tight sm:text-[28px]">
                    Explore communities
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-[#bba9ca] sm:text-base">
                    Choose a community you would love to join.
                  </p>
                </div>

         
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:gap-6">
                {communities.map((community) => {
                

                  return (
                    <article
                      key={community.id}
                      className="group flex flex-col rounded-[20px] border border-[#b69acb]/15 bg-[#352242]/65 p-6 transition duration-200 hover:border-[#b69acb]/35 hover:bg-[#3b2749] sm:p-7"
                    >
                      <div className="mb-5 flex items-start justify-between">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#e8bd55]/20 bg-[#e8bd55]/10 text-3xl">
                          <span aria-hidden="true">
                            {community.icon}
                          </span>
                        </div>

                        <span className="rounded-full border border-[#b69acb]/20 bg-[#241331]/50 px-3 py-1.5 text-xs font-semibold text-[#c7b6d5]">
                          {community.category}
                        </span>
                      </div>

                      <h3 className="text-xl font-extrabold leading-tight sm:text-2xl">
                        {community.name}
                      </h3>

                      <p className="mt-3 flex-1 text-[15px] leading-7 tracking-wide text-[#c7b6d5]">
                        {community.description}
                      </p>

                      <div className="mt-6 flex items-center justify-between gap-3 border-t border-[#b69acb]/15 pt-5">
                        <span className="text-xs font-semibold tracking-wide text-[#bba9ca]">
                          {community.members}
                        </span>

                        <div className="flex items-center gap-2">
                      

                          <button
                            type="button"
                            onClick={() => setCommunityToJoin(community)}
                            className="rounded-xl border border-[#e8bd55]/35 px-4 py-3 text-sm font-bold text-[#f2cc72] transition hover:bg-[#e8bd55]/10"
                          >
                            JOIN
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>

            </section>
          </>
        )}

        <p className="mt-7 text-center text-sm leading-6 text-[#a995ba]">
          Come as you are. Find what inspires you. Grow together.
        </p>
      </div>
    </main>
  );
}