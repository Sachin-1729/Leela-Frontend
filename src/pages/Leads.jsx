import Table from "../components/Table";
import LeadRemarksCell from "../components/LeadRemarksCell";
import { getLead } from "../api/lead";
import { useEffect, useState } from "react";

export default function Leads() {
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
      key: "phone",
      label: "Phone Number",
    },
    {
      key: "date",
      label: "Event Date",
    },
    {
      key: "event",
      label: "Event",
      render: (lead) =>
        lead.event ? (
          <span
            title={lead.event}
            className="block max-w-[240px] truncate"
          >
            {lead.event}
          </span>
        ) : (
          <span className="text-[#8f7aa0]">—</span>
        ),
    },
    {
      key: "createdAt",
      label: "Enquiry Date",
      render: (lead) =>
        lead.createdAt ? (
          new Date(lead.createdAt).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })
        ) : (
          <span className="text-[#8f7aa0]">—</span>
        ),
    },
    {
      key: "remarks",
      label: "Remarks",
      render: (lead) => (
        <LeadRemarksCell
          lead={lead}
          onSaved={handleRemarksSaved}
        />
      ),
    },
  ];

  function handleRemarksSaved(updatedLead) {
    setData((leads) =>
      leads.map((lead) =>
        lead.id === updatedLead.id ? { ...lead, ...updatedLead } : lead
      )
    );
  }

  async function getLeads(page = 1) {
    const response = await getLead(page);

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
        <div className="mb-6">
          <h1 className="text-[36px] font-extrabold leading-[1.15] text-[#fffaf0]">
            Leads
          </h1>

          <p className="mt-2 text-[15px] text-[#b9a8c7]">
            Manage your leads and event enquiries
          </p>
        </div>

        <Table columns={columns} data={data} />

        <div className="flex items-center justify-center gap-2 mt-6">
          {Array.from({ length: totalPages }, (_, index) => {
            const pageNumber = index + 1;

            return (
              <button
                key={pageNumber}
                onClick={() => setPage(pageNumber)}
                className={`w-9 h-9 rounded-md ${
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