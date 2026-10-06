import { useState } from "react";
import { toast } from "react-toastify";
import { updateLeadRemarks } from "../api/lead";

export default function LeadRemarksCell({ lead, onSaved }) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(lead.remarks || "");
  const [isSaving, setIsSaving] = useState(false);

  const startEditing = () => {
    setValue(lead.remarks || "");
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (isSaving) return;

    setIsSaving(true);
    try {
      const response = await updateLeadRemarks(lead.id, value);

      onSaved(response.data);
      setIsEditing(false);
      toast.success("Remarks updated");
    } catch (error) {
      console.error("Error updating remarks:", error);

      toast.error("Failed to update remarks. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isEditing) {
    return (
      <div className="flex min-w-[240px] flex-col gap-2">
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={3}
          autoFocus
          disabled={isSaving}
          placeholder="Add remarks..."
          className="w-full resize-y rounded-md border border-purple-300/20 bg-[#24132f] px-3 py-2 text-sm text-[#fffaf0] placeholder:text-[#8f7aa0] focus:outline-none focus:ring-2 focus:ring-purple-500/40"
        />

        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="rounded-md bg-purple-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSaving ? "Saving..." : "Save"}
          </button>

          <button
            type="button"
            onClick={() => setIsEditing(false)}
            disabled={isSaving}
            className="rounded-md bg-[#3a2847] px-3 py-1.5 text-sm font-semibold text-[#b9a8c7] hover:bg-[#4a3358] disabled:cursor-not-allowed disabled:opacity-60"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3">
      {lead.remarks ? (
        <span
          title={lead.remarks}
          className="block max-w-[240px] whitespace-pre-line line-clamp-3"
        >
          {lead.remarks}
        </span>
      ) : (
        <span className="text-[#8f7aa0]">—</span>
      )}

      <button
        type="button"
        onClick={startEditing}
        className="shrink-0 rounded-md bg-blue-600 px-2.5 py-1 text-xs font-semibold text-white hover:bg-blue-700"
      >
        {lead.remarks ? "Edit" : "Add"}
      </button>
    </div>
  );
}
