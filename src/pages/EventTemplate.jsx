import Table from "../components/Table";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getEventTemplates } from "../api/template";

export default function EventTemplate() {
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  const columns = [
    {
      key: "id",
      label: "Id",
    },
    {
      key: "name",
      label: "Template Name",
    },
  ];

  async function getTemplateData() {
    try {
      const response = await getEventTemplates();

      setData(response.data.data);
    } catch (error) {
      console.error("Failed to fetch event templates:", error);
    }
  }

  useEffect(() => {
    getTemplateData();
  }, []);

  function handleView(id) {
    navigate(`/template/${id}`);
  }

  return (
    <div
      className="min-h-screen px-6 py-8"
      style={{
        fontFamily: '"Nunito Sans", "Inter", sans-serif',
        background:
          "linear-gradient(135deg, #24132f 0%, #3a1f47 50%, #1f1229 100%)",
      }}
    >
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-[36px] font-extrabold leading-[1.15] text-[#fffaf0]">
              Event Templates
            </h1>

            <p className="mt-2 text-[15px] text-[#b9a8c7]">
              Manage your event templates
            </p>
          </div>

          <button
            onClick={() => navigate("/template/add")}
            className="rounded-lg bg-purple-600 px-5 py-3 font-semibold text-white transition hover:bg-purple-700"
          >
            + Add Template
          </button>
        </div>

        {/* Table */}
        <Table
          onView={handleView}
          columns={columns}
          data={data}
        />
      </div>
    </div>
  );
}