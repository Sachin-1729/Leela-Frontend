import { useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { createEvent } from "../api/event";
import {getEventTemplates} from "../api/template"
import { getLead } from "../api/lead";

export default function AddEvent() {
  const navigate = useNavigate();

  const [date, setDate] = useState("");
  const [eventName, setEventName] = useState("");
  const [leads, setLeads] = useState([]);
  const [leadId, setLeadId] = useState("");
  const [eventTemplates, setEventTemplates] = useState([]);
  const [eventTemplateId, setEventTemplateId] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async(e) => {

    e.preventDefault();

    if (isSubmitting) return;
 
    const newErrors = {};

    if (!eventName.trim()) {
      newErrors.eventName = "Event name is required";
    }

    const selectedLead = leads.find((lead) => String(lead.id) === leadId);

    if (!selectedLead) {
      newErrors.lead = "Please select a lead";
    } else if (!date) {
      newErrors.date = "Selected lead has no event date";
    }

    if (startTime && endTime && endTime <= startTime) {
      newErrors.endTime = "End time must be greater than start time";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const data = {
      date,
      eventName: eventName.trim(),
      owner_name: selectedLead.name,
      whatsapp_number: selectedLead.phone,
      start:startTime,
      end:endTime
    };

if (eventTemplateId) {
  data.eventTemplateId = Number(eventTemplateId);
}



      
  setIsSubmitting(true);
  try {
  
    await createEvent(data);
    navigate("/events");
  } finally {
    setIsSubmitting(false);
  }
  };

useEffect(() => {
  const fetchEventTemplates = async () => {
    try {
      const response = await getEventTemplates();

      setEventTemplates(response.data.data);
    } catch (error) {
      console.error("Failed to fetch event templates", error);
    }
  };

  fetchEventTemplates();
}, []);

useEffect(() => {
  // /lead is paginated, so keep fetching until next === -1
  const fetchLeads = async () => {
    try {
      const allLeads = [];
      let page = 1;

      while (page !== -1) {
        const response = await getLead(page);
        allLeads.push(...response.data.data);
        page = response.data.next;
      }

      // Events need a WhatsApp number, so skip leads without a phone
      setLeads(allLeads.filter((lead) => lead.phone));
    } catch (error) {
      console.error("Failed to fetch leads", error);
    }
  };

  fetchLeads();
}, []);

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

            {/* Lead */}
            <div>
              <label className="mb-2 block text-[15px] font-bold text-[#fff8ee]">
                Lead
              </label>

              <select
                value={leadId}
                onChange={(e) => {
                  setLeadId(e.target.value);

                  const lead = leads.find(
                    (item) => String(item.id) === e.target.value
                  );

                  // Event date always comes from the selected lead
                  setDate(lead?.date || "");

                  setErrors((prev) => ({
                    ...prev,
                    lead: "",
                    date: "",
                  }));
                }}
                className="w-full rounded-[13px] border border-[#bca8c9]/20 bg-[#2b1835] px-4 py-3.5 text-[15px] font-medium text-[#fff8ee] outline-none transition focus:border-[#f4c95d] focus:ring-2 focus:ring-[#f4c95d]/20"
              >
                <option value="">Select lead</option>

                {leads.map((lead) => (
                  <option key={lead.id} value={lead.id}>
                    {lead.name} - {lead.phone}
                  </option>
                ))}
              </select>

              {errors.lead && (
                <p className="mt-2 text-[13px] font-semibold text-[#ff9cae]">
                  {errors.lead}
                </p>
              )}
            </div>

            {/* Date */}
            <div>
              <label className="mb-2 block text-[15px] font-bold text-[#fff8ee]">
                Date
              </label>

              <input
                type="date"
                value={date}
                readOnly
                tabIndex={-1}
                className="pointer-events-none w-full cursor-not-allowed rounded-[13px] border border-[#bca8c9]/20 bg-[#2b1835]/60 px-4 py-3.5 text-[15px] font-medium text-[#d5c5dc] outline-none"
              />

              <p className="mt-2 text-[13px] text-[#8f7b9c]">
                Filled automatically from the selected lead
              </p>

              {errors.date && (
                <p className="mt-2 text-[13px] font-semibold text-[#ff9cae]">
                  {errors.date}
                </p>
              )}
            </div>
            {/* Start Time */}
                  <div>
                    <label className="mb-2 block text-[15px] font-bold text-[#fff8ee]">
                      Start Time
                    </label>

                    <input
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="w-full rounded-[13px] border border-[#bca8c9]/20 bg-[#2b1835] px-4 py-3.5 text-[15px] font-medium text-[#fff8ee] outline-none transition focus:border-[#f4c95d] focus:ring-2 focus:ring-[#f4c95d]/20"
                    />
                  </div>

                  {/* End Time */}
                  <div>
                    <label className="mb-2 block text-[15px] font-bold text-[#fff8ee]">
                      End Time
                    </label>

                    <input
                      type="time"
                      value={endTime}
                      onChange={(e) => {
                        setEndTime(e.target.value);
                        setErrors((prev) => ({
                          ...prev,
                          endTime: "",
                        }));
                      }}
                      className="w-full rounded-[13px] border border-[#bca8c9]/20 bg-[#2b1835] px-4 py-3.5 text-[15px] font-medium text-[#fff8ee] outline-none transition focus:border-[#f4c95d] focus:ring-2 focus:ring-[#f4c95d]/20"
                    />

                    {errors.endTime && (
                      <p className="mt-2 text-[13px] font-semibold text-[#ff9cae]">
                        {errors.endTime}
                      </p>
                    )}
                  </div>

              <select
              value={eventTemplateId}
              onChange={(e) => setEventTemplateId(e.target.value)}
              className="w-full rounded-[13px] border border-[#bca8c9]/20 bg-[#2b1835] px-4 py-3.5 text-[15px] font-medium text-[#fff8ee] outline-none transition focus:border-[#f4c95d] focus:ring-2 focus:ring-[#f4c95d]/20"
            >
              <option value="">
                Select event template (Optional)
              </option>

              {eventTemplates.map((template) => (
                <option key={template.id} value={template.id}>
                 {template.id} {template.name}
                </option>
              ))}
            </select>

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
                disabled={isSubmitting}
                className="rounded-[13px] bg-[#f4c95d] px-6 py-3 text-[15px] font-bold text-[#24132f] transition hover:bg-[#e8bb4d] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-[#f4c95d]"
              >
                {isSubmitting ? "Adding..." : "Add Event"}
              </button>
            </div>

          </form>

 
        </div>
      </div>
    </div>
  );
}

