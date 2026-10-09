
import { useState } from "react";
import { toast } from "react-toastify";
import { createCommunityRequest } from "../api/community";

const communities = [
  {
    id: 1,
    name: "Yoga",
    icon: "🧘",
    description:
      "Find your balance, build strength, and reconnect with yourself through mindful movement and breath.",
    members: "Mind & Body",
    category: "Wellness",
  },
  {
    id: 2,
    name: "Dance",
    icon: "💃",
    description:
      "Express yourself through movement, discover new styles, and share the joy of dance with others.",
    members: "Move & Express",
    category: "Performing Arts",
  },
  {
    id: 3,
    name: "Music",
    icon: "🎵",
    description:
      "Connect through melodies, explore your musical interests, and create beautiful moments together.",
    members: "Listen & Create",
    category: "Performing Arts",
  },
  {
    id: 4,
    name: "Fine Arts",
    icon: "🎨",
    description:
      "Explore painting, drawing, and creative expression in a community that celebrates imagination.",
    members: "Imagine & Create",
    category: "Visual Arts",
  },
];

const initialFormData = {
  name: "",
  mobile: "",
  city: "",
};

export default function CommunityList() {

  const [communityToJoin, setCommunityToJoin] = useState(null);
  const [formData, setFormData] = useState(initialFormData);
  const [registration, setRegistration] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!communityToJoin || isSubmitting) return;

    const newRegistration = {
      community: communityToJoin.name,
      name: formData.name.trim(),
      mobile: formData.mobile,
      city: formData.city.trim(),
    };

    setIsSubmitting(true);
    try {
      await createCommunityRequest({
        name: newRegistration.name,
        phone: newRegistration.mobile,
        community: newRegistration.community,
        city: newRegistration.city,
      });

      setRegistration(newRegistration);
      setFormData(initialFormData);
      setCommunityToJoin(null);
    } catch (error) {
      console.error("Error submitting community request:", error);

      toast.error(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <section
            className="mx-auto max-w-xl rounded-[24px] border border-[#b69acb]/15 bg-[#2c1a3b]/85 p-6 text-center shadow-2xl sm:p-10"
            role="status"
          >
            <div className="mb-5 text-6xl">🎉</div>

            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#f2cc72]">
              Registration Received
            </p>

            <h1 className="text-3xl font-extrabold">
              Welcome, {registration.name}!
            </h1>

            <p className="mt-4 leading-7 text-[#c7b6d5]">
              Thank you for joining our {registration.community} community.
              We're excited to have you as part of Leela!
            </p>

            <div className="mt-7 rounded-xl border border-[#b69acb]/15 bg-[#241331]/70 p-5 text-left">
              <p className="mb-3 font-bold text-[#f2cc72]">
                Registration Details
              </p>
              <p className="mb-2">
                <span className="text-[#bba9ca]">Name:</span>{" "}
                {registration.name}
              </p>
              <p className="mb-2">
                <span className="text-[#bba9ca]">Community:</span>{" "}
                {registration.community}
              </p>
              <p className="mb-2">
                <span className="text-[#bba9ca]">Mobile:</span>{" "}
                {registration.mobile}
              </p>
              <p>
                <span className="text-[#bba9ca]">City:</span>{" "}
                {registration.city}
              </p>
            </div>

            <button
              type="button"
              onClick={handleBackToCommunities}
              className="mt-7 w-full rounded-xl bg-[#f2cc72] px-6 py-4 font-extrabold text-[#261431] transition hover:bg-[#ffda87]"
            >
              Explore More Communities →
            </button>
          </section>
        ) : communityToJoin ? (
          /* Registration form */
          <section className="mx-auto max-w-xl rounded-[24px] border border-[#b69acb]/15 bg-[#2c1a3b]/85 p-6 shadow-2xl sm:p-10">
            <div className="mb-7 text-center">
              <div className="mb-4 text-5xl">
                {communityToJoin.icon}
              </div>

              <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#f2cc72]">
                Join the Leela Community
              </p>

              <h1 className="text-3xl font-extrabold">
                Join {communityToJoin.name}
              </h1>

              <p className="mt-3 leading-7 text-[#c7b6d5]">
                Tell us a little about yourself to get started.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold"
                >
                  Full Name
                </label>

                <input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  required
                  autoComplete="name"
                  className="w-full rounded-xl border border-[#b69acb]/25 bg-[#241331] px-4 py-3.5 text-white outline-none placeholder:text-[#a995ba] focus:border-[#f2cc72]"
                />
              </div>

              <div>
                <label
                  htmlFor="mobile"
                  className="mb-2 block text-sm font-semibold"
                >
                  Mobile Number
                </label>

                <input
                  id="mobile"
                  type="tel"
                  placeholder="Enter your mobile number"
                  value={formData.mobile}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      mobile: e.target.value.replace(/\D/g, "").slice(0, 10),
                    }))
                  }
                  required
                  autoComplete="tel"
                  inputMode="numeric"
                  pattern="[0-9]{10}"
                  title="Enter a 10-digit mobile number"
                  className="w-full rounded-xl border border-[#b69acb]/25 bg-[#241331] px-4 py-3.5 text-white outline-none placeholder:text-[#a995ba] focus:border-[#f2cc72]"
                />
              </div>

              <div>
                <label
                  htmlFor="city"
                  className="mb-2 block text-sm font-semibold"
                >
                  City
                </label>

                <input
                  id="city"
                  type="text"
                  placeholder="Enter your city"
                  value={formData.city}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      city: e.target.value,
                    }))
                  }
                  required
                  autoComplete="address-level2"
                  className="w-full rounded-xl border border-[#b69acb]/25 bg-[#241331] px-4 py-3.5 text-white outline-none placeholder:text-[#a995ba] focus:border-[#f2cc72]"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-3 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#f2cc72] px-6 py-4 font-extrabold text-[#261431] transition hover:bg-[#ffda87] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f2cc72] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Submitting..." : "Submit Registration →"}
              </button>
            </form>
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
                            onClick={() => {
                              setFormData(initialFormData);
                              setCommunityToJoin(community);
                            }}
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