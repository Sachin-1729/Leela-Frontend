import Table from "../components/Table";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getStaff } from "../api/staff";

export default function Staffs() {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const totalPages = Math.ceil(total / 10);

  const columns = [
    {
      key: "name",
      label: "Name",
    },
    {
      key: "whatsappNumber",
      label: "Whatsapp Number",
    },
  ];

  async function getLeads(page = 1) {
    const response = await getStaff(page);

    setTotal(response.data.total);
    setData(response.data.data);
  }

  useEffect(() => {
    getLeads(page);
  }, [page]);

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
              Staffs
            </h1>

            <p className="mt-2 text-[15px] text-[#b9a8c7]">
              Manage your Staffs
            </p>
          </div>

          <button
            onClick={() => navigate("/staffs/add")}
            className="rounded-lg bg-purple-600 px-5 py-3 font-semibold text-white transition hover:bg-purple-700"
          >
            + Add Staffs
          </button>
        </div>

        <Table columns={columns} data={data} />

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {Array.from({ length: totalPages }, (_, index) => {
            const pageNumber = index + 1;

            return (
              <button
                key={pageNumber}
                onClick={() => setPage(pageNumber)}
                className={`h-9 w-9 rounded-md ${
                  page === pageNumber
                    ? "bg-purple-600 text-white"
                    : "bg-[#2d1d38] text-[#b9a8c7] hover:bg-[#3a2847]"
                }`}
              >
                {pageNumber}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}