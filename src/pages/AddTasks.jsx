
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTasks } from "../api/task";
import { getAllCategory } from "../api/category";
import { getAllStaff } from "../api/staff";

export default function AddTask() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [staffId, setStaffId] = useState("");

  const [categories, setCategories] = useState([]);
  const [staffs, setStaffs] = useState([]);

  const [errors, setErrors] = useState({});

  // Get categories and staffs
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoryResponse, staffResponse] = await Promise.all([
          getAllCategory(),
          getAllStaff(),
        ]);

        setCategories(categoryResponse.data.data);
        setStaffs(staffResponse.data.data);
      } catch (error) {
        console.error("Error fetching categories/staffs:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!categoryId) {
      newErrors.categoryId = "Category is required";
    }

    if (!staffId) {
      newErrors.staffId = "Staff is required";
    }

    if (!title.trim()) {
      newErrors.title = "Task title is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const data = {
      categoryId: Number(categoryId),
      staffId: Number(staffId),
      title: title.trim(),
    };

    try {
      await createTasks(data);

      navigate("/tasks");
    } catch (error) {
      console.error("Error creating task:", error);
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
            Add Task
          </h1>

          <p className="mt-2 text-[15px] text-[#bca8c9]">
            Add a new task to your system.
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
            Task Information
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Category */}
            <div>
              <label className="mb-2 block text-[15px] font-bold text-[#fff8ee]">
                Category
              </label>

              <select
                value={categoryId}
                onChange={(e) => {
                  setCategoryId(e.target.value);

                  setErrors((prev) => ({
                    ...prev,
                    categoryId: "",
                  }));
                }}
                className="w-full rounded-[13px] border border-[#bca8c9]/20 bg-[#2b1835] px-4 py-3.5 text-[15px] font-medium text-[#fff8ee] outline-none transition focus:border-[#f4c95d] focus:ring-2 focus:ring-[#f4c95d]/20"
              >
                <option value="">Select Category</option>

                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                   {category.id} {category.name}
                  </option>
                ))}
              </select>

              {errors.categoryId && (
                <p className="mt-2 text-[13px] font-semibold text-[#ff9cae]">
                  {errors.categoryId}
                </p>
              )}
            </div>

            {/* Staff */}
            <div>
              <label className="mb-2 block text-[15px] font-bold text-[#fff8ee]">
                Staff
              </label>

              <select
                value={staffId}
                onChange={(e) => {
                  setStaffId(e.target.value);

                  setErrors((prev) => ({
                    ...prev,
                    staffId: "",
                  }));
                }}
                className="w-full rounded-[13px] border border-[#bca8c9]/20 bg-[#2b1835] px-4 py-3.5 text-[15px] font-medium text-[#fff8ee] outline-none transition focus:border-[#f4c95d] focus:ring-2 focus:ring-[#f4c95d]/20"
              >
                <option value="">Select Staff</option>

                {staffs.map((staff) => (
                  <option key={staff.id} value={staff.id}>
                  {staff.whatsappNumber}  {staff.name}
                  </option>
                ))}
              </select>

              {errors.staffId && (
                <p className="mt-2 text-[13px] font-semibold text-[#ff9cae]">
                  {errors.staffId}
                </p>
              )}
            </div>

            {/* Task Title */}
            <div>
              <label className="mb-2 block text-[15px] font-bold text-[#fff8ee]">
                Task Title
              </label>

              <input
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);

                  setErrors((prev) => ({
                    ...prev,
                    title: "",
                  }));
                }}
                placeholder="Enter task title"
                className="w-full rounded-[13px] border border-[#bca8c9]/20 bg-[#2b1835] px-4 py-3.5 text-[15px] font-medium text-[#fff8ee] outline-none transition placeholder:text-[#8f7b9c] focus:border-[#f4c95d] focus:ring-2 focus:ring-[#f4c95d]/20"
              />

              {errors.title && (
                <p className="mt-2 text-[13px] font-semibold text-[#ff9cae]">
                  {errors.title}
                </p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={() => navigate("/tasks")}
                className="rounded-[13px] border border-[#bca8c9]/20 px-5 py-3 text-[15px] font-bold text-[#d5c5dc] transition hover:bg-[#ffffff]/5"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="rounded-[13px] bg-[#f4c95d] px-6 py-3 text-[15px] font-bold text-[#24132f] transition hover:bg-[#e8bb4d]"
              >
                Add Task
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

