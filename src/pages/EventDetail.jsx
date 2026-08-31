import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getEventDetail } from "../api/event";
import "./EventDetails.css";

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    try {
      const result = await getEventDetail(id);

      console.log(result.data.data);

      if (result.data) {
        setEvent(result.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch event:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="event-page">
        <div className="loading-state">
          Loading event...
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="event-page">
        <div className="empty-state">
          <div className="empty-icon">!</div>
          <h2>Event not found</h2>
          <p>The event you're looking for doesn't exist.</p>

          <button onClick={() => navigate("/events")}>
            Back to Events
          </button>
        </div>
      </div>
    );
  }

  const categories = event.categories || [];

  const tasks = categories.flatMap(
    (category) => category.tasks || []
  );

  const totalCategories = categories.length;
  const totalTasks = tasks.length;

  const assignedTasks = tasks.filter(
    (task) => task.staff
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "pending"
  ).length;

  const completedTasks = tasks.filter(
    (task) => task.status === "completed"
  ).length;

  const completionPercentage =
    totalTasks > 0
      ? Math.round((completedTasks / totalTasks) * 100)
      : 0;

   
      const getEventStatus = (date) => {
  const eventDate = new Date(date);
  const today = new Date();

  // Remove time part
  eventDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  if (eventDate > today) {
    return "Active";
  }

  if (eventDate.getTime() === today.getTime()) {
    return "Running";
  }

  return "Over";
};

  return (
    <div className="event-page">

      {/* Header */}
      <header className="event-header">

        <button
          className="back-button"
          onClick={() => navigate("/events")}
        >
          ←
        </button>

        <div className="header-content">
          <div className="breadcrumb">
            Events <span>/</span> Event Details
          </div>

          <div className="title-row">
            <div>
              <h1>{event.eventName}</h1>

              <div className="event-meta">
                <span>
                  📅 {new Date(event.date).toLocaleDateString(
                    "en-IN",
                    {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    }
                  )}
                </span>

                <span className="meta-divider">•</span>

                <span>
                  👤 {event.ownerName}
                </span>
              </div>
            </div>

         <div className={`event-status ${getEventStatus(event.date).toLowerCase()}`}>
  <span className="status-dot"></span>
  {getEventStatus(event.date)}
</div>
          </div>
        </div>
      </header>

      {/* Event Information */}
      <section className="event-info-card">

        <div className="info-item">
          <span className="info-icon">📅</span>

          <div>
            <span className="info-label">
              Event Date
            </span>

            <strong>
              {new Date(event.date).toLocaleDateString(
                "en-IN",
                {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                }
              )}
            </strong>
          </div>
        </div>

        <div className="info-item">
          <span className="info-icon">👤</span>

          <div>
            <span className="info-label">
              Event Owner
            </span>

            <strong>{event.ownerName}</strong>
          </div>
        </div>

        <div className="info-item">
          <span className="info-icon">💬</span>

          <div>
            <span className="info-label">
              WhatsApp
            </span>

            <strong>{event.whatsappNumber}</strong>
          </div>
        </div>

      </section>

      {/* Stats */}
      <section className="stats-grid">

        <div className="stat-card">
          <div className="stat-icon">▦</div>

          <div>
            <span>Categories</span>
            <h2>{totalCategories}</h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">✓</div>

          <div>
            <span>Total Tasks</span>
            <h2>{totalTasks}</h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">👥</div>

          <div>
            <span>Assigned</span>
            <h2>{assignedTasks}</h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon pending-icon">◷</div>

          <div>
            <span>Pending</span>
            <h2>{pendingTasks}</h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon completed-icon">✓</div>

          <div>
            <span>Completed</span>
            <h2>{completedTasks}</h2>
          </div>
        </div>

      </section>

      {/* Progress */}
      <section className="progress-card">

        <div className="progress-header">

          <div>
            <h2>Event Progress</h2>
            <p>
              Track the overall completion of event tasks.
            </p>
          </div>

          <strong>{completionPercentage}%</strong>

        </div>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${completionPercentage}%`,
            }}
          />
        </div>

        <div className="progress-footer">
          <span>
            {completedTasks} of {totalTasks} tasks completed
          </span>

          <span>
            {pendingTasks} pending
          </span>
        </div>

      </section>

      {/* Categories */}
      <section className="categories-section">

        <div className="section-header">

          <div>
            <h2>Categories & Tasks</h2>

            <p>
              Manage tasks organized under each category.
            </p>
          </div>


        </div>

        <div className="categories-list">

          {categories.map((category) => {

            const categoryTasks = category.tasks || [];

            const categoryCompleted =
              categoryTasks.filter(
                (task) => task.status === "completed"
              ).length;

            const categoryPercentage =
              categoryTasks.length > 0
                ? Math.round(
                    (categoryCompleted /
                      categoryTasks.length) *
                      100
                  )
                : 0;

            return (
              <div
                className="category-card"
                key={category.id}
              >

                {/* Category header */}
                <div className="category-header">

                  <div className="category-title">

                    <div className="category-icon">
                      ▦
                    </div>

                    <div>
                      <h3>{category.name}</h3>

                      <span>
                        {categoryTasks.length}{" "}
                        {categoryTasks.length === 1
                          ? "task"
                          : "tasks"}
                      </span>
                    </div>

                  </div>

                  <div className="category-progress">

                    <span>
                      {categoryPercentage}% complete
                    </span>

                    <div className="small-progress">
                      <div
                        style={{
                          width: `${categoryPercentage}%`,
                        }}
                      />
                    </div>

                  </div>

                </div>

                {/* Tasks */}
                {categoryTasks.length === 0 ? (
                  <div className="no-tasks">
                    No tasks in this category.
                  </div>
                ) : (
                  <div className="tasks-list">

                    {categoryTasks.map((task) => (

                      <div
                        className="task-row"
                        key={task.id}
                      >

                        <div className="task-main">

                          <div
                            className={`task-check ${
                              task.status ===
                              "completed"
                                ? "checked"
                                : ""
                            }`}
                          >
                            {task.status ===
                            "completed"
                              ? "✓"
                              : ""}
                          </div>

                          <div>
                            <h4>{task.title}</h4>

                            <span className="task-id">
                              Task #{task.id}
                            </span>
                          </div>

                        </div>

                        <div className="task-assignee">

                          {task.staff ? (
                            <>
                              <div className="avatar">
                                {task.staff.name
                                  ?.charAt(0)
                                  .toUpperCase()}
                              </div>

                              <span>
                                {task.staff.name}
                              </span>
                            </>
                          ) : (
                            <span className="unassigned">
                              Not Assigned
                            </span>
                          )}

                        </div>

                        <div>
                          <span
                            className={`task-status ${task.status}`}
                          >
                            {task.status}
                          </span>
                        </div>

                        <button className="task-action">
                          ⋮
                        </button>

                      </div>

                    ))}

                  </div>
                )}

              </div>
            );
          })}

        </div>

      </section>

    </div>
  );
}

