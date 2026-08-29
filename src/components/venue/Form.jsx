import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createLead } from "../../api/lead";
import { toast } from "react-toastify";

export default function UserForm() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  const handlePhoneChange = (e) => {
    const digitsOnly = e.target.value.replace(/\D/g, "").slice(0, 10);
    setPhone(digitsOnly);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (phone.length !== 10) {
      alert("Phone number must be exactly 10 digits.");
      return;
    }

    const data = {
      name,
      phone,
      date,
    };

    try {
    const response = await createLead(data);

    if(response.data)
    {
      toast.success("Lead created successfully! Team will contact you soon!");
    }
    setName("");
    setPhone("");
    setDate("");

  
  } catch (error) {
    console.error("Error creating lead:", error);

     toast.error("Something went wrong. Please try again.");
  }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#21102f] via-[#321546] to-[#1b0d29] px-4 py-12 flex items-center justify-center font-['Nunito_Sans']">
      <div
        className="
          w-full max-w-md
          rounded-[24px]
          border border-[#a78bc633]
          bg-[#3a1d4d]/90
          p-7 sm:p-8
          shadow-[0_20px_60px_rgba(20,5,30,0.25)]
        "
      >
        {/* Back Button */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="
            mb-6
            inline-flex items-center gap-2
            rounded-xl
            border border-white/10
            bg-white/[0.03]
            px-4 py-2.5
            text-[14px] font-semibold
            text-[#c9b7d8]
            shadow-sm
            backdrop-blur-sm
            transition-all duration-200
            hover:-translate-x-0.5
            hover:border-white/20
            hover:bg-white/[0.08]
            hover:text-[#fff9ed]
            hover:shadow-lg
            active:scale-[0.98]
          "
        >
          <span className="text-[18px] leading-none">←</span>
          <span>Back</span>
        </button>

        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-[28px] sm:text-[32px] leading-[1.15] font-extrabold text-[#fff9ed]">
            Get Started
          </h1>

          <p className="mt-2 text-[14px] sm:text-[15px] text-[#c9b7d8]">
            Please provide your details below.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-[14px] font-bold text-[#fff9ed]"
            >
              Full Name
            </label>

            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              required
              className="
                h-12 w-full rounded-[13px]
                border border-[#a78bc64d]
                bg-[#291437]
                px-4 text-[15px] font-medium
                text-[#fff9ed]
                placeholder:text-[#a996b8]
                outline-none transition-all
                focus:border-[#f4c84a]
                focus:ring-2 focus:ring-[#f4c84a]/20
              "
            />
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="phone"
              className="mb-2 block text-[14px] font-bold text-[#fff9ed]"
            >
              Phone Number
            </label>

            <input
              id="phone"
              type="tel"
              inputMode="numeric"
              pattern="[0-9]{10}"
              maxLength={10}
              value={phone}
              onChange={handlePhoneChange}
              placeholder="9876543210"
              required
              className="
                h-12 w-full rounded-[13px]
                border border-[#a78bc64d]
                bg-[#291437]
                px-4 text-[15px] font-medium
                text-[#fff9ed]
                placeholder:text-[#a996b8]
                outline-none transition-all
                focus:border-[#f4c84a]
                focus:ring-2 focus:ring-[#f4c84a]/20
              "
            />
          </div>

          {/* Date */}
          <div>
            <label
              htmlFor="date"
              className="mb-2 block text-[14px] font-bold text-[#fff9ed]"
            >
              Date
            </label>

            <input
              id="date"
              type="date"
              min={minDate}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="
                h-12 w-full rounded-[13px]
                border border-[#a78bc64d]
                bg-[#291437]
                px-4 text-[15px] font-medium
                text-[#fff9ed]
                outline-none transition-all
                focus:border-[#f4c84a]
                focus:ring-2 focus:ring-[#f4c84a]/20
                [color-scheme:dark]
              "
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="
              mt-3 h-12 w-full rounded-[13px]
              bg-[#f4c84a]
              px-5 text-[15px] font-bold
              text-[#24132f]
              transition-all
              hover:bg-[#ffd45f]
              hover:-translate-y-[1px]
              active:translate-y-0
              focus:outline-none
              focus:ring-2
              focus:ring-[#f4c84a]/40
            "
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}