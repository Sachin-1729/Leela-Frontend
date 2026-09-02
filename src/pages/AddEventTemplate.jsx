import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createEventTemplate } from "../api/template";

export default function AddEventTemplate() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Template name is required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await createEventTemplate({
        name: name.trim(),
      });

      navigate("/event-templates");
    } catch (error) {
      console.error(error);

      if (error.response?.status === 409) {
        setError("Event template already exists");
      } else {
        setError("Failed to create event template");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen px-6 py-10"
      style={{
        fontFamily: '"Nunito Sans", "Inter", sans-serif',
        background:
          "linear-gradient(135deg, #24132f 0%, #3a1f47 50%, #1f1229 100%)",
      }}
    >
      <div className="mx-auto max-w-3xl">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-[36px] font-extrabold leading-[1.15] text-[#fff8ee]">
            Add Event Template
          </h1>

          <p className="mt-2 text-[15px] text-[#bca8c9]">
            Create a new template for your events.
          </p>
        </div>

        {/* Card */}
        <div
          className="rounded-[22px] border p-8 shadow-xl"
          style={{
            background: "rgba(55, 31, 68, 0.85)",
            borderColor: "rgba(190, 160, 210, 0.18)",
            boxShadow: "0 15px 40px rgba(20, 8, 28, 0.25)",
          }}
        >
          <h2 className="mb-7 text-[24px] font-extrabold text-[#fff8ee]">
            Template Information
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Template Name */}
            <div>
              <label className="mb-2 block text-[15px] font-bold text-[#fff8ee]">
                Template Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError("");
                }}
                placeholder="Enter template name"
                className="w-full rounded-[13px] border border-[#bca8c9]/20 bg-[#2b1835] px-4 py-3.5 text-[15px] font-medium text-[#fff8ee] outline-none transition placeholder:text-[#8f7b9c] focus:border-[#f4c95d] focus:ring-2 focus:ring-[#f4c95d]/20"
              />

              {error && (
                <p className="mt-2 text-[13px] font-semibold text-[#ff9cae]">
                  {error}
                </p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={() => navigate("/event-templates")}
                className="rounded-[13px] border border-[#bca8c9]/20 px-5 py-3 text-[15px] font-bold text-[#d5c5dc] transition hover:bg-[#ffffff]/5"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="rounded-[13px] bg-[#f4c95d] px-6 py-3 text-[15px] font-bold text-[#24132f] transition hover:bg-[#e8bb4d] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Creating..." : "Create Template"}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}