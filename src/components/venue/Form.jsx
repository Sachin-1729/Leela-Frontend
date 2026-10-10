import { useNavigate } from "react-router-dom";
import LeadForm from "./LeadForm";

export default function UserForm() {
  const navigate = useNavigate();

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

        <LeadForm />
      </div>
    </div>
  );
}