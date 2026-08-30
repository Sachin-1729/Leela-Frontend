import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getEvents } from "../api/event";
// import { createCategory } from "../api/category";

export default function AddCategory() {
  const navigate = useNavigate();

  const [eventId, setEventId] = useState("");
  const [name, setName] = useState("");

  const [events, setEvents] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await getEvents(1);
        setEvents(response.data.data);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    }

    fetchEvents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!eventId) {
      newErrors.eventId = "Please select an event";
    }

    if (!name.trim()) {
      newErrors.name = "Category name is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      const data = {
        eventId,
        name,
      };

      // await createCategory(data);

      console.log(data);

      navigate("/categories");
    } catch (error) {
      console.error("Failed to create category:", error);
    }
  };

  return (
    <div
      className="min-h-screen px-6 py-8"
      style={{
        fontFamily: '"Nunito Sans", "Inter", sans-serif',
        background:
          "linear-gradient(135deg, #24132f 0%, #3a1f47 50%, #1f1229 100%)",
      }}
    >
      <div className="mx-auto max-w-3xl">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-[36px] font-extrabold leading-[1.15] text-[#fffaf0]">
            Add Category
          </h1>

          <p className="mt-2 text-[15px] text-[#b9a8c7]">
            Create a new category
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-[22px] border border-purple-300/15 bg-[#2d1939]/80 p-6"
        >

          {/* Event */}
          <div className="mb-5">
            <label className="mb-2 block text-sm font-semibold text-[#fffaf0]">
              Event
            </label>

            <select
              value={eventId}
              onChange={(e) => {
                setEventId(e.target.value);
                setErrors((prev) => ({
                  ...prev,
                  eventId: "",
                }));
              }}
              className="w-full rounded-xl border border-purple-300/20 bg-[#24132f] px-4 py-3 text-[#fffaf0] outline-none focus:border-purple-500"
            >
              <option value="">Select Event</option>

              {events.map((event) => (
                <option key={event.id} value={event.id}>
                  {event.eventName}
                </option>
              ))}
            </select>

            {errors.eventId && (
              <p className="mt-1 text-sm text-red-400">
                {errors.eventId}
              </p>
            )}
          </div>

          {/* Category Name */}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-semibold text-[#fffaf0]">
              Category Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setErrors((prev) => ({
                  ...prev,
                  name: "",
                }));
              }}
              placeholder="Enter category name"
              className="w-full rounded-xl border border-purple-300/20 bg-[#24132f] px-4 py-3 text-[#fffaf0] placeholder-[#806d8d] outline-none focus:border-purple-500"
            />

            {errors.name && (
              <p className="mt-1 text-sm text-red-400">
                {errors.name}
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate("/categories")}
              className="rounded-lg bg-[#3a2847] px-5 py-3 font-semibold text-[#b9a8c7] transition hover:bg-[#493356]"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-purple-600 px-5 py-3 font-semibold text-white transition hover:bg-purple-700"
            >
              Add Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}