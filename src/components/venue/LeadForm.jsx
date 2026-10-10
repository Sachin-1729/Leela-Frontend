import { useState } from "react";
import { createLead } from "../../api/lead";
import { toast } from "react-toastify";

/** Venue booking enquiry form — saves a lead. `onSuccess` runs after it is created. */
export default function LeadForm({ onSuccess }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [event, setEvent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  const handlePhoneChange = (e) => {
    const digitsOnly = e.target.value.replace(/\D/g, "").slice(0, 10);
    setPhone(digitsOnly);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (isSubmitting) return;

    if (phone.length !== 10) {
      alert("Phone number must be exactly 10 digits.");
      return;
    }

    const data = {
      name,
      phone,
      date,
      event: event.trim(),
    };

    setIsSubmitting(true);
    try {
    const response = await createLead(data);

    if(response.data)
    {
      toast.success("Lead created successfully! Team will contact you soon!");
      onSuccess?.();
    }
    setName("");
    setPhone("");
    setDate("");
    setEvent("");

  
  } catch (error) {
    console.error("Error creating lead:", error);

     toast.error("Something went wrong. Please try again.");
  } finally {
    setIsSubmitting(false);
  }
  };

  return (
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

      {/* Event */}
      <div>
        <label
          htmlFor="event"
          className="mb-2 block text-[14px] font-bold text-[#fff9ed]"
        >
          Event
        </label>

        <input
          id="event"
          type="text"
          value={event}
          onChange={(e) => setEvent(e.target.value)}
          placeholder="e.g. Wedding, Birthday Party"
          maxLength={100}
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
        disabled={isSubmitting}
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
          disabled:cursor-not-allowed
          disabled:opacity-60
          disabled:hover:bg-[#f4c84a]
          disabled:hover:translate-y-0
        "
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
