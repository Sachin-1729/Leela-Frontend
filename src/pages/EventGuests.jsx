import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import {
  getEventDetail,
  getEventGuests,
  replaceEventGuests,
} from "../api/event";
import { parseGuestCsv } from "../lib/guestCsv";
import GuestBroadcast from "../components/GuestBroadcast";

import "./EventDetails.css";
import "./EventGuests.css";

export default function EventGuests() {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [event, setEvent] = useState(null);
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Parsed CSV waiting for confirmation
  const [fileName, setFileName] = useState("");
  const [parsedGuests, setParsedGuests] = useState([]);
  const [parseErrors, setParseErrors] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [search, setSearch] = useState("");

  /*
   * Fetch event + guests
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventResult, guestResult] = await Promise.all([
          getEventDetail(id),
          getEventGuests(id),
        ]);

        setEvent(eventResult.data.data);
        setGuests(guestResult.data.data || []);
      } catch (error) {
        console.error("Failed to fetch guests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  /*
   * Read + parse the selected CSV (the file itself is never uploaded)
   */
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";

    if (!file) {
      return;
    }

    if (!file.name.toLowerCase().endsWith(".csv")) {
      toast.error("Please select a .csv file");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const { guests: rows, errors } = parseGuestCsv(String(reader.result));

      setFileName(file.name);
      setParsedGuests(rows);
      setParseErrors(errors);
    };

    reader.onerror = () => toast.error("Could not read the file");

    reader.readAsText(file);
  };

  const resetUpload = () => {
    setFileName("");
    setParsedGuests([]);
    setParseErrors([]);
  };

  /*
   * Replace the event's guest list with the parsed rows
   */
  const handleUpload = async () => {
    if (parsedGuests.length === 0) {
      return;
    }

    if (
      guests.length > 0 &&
      !window.confirm(
        `This will replace the current ${guests.length} guests with ${parsedGuests.length} guests from ${fileName}. Continue?`
      )
    ) {
      return;
    }

    try {
      setUploading(true);

      const result = await replaceEventGuests(id, parsedGuests);

      setGuests(
        [...(result.data.data || [])].sort((a, b) =>
          a.name.localeCompare(b.name)
        )
      );
      resetUpload();

      toast.success(`${result.data.data.length} guests saved`);
    } catch (error) {
      console.error("Failed to upload guests:", error);

      toast.error(
        error.response?.data?.message || "Failed to upload guests"
      );
    } finally {
      setUploading(false);
    }
  };

  /*
   * Loading
   */
  if (loading) {
    return (
      <div className="event-page">
        <div className="loading-state">
          Loading guests...
        </div>
      </div>
    );
  }

  /*
   * Event not found
   */
  if (!event) {
    return (
      <div className="event-page">
        <div className="empty-state">
          <div className="empty-icon">!</div>

          <h2>Event not found</h2>

          <p>
            The event you're looking for doesn't exist.
          </p>

          <button onClick={() => navigate("/events")}>
            Back to Events
          </button>
        </div>
      </div>
    );
  }

  const query = search.trim().toLowerCase();

  const filteredGuests = query
    ? guests.filter(
        (guest) =>
          guest.name.toLowerCase().includes(query) ||
          guest.phone.includes(query)
      )
    : guests;

  return (
    <div className="event-page">

      {/* =========================
          Header
      ========================== */}

      <header className="event-header">

        <button
          className="back-button"
          onClick={() => navigate(`/events/${id}`)}
        >
          ←
        </button>

        <div className="header-content">

          <div className="breadcrumb">
            Events <span>/</span> {event.eventName} <span>/</span> Guests
          </div>

          <div className="title-row">

            <div>

              <h1>Guest Management</h1>

              <div className="event-meta">

                <span>
                  📅{" "}
                  {new Date(event.date).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </span>

                <span className="meta-divider">
                  •
                </span>

                <span>
                  👥 {guests.length}{" "}
                  {guests.length === 1 ? "guest" : "guests"}
                </span>

              </div>

            </div>

          </div>

        </div>

      </header>


      {/* =========================
          Upload
      ========================== */}

      <section className="guest-upload-card">

        <div className="guest-upload-header">

          <div>

            <h2>Upload Guest List</h2>

            <p>
              CSV with <code>name</code> and <code>mobile</code> columns.
              Uploading a new file replaces the current guest list.
            </p>

          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,text/csv"
            hidden
            onChange={handleFileChange}
          />

          <button
            className="primary-button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
          >
            Choose CSV
          </button>

        </div>


        {fileName && (

          <div className="guest-upload-preview">

            <div className="guest-upload-summary">

              <span>
                📄 <strong>{fileName}</strong>
                {" — "}
                {parsedGuests.length} valid{" "}
                {parsedGuests.length === 1 ? "guest" : "guests"}
                {parseErrors.length > 0 &&
                  `, ${parseErrors.length} skipped`}
              </span>

              <div className="guest-upload-actions">

                <button
                  className="primary-button"
                  onClick={handleUpload}
                  disabled={uploading || parsedGuests.length === 0}
                >
                  {uploading
                    ? "Saving..."
                    : guests.length > 0
                      ? "Replace Guest List"
                      : "Save Guest List"}
                </button>

                <button
                  className="guest-cancel-button"
                  onClick={resetUpload}
                  disabled={uploading}
                >
                  Cancel
                </button>

              </div>

            </div>


            {parseErrors.length > 0 && (

              <ul className="guest-upload-errors">

                {parseErrors.slice(0, 10).map((error) => (
                  <li key={error}>{error}</li>
                ))}

                {parseErrors.length > 10 && (
                  <li>…and {parseErrors.length - 10} more</li>
                )}

              </ul>

            )}

          </div>

        )}

      </section>


      <GuestBroadcast
        eventId={id}
        ownerName={event.ownerName}
        guestCount={guests.length}
      />


      {/* =========================
          Guest List
      ========================== */}

      <section className="guest-list-card">

        <div className="guest-list-header">

          <h2>
            Guests <span>({guests.length})</span>
          </h2>

          {guests.length > 0 && (
            <input
              type="search"
              className="guest-search"
              placeholder="Search name or mobile"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          )}

        </div>


        {guests.length === 0 ? (

          <div className="no-tasks">
            No guests yet. Upload a CSV to add guests to this event.
          </div>

        ) : filteredGuests.length === 0 ? (

          <div className="no-tasks">
            No guests match "{search}".
          </div>

        ) : (

          <div className="guest-table-wrap">

            <table className="guest-table">

              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Mobile</th>
                </tr>
              </thead>

              <tbody>
                {filteredGuests.map((guest, index) => (
                  <tr key={guest.id}>
                    <td>{index + 1}</td>
                    <td>{guest.name}</td>
                    <td>{guest.phone}</td>
                  </tr>
                ))}
              </tbody>

            </table>

          </div>

        )}

      </section>

    </div>
  );
}
