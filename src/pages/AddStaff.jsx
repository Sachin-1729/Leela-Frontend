import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createStaff } from "../api/staff";

export default function AddStaff() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");

  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!/^\d{10}$/.test(whatsappNumber)) {
      newErrors.whatsappNumber =
        "WhatsApp number must be exactly 10 digits";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const data = {
      name: name.trim(),
      whatsappNumber,
    };

    try {
      await createStaff(data);

      navigate("/staffs");
    } catch (error) {
      console.error("Failed to create staff:", error);

      // You can later show a backend error here
      setErrors({
        submit: "Failed to add staff. Please try again.",
      });
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
        <div className="mb-8">
          <h1 className="text-[36px] font-extrabold leading-[1.15] text-[#fff8ee]">
            Add Staff
          </h1>

          <p className="mt-2 text-[15px] text-[#bca8c9]">
            Add a new staff member to your team.
          </p>
        </div>

        <div
          className="rounded-[22px] border p-8 shadow-xl"
          style={{
            background: "rgba(55, 31, 68, 0.85)",
            borderColor: "rgba(190, 160, 210, 0.18)",
            boxShadow: "0 15px 40px rgba(20, 8, 28, 0.25)",
          }}
        >
          <h2 className="mb-7 text-[24px] font-extrabold text-[#fff8ee]">
            Staff Information
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="mb-2 block text-[15px] font-bold text-[#fff8ee]">
                Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setErrors((prev) => ({ ...prev, name: "" }));
                }}
                placeholder="Enter staff name"
                className="w-full rounded-[13px] border border-[#bca8c9]/20 bg-[#2b1835] px-4 py-3.5 text-[15px] font-medium text-[#fff8ee] outline-none transition placeholder:text-[#8f7b9c] focus:border-[#f4c95d] focus:ring-2 focus:ring-[#f4c95d]/20"
              />

              {errors.name && (
                <p className="mt-2 text-[13px] font-semibold text-[#ff9cae]">
                  {errors.name}
                </p>
              )}
            </div>

            {/* WhatsApp Number */}
            <div>
              <label className="mb-2 block text-[15px] font-bold text-[#fff8ee]">
                WhatsApp Number
              </label>

              <input
                type="tel"
                value={whatsappNumber}
                onChange={(e) => {
                  const value = e.target.value
                    .replace(/\D/g, "")
                    .slice(0, 10);

                  setWhatsappNumber(value);

                  setErrors((prev) => ({
                    ...prev,
                    whatsappNumber: "",
                  }));
                }}
                placeholder="Enter 10 digit WhatsApp number"
                maxLength={10}
                className="w-full rounded-[13px] border border-[#bca8c9]/20 bg-[#2b1835] px-4 py-3.5 text-[15px] font-medium tracking-wide text-[#fff8ee] outline-none transition placeholder:text-[#8f7b9c] focus:border-[#f4c95d] focus:ring-2 focus:ring-[#f4c95d]/20"
              />

              {errors.whatsappNumber && (
                <p className="mt-2 text-[13px] font-semibold text-[#ff9cae]">
                  {errors.whatsappNumber}
                </p>
              )}
            </div>

            {/* Backend / Submit error */}
            {errors.submit && (
              <p className="text-[13px] font-semibold text-[#ff9cae]">
                {errors.submit}
              </p>
            )}

            {/* Buttons */}
            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={() => navigate("/staffs")}
                className="rounded-[13px] border border-[#bca8c9]/20 px-5 py-3 text-[15px] font-bold text-[#d5c5dc] transition hover:bg-[#ffffff]/5"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="rounded-[13px] bg-[#f4c95d] px-6 py-3 text-[15px] font-bold text-[#24132f] transition hover:bg-[#e8bb4d]"
              >
                Add Staff
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}