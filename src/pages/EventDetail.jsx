import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getEventDetail } from "../api/event";
import { getAllStaff } from "../api/staff";
import { createCategory } from "../api/category";
import { createTasks } from "../api/task";

import "./EventDetails.css";

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  // Category form
  const [showCategoryInput, setShowCategoryInput] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [addingCategory, setAddingCategory] = useState(false);

  // Task form
  const [taskFormCategory, setTaskFormCategory] = useState(null);
  const [taskTitle, setTaskTitle] = useState("");
  const [selectedStaff, setSelectedStaff] = useState("");
  const [addingTask, setAddingTask] = useState(false);

  // Staff
  const [staffList, setStaffList] = useState([]);

  /*
   * Fetch event
   */
  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    try {
      const result = await getEventDetail(id);

      console.log("Event:", result.data.data);

      if (result.data) {
        setEvent(result.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch event:", error);
    } finally {
      setLoading(false);
    }
  };

  /*
   * Fetch staff
   */
  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const result = await getAllStaff();

      console.log("Staff:", result.data);

      setStaffList(result.data.data || result.data || []);
    } catch (error) {
      console.error("Failed to fetch staff:", error);
    }
  };

  /*
   * Event status
   */
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

  /*
   * Add Category
   */
  const handleAddCategory = async () => {
    if (!categoryName.trim()) {
      return;
    }

    try {
      setAddingCategory(true);

      const data = {
        eventId: Number(id),
        name: categoryName.trim(),
      };

      console.log("Creating category:", data);

      const result = await createCategory(data);

      console.log("Created category:", result.data);

      const newCategory = result.data.data || result.data;

      /*
       * Add category immediately to UI
       */
      setEvent((prev) => ({
        ...prev,
        categories: [
          ...(prev.categories || []),
          {
            ...newCategory,
            tasks: [],
          },
        ],
      }));

      setCategoryName("");
      setShowCategoryInput(false);
    } catch (error) {
      console.error("Failed to create category:", error);
    } finally {
      setAddingCategory(false);
    }
  };

  /*
   * Add Task
   */
  const handleAddTask = async (categoryId) => {
    if (!taskTitle.trim()) {
      return;
    }

    if (!selectedStaff) {
      return;
    }

    try {
      setAddingTask(true);

      const data = {
        categoryId: Number(categoryId),
        staffId: Number(selectedStaff),
        title: taskTitle.trim(),
      };

      console.log("Creating task:", data);

      const result = await createTasks(data);

      console.log("Created task:", result.data);

      const newTask = result.data.data || result.data;

      /*
       * Find selected staff so the existing UI
       * can immediately display staff.name
       */
      const assignedStaff =
        staffList.find(
          (staff) => Number(staff.id) === Number(selectedStaff)
        ) || null;

      /*
       * Add task immediately to the correct category
       */
      setEvent((prev) => ({
        ...prev,

        categories: (prev.categories || []).map((category) => {
          if (Number(category.id) !== Number(categoryId)) {
            return category;
          }

          return {
            ...category,

            tasks: [
              ...(category.tasks || []),
              {
                ...newTask,

                /*
                 * Make sure the task has these values
                 * even if API response doesn't return them.
                 */
                categoryId: Number(categoryId),
                staffId: Number(selectedStaff),

                staff: assignedStaff,
              },
            ],
          };
        }),
      }));

      // Reset form
      setTaskTitle("");
      setSelectedStaff("");
      setTaskFormCategory(null);
    } catch (error) {
      console.error("Error creating task:", error);
    } finally {
      setAddingTask(false);
    }
  };

  /*
   * Loading
   */
  if (loading) {
    return (
      <div className="event-page">
        <div className="loading-state">
          Loading event...
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

  /*
   * Categories
   */
  const categories = event.categories || [];

  /*
   * All tasks
   */
  const tasks = categories.flatMap(
    (category) => category.tasks || []
  );

  /*
   * Stats
   */
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
      ? Math.round(
          (completedTasks / totalTasks) * 100
        )
      : 0;

  return (
    <div className="event-page">

      {/* =========================
          Header
      ========================== */}

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
                  📅{" "}
                  {new Date(
                    event.date
                  ).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </span>

                <span className="meta-divider">
                  •
                </span>

                <span>
                  👤 {event.ownerName}
                </span>

              </div>

            </div>

            <div
              className={`event-status ${getEventStatus(
                event.date
              ).toLowerCase()}`}
            >
              <span className="status-dot"></span>

              {getEventStatus(event.date)}
            </div>

          </div>

        </div>

      </header>


      {/* =========================
          Event Information
      ========================== */}

      <section className="event-info-card">

        <div className="info-item">

          <span className="info-icon">
            📅
          </span>

          <div>

            <span className="info-label">
              Event Date
            </span>

            <strong>
              {new Date(
                event.date
              ).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </strong>

          </div>

        </div>


        <div className="info-item">

          <span className="info-icon">
            👤
          </span>

          <div>

            <span className="info-label">
              Event Owner
            </span>

            <strong>
              {event.ownerName}
            </strong>

          </div>

        </div>


        <div className="info-item">

          <span className="info-icon">
            💬
          </span>

          <div>

            <span className="info-label">
              WhatsApp
            </span>

            <strong>
              {event.whatsappNumber}
            </strong>

          </div>

        </div>

      </section>


      {/* =========================
          Stats
      ========================== */}

      <section className="stats-grid">

        <div className="stat-card">

          <div className="stat-icon">
            ▦
          </div>

          <div>
            <span>Categories</span>
            <h2>{totalCategories}</h2>
          </div>

        </div>


        <div className="stat-card">

          <div className="stat-icon">
            ✓
          </div>

          <div>
            <span>Total Tasks</span>
            <h2>{totalTasks}</h2>
          </div>

        </div>


        <div className="stat-card">

          <div className="stat-icon">
            👥
          </div>

          <div>
            <span>Assigned</span>
            <h2>{assignedTasks}</h2>
          </div>

        </div>


        <div className="stat-card">

          <div className="stat-icon pending-icon">
            ◷
          </div>

          <div>
            <span>Pending</span>
            <h2>{pendingTasks}</h2>
          </div>

        </div>


        <div className="stat-card">

          <div className="stat-icon completed-icon">
            ✓
          </div>

          <div>
            <span>Completed</span>
            <h2>{completedTasks}</h2>
          </div>

        </div>

      </section>


      {/* =========================
          Progress
      ========================== */}

      <section className="progress-card">

        <div className="progress-header">

          <div>

            <h2>
              Event Progress
            </h2>

            <p>
              Track the overall completion
              of event tasks.
            </p>

          </div>

          <strong>
            {completionPercentage}%
          </strong>

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
            {completedTasks} of {totalTasks}{" "}
            tasks completed
          </span>

          <span>
            {pendingTasks} pending
          </span>

        </div>

      </section>


      {/* =========================
          Categories & Tasks
      ========================== */}

      <section className="categories-section">

        {/* Section Header */}

        <div className="section-header">

          <div>

            <h2>
              Categories & Tasks
            </h2>

            <p>
              Manage tasks organized under
              each category.
            </p>

          </div>


          {/* Add Category */}

          <div className="category-header-action">

            {!showCategoryInput ? (

              <button
                className="add-category-button"
                onClick={() =>
                  setShowCategoryInput(true)
                }
              >
                + Add Category
              </button>

            ) : (

              <div className="add-category-form">

                <input
                  type="text"
                  placeholder="Category name"
                  value={categoryName}
                  onChange={(e) =>
                    setCategoryName(
                      e.target.value
                    )
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleAddCategory();
                    }

                    if (e.key === "Escape") {
                      setShowCategoryInput(false);
                      setCategoryName("");
                    }
                  }}
                  autoFocus
                />

                <button
                  onClick={handleAddCategory}
                  disabled={
                    addingCategory ||
                    !categoryName.trim()
                  }
                >
                  {addingCategory
                    ? "Adding..."
                    : "Add"}
                </button>

                <button
                  className="cancel-button"
                  onClick={() => {
                    setShowCategoryInput(false);
                    setCategoryName("");
                  }}
                >
                  Cancel
                </button>

              </div>

            )}

          </div>

        </div>


        {/* Categories List */}

        <div className="categories-list">

          {categories.length === 0 ? (

            <div className="no-categories">

              <p>
                No categories added yet.
              </p>

            </div>

          ) : (

            categories.map((category) => {

              const categoryTasks =
                category.tasks || [];

              const categoryCompleted =
                categoryTasks.filter(
                  (task) =>
                    task.status ===
                    "completed"
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

                  {/* =====================
                      Category Header
                  ====================== */}

                  <div className="category-header">

                    <div className="category-title">

                      <div className="category-icon">
                        ▦
                      </div>

                      <div>

                        <h3>
                          {category.name}
                        </h3>

                        <span>
                          {categoryTasks.length}{" "}
                          {categoryTasks.length === 1
                            ? "task"
                            : "tasks"}
                        </span>

                      </div>

                    </div>


                    {/* Category Progress */}

                    <div className="category-progress">

                      <span>
                        {categoryPercentage}%
                        {" "}
                        complete
                      </span>

                      <div className="small-progress">

                        <div
                          style={{
                            width: `${categoryPercentage}%`,
                          }}
                        />

                      </div>

                    </div>


                    {/* Add Task */}

                    <button
                      className="add-task-button"
                      onClick={() => {

                        if (
                          taskFormCategory ===
                          category.id
                        ) {
                          setTaskFormCategory(null);
                          setTaskTitle("");
                          setSelectedStaff("");
                        } else {
                          setTaskFormCategory(
                            category.id
                          );
                          setTaskTitle("");
                          setSelectedStaff("");
                        }

                      }}
                    >
                      {taskFormCategory ===
                      category.id
                        ? "Cancel"
                        : "+ Add Task"}
                    </button>

                  </div>


                  {/* =====================
                      Add Task Form
                  ====================== */}

                  {taskFormCategory ===
                    category.id && (

                    <div className="add-task-form">

                      {/* Task title */}

                      <input
                        type="text"
                        placeholder="Task title"
                        value={taskTitle}
                        onChange={(e) =>
                          setTaskTitle(
                            e.target.value
                          )
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Escape") {
                            setTaskFormCategory(null);
                            setTaskTitle("");
                            setSelectedStaff("");
                          }
                        }}
                        autoFocus
                      />


                      {/* Staff dropdown */}

                      <select
                        value={selectedStaff}
                        onChange={(e) =>
                          setSelectedStaff(
                            e.target.value
                          )
                        }
                      >

                        <option value="">
                          Select Staff
                        </option>

                        {staffList.map(
                          (staff) => (

                            <option
                              key={staff.id}
                              value={staff.id}
                            >
                              {staff.name}
                            </option>

                          )
                        )}

                      </select>


                      {/* Add task */}

                      <button
                        onClick={() =>
                          handleAddTask(
                            category.id
                          )
                        }
                        disabled={
                          addingTask ||
                          !taskTitle.trim() ||
                          !selectedStaff
                        }
                      >
                        {addingTask
                          ? "Adding..."
                          : "Add Task"}
                      </button>


                      {/* Cancel */}

                      <button
                        className="cancel-button"
                        onClick={() => {
                          setTaskFormCategory(null);
                          setTaskTitle("");
                          setSelectedStaff("");
                        }}
                      >
                        Cancel
                      </button>

                    </div>

                  )}


                  {/* =====================
                      Tasks
                  ====================== */}

                  {categoryTasks.length ===
                  0 ? (

                    <div className="no-tasks">
                      No tasks in this category.
                    </div>

                  ) : (

                    <div className="tasks-list">

                      {categoryTasks.map(
                        (task) => (

                          <div
                            className="task-row"
                            key={task.id}
                          >

                            {/* Task */}

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

                                <h4>
                                  {task.title}
                                </h4>

                                <span className="task-id">
                                  Task #{task.id}
                                </span>

                              </div>

                            </div>


                            {/* Staff */}

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


                            {/* Status */}

                            <div>

                              <span
                                className={`task-status ${task.status}`}
                              >
                                {task.status}
                              </span>

                            </div>


                            {/* Action */}

                            <button className="task-action">
                              ⋮
                            </button>

                          </div>

                        )
                      )}

                    </div>

                  )}

                </div>

              );

            })

          )}

        </div>

      </section>

    </div>
  );
}
