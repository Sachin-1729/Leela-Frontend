import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createEvent } from "../api/event";

export default function AddEvent() {
  const navigate = useNavigate();

  const [date, setDate] = useState("");
  const [eventName, setEventName] = useState("");
  const [clientName, setClientName] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");

  const [errors, setErrors] = useState({});

  const handleSubmit = async(e) => {
    e.preventDefault();

    const newErrors = {};

    if (!date) {
      newErrors.date = "Date is required";
    }

    if (!eventName.trim()) {
      newErrors.eventName = "Event name is required";
    }

    if (!clientName.trim()) {
      newErrors.clientName = "Client name is required";
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
      date,
      eventName: eventName.trim(),
      owner_name: clientName.trim(),
      whatsapp_number: whatsappNumber,
    };



      
  const response = await createEvent(data);

   navigate("/events");
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
            Add Event
          </h1>

          <p className="mt-2 text-[15px] text-[#bca8c9]">
            Add a new event to your system.
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
            Event Information
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Date */}
            <div>
              <label className="mb-2 block text-[15px] font-bold text-[#fff8ee]">
                Date
              </label>

              <input
                type="date"
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                  setErrors((prev) => ({
                    ...prev,
                    date: "",
                  }));
                }}
                className="w-full rounded-[13px] border border-[#bca8c9]/20 bg-[#2b1835] px-4 py-3.5 text-[15px] font-medium text-[#fff8ee] outline-none transition focus:border-[#f4c95d] focus:ring-2 focus:ring-[#f4c95d]/20"
              />

              {errors.date && (
                <p className="mt-2 text-[13px] font-semibold text-[#ff9cae]">
                  {errors.date}
                </p>
              )}
            </div>

            {/* Event Name */}
            <div>
              <label className="mb-2 block text-[15px] font-bold text-[#fff8ee]">
                Event Name
              </label>

              <input
                type="text"
                value={eventName}
                onChange={(e) => {
                  setEventName(e.target.value);
                  setErrors((prev) => ({
                    ...prev,
                    eventName: "",
                  }));
                }}
                placeholder="Enter event name"
                className="w-full rounded-[13px] border border-[#bca8c9]/20 bg-[#2b1835] px-4 py-3.5 text-[15px] font-medium text-[#fff8ee] outline-none transition placeholder:text-[#8f7b9c] focus:border-[#f4c95d] focus:ring-2 focus:ring-[#f4c95d]/20"
              />

              {errors.eventName && (
                <p className="mt-2 text-[13px] font-semibold text-[#ff9cae]">
                  {errors.eventName}
                </p>
              )}
            </div>

            {/* Client Name */}
            <div>
              <label className="mb-2 block text-[15px] font-bold text-[#fff8ee]">
                Client Name
              </label>

              <input
                type="text"
                value={clientName}
                onChange={(e) => {
                  setClientName(e.target.value);
                  setErrors((prev) => ({
                    ...prev,
                    clientName: "",
                  }));
                }}
                placeholder="Enter client name"
                className="w-full rounded-[13px] border border-[#bca8c9]/20 bg-[#2b1835] px-4 py-3.5 text-[15px] font-medium text-[#fff8ee] outline-none transition placeholder:text-[#8f7b9c] focus:border-[#f4c95d] focus:ring-2 focus:ring-[#f4c95d]/20"
              />

              {errors.clientName && (
                <p className="mt-2 text-[13px] font-semibold text-[#ff9cae]">
                  {errors.clientName}
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

            {/* Buttons */}
            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={() => navigate("/events")}
                className="rounded-[13px] border border-[#bca8c9]/20 px-5 py-3 text-[15px] font-bold text-[#d5c5dc] transition hover:bg-[#ffffff]/5"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="rounded-[13px] bg-[#f4c95d] px-6 py-3 text-[15px] font-bold text-[#24132f] transition hover:bg-[#e8bb4d]"
              >
                Add Event
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

