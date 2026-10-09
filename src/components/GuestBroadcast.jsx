import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  createEventBroadcast,
  getBroadcastInvitations,
  getEventBroadcasts,
} from "../api/event";

const MAX_MESSAGE_LENGTH = 700;
const POLL_INTERVAL = 3000;

const STATUS_LABELS = {
  sending: "Sending",
  completed: "Completed",
  pending: "Pending",
  success: "Sent",
  failed: "Failed",
};

function formatDateTime(value) {
  return new Date(value).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function StatusBadge({ status }) {
  return (
    <span className={`broadcast-status broadcast-status--${status}`}>
      {STATUS_LABELS[status] || status}
    </span>
  );
}

/*
 * Invitation template preview — mirrors the approved WhatsApp template
 */
function InvitationPreview({ ownerName, message, link }) {
  return (
    <div className="broadcast-preview">
      <div className="broadcast-preview-label">Preview</div>

      <p>Hi &lt;Guest name&gt;,</p>
      <p>Warm greetings from Leela Smart Event Arena!</p>
      <p>
        On behalf of <strong>{ownerName}</strong>, we’re happy to share some
        information that may be helpful to you:
      </p>
      <p>{message.trim() || "-"}</p>
      <p className="broadcast-preview-link">{link.trim() || "-"}</p>
      <p>
        We hope this makes your experience a little easier and more
        comfortable.
      </p>
      <p>
        Warm regards,
        <br />
        Team Leela
      </p>
    </div>
  );
}

/*
 * Per-guest delivery status of one broadcast
 */
function InvitationTable({ eventId, broadcast }) {
  const [invitations, setInvitations] = useState(null);
  const [filter, setFilter] = useState("all");

  const { id: broadcastId, status, counts } = broadcast;

  // Refetch whenever the counts change while the broadcast is sending
  const progressKey = `${status}-${counts.success}-${counts.failed}`;

  useEffect(() => {
    let cancelled = false;

    getBroadcastInvitations(eventId, broadcastId)
      .then((result) => {
        if (!cancelled) {
          setInvitations(result.data.data || []);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch invitations:", error);
        if (!cancelled) {
          setInvitations([]);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [eventId, broadcastId, progressKey]);

  if (!invitations) {
    return <div className="no-tasks">Loading invitations...</div>;
  }

  const visible =
    filter === "all"
      ? invitations
      : invitations.filter((invitation) => invitation.status === filter);

  return (
    <div className="broadcast-invitations">
      <div className="broadcast-filters">
        {["all", "success", "failed", "pending"].map((value) => (
          <button
            key={value}
            className={filter === value ? "active" : ""}
            onClick={() => setFilter(value)}
          >
            {value === "all" ? "All" : STATUS_LABELS[value]}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <div className="no-tasks">No invitations here.</div>
      ) : (
        <div className="guest-table-wrap">
          <table className="guest-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Mobile</th>
                <th>Status</th>
                <th>Details</th>
              </tr>
            </thead>

            <tbody>
              {visible.map((invitation, index) => (
                <tr key={invitation.id}>
                  <td>{index + 1}</td>
                  <td>{invitation.guestName}</td>
                  <td>{invitation.phone}</td>
                  <td>
                    <StatusBadge status={invitation.status} />
                  </td>
                  <td className="broadcast-error">
                    {invitation.error || ""}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default function GuestBroadcast({ eventId, ownerName, guestCount }) {
  const [message, setMessage] = useState("");
  const [link, setLink] = useState("");
  const [sending, setSending] = useState(false);

  const [broadcasts, setBroadcasts] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

  const loadBroadcasts = useCallback(
    () =>
      getEventBroadcasts(eventId)
        .then((result) => setBroadcasts(result.data.data || []))
        .catch((error) =>
          console.error("Failed to fetch broadcasts:", error)
        ),
    [eventId]
  );

  useEffect(() => {
    getEventBroadcasts(eventId)
      .then((result) => setBroadcasts(result.data.data || []))
      .catch((error) => console.error("Failed to fetch broadcasts:", error));
  }, [eventId]);

  const isSending = broadcasts.some(
    (broadcast) => broadcast.status === "sending"
  );

  // Poll while a broadcast is going out
  useEffect(() => {
    if (!isSending) {
      return;
    }

    const timer = setInterval(loadBroadcasts, POLL_INTERVAL);
    return () => clearInterval(timer);
  }, [isSending, loadBroadcasts]);

  const handleBroadcast = async () => {
  

    try {
      setSending(true);

      const result = await createEventBroadcast(eventId, {
        message: message.trim(),
        link: link.trim(),
      });

      setMessage("");
      setLink("");
      setExpandedId(result.data.data.id);

      toast.success("Broadcast started");

      await loadBroadcasts();
    } catch (error) {
      console.error("Failed to start broadcast:", error);

      toast.error(
        error.response?.data?.message || "Failed to start broadcast"
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      {/* =========================
          Broadcast form
      ========================== */}

      <section className="guest-upload-card">
        <div className="guest-upload-header">
          <div>
            <h2>Broadcast Invitation</h2>

            <p>
              Sends the WhatsApp guest invitation to every guest on behalf of{" "}
              <strong>{ownerName}</strong>. Message and link are optional.
            </p>
          </div>
        </div>

        <div className="broadcast-form">
          <div className="broadcast-fields">
            <label>
              <span>Message</span>

              <textarea
                rows={4}
                maxLength={MAX_MESSAGE_LENGTH}
                placeholder="e.g. Parking is available at Gate 2. Please carry your invite."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={sending}
              />

              <small>
                {message.length}/{MAX_MESSAGE_LENGTH} · line breaks are sent as
                spaces
              </small>
            </label>

            <label>
              <span>Link</span>

              <input
                type="url"
                placeholder="https://..."
                value={link}
                onChange={(e) => setLink(e.target.value)}
                disabled={sending}
              />
            </label>

            <button
              className="primary-button"
              onClick={handleBroadcast}
              disabled={sending || isSending || guestCount === 0}
            >
              {sending
                ? "Starting..."
                : isSending
                  ? "Broadcast in progress..."
                  : `Broadcast to ${guestCount} ${
                      guestCount === 1 ? "guest" : "guests"
                    }`}
            </button>

            {guestCount === 0 && (
              <small className="broadcast-hint">
                Upload a guest list before broadcasting.
              </small>
            )}
          </div>

          <InvitationPreview
            ownerName={ownerName}
            message={message}
            link={link}
          />
        </div>
      </section>

      {/* =========================
          Broadcast history
      ========================== */}

      <section className="guest-list-card">
        <div className="guest-list-header">
          <h2>
            Broadcasts <span>({broadcasts.length})</span>
          </h2>
        </div>

        {broadcasts.length === 0 ? (
          <div className="no-tasks">No invitations broadcast yet.</div>
        ) : (
          <div className="broadcast-list">
            {broadcasts.map((broadcast) => {
              const expanded = expandedId === broadcast.id;
              const { counts } = broadcast;

              return (
                <div key={broadcast.id} className="broadcast-item">
                  <div className="broadcast-item-header">
                    <div className="broadcast-item-content">
                      <div className="broadcast-item-meta">
                        <span>{formatDateTime(broadcast.createdAt)}</span>
                        <StatusBadge status={broadcast.status} />
                      </div>

                      <p className="broadcast-item-message">
                        {broadcast.message || <em>No message</em>}
                      </p>

                      {broadcast.link && (
                        <a
                          href={broadcast.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="broadcast-item-link"
                        >
                          {broadcast.link}
                        </a>
                      )}
                    </div>

                    <div className="broadcast-counts">
                      <span className="broadcast-count--success">
                        ✓ {counts.success}
                      </span>
                      <span className="broadcast-count--failed">
                        ✕ {counts.failed}
                      </span>
                      {counts.pending > 0 && (
                        <span className="broadcast-count--pending">
                          … {counts.pending}
                        </span>
                      )}
                      <span>/ {counts.total}</span>

                      <button
                        className="guest-cancel-button"
                        onClick={() =>
                          setExpandedId(expanded ? null : broadcast.id)
                        }
                      >
                        {expanded ? "Hide" : "View"}
                      </button>
                    </div>
                  </div>

                  {expanded && (
                    <InvitationTable eventId={eventId} broadcast={broadcast} />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}
