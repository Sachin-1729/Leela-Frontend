import { useState } from "react";
import { toast } from "react-toastify";
import { createCommunityRequest } from "../../api/community";

const initialFormData = {
  name: "",
  mobile: "",
  city: "",
};

const inputClass =
  "w-full rounded-xl border border-[#b69acb]/25 bg-[#241331] px-4 py-3.5 text-white outline-none placeholder:text-[#a995ba] focus:border-[#f2cc72]";

/** Name / mobile / city form that saves a join request for one community. */
export default function CommunityJoinForm({ community, onSuccess }) {
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    const registration = {
      community: community.name,
      name: formData.name.trim(),
      mobile: formData.mobile,
      city: formData.city.trim(),
    };

    setIsSubmitting(true);
    try {
      await createCommunityRequest({
        name: registration.name,
        phone: registration.mobile,
        community: registration.community,
        city: registration.city,
      });

      setFormData(initialFormData);
      onSuccess(registration);
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

  return (
    <>
      <div className="mb-7 text-center">
        <div className="mb-4 text-5xl">{community.icon}</div>

        <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#f2cc72]">
          Join the Leela Community
        </p>

        <h2 className="text-3xl font-extrabold">Join {community.name}</h2>

        <p className="mt-3 leading-7 text-[#c7b6d5]">
          Tell us a little about yourself to get started.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="community-name" className="mb-2 block text-sm font-semibold">
            Full Name
          </label>

          <input
            id="community-name"
            type="text"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            required
            autoComplete="name"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="community-mobile" className="mb-2 block text-sm font-semibold">
            Mobile Number
          </label>

          <input
            id="community-mobile"
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
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="community-city" className="mb-2 block text-sm font-semibold">
            City
          </label>

          <input
            id="community-city"
            type="text"
            placeholder="Enter your city"
            value={formData.city}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, city: e.target.value }))
            }
            required
            autoComplete="address-level2"
            className={inputClass}
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
    </>
  );
}
