import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getAllStaff } from "../api/staff";

import {
  getEventTemplate,
  createCategoryTemplate,
  createTaskTemplate,
  updateTaskTemplate,
} from "../api/template";

import {
  REMINDER_TIME_REGEX,
  REMINDER_TYPE_OPTIONS,
  isValidReminderType,
  sanitizeReminderTime,
  REMINDER_TIME_PLACEHOLDER,
  REMINDER_TIME_ERROR,
  formatReminder,
} from "../lib/reminder";

import "./EventTemplateDetail.css";

export default function EventTemplateDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);

  // Category
  const [showCategoryInput, setShowCategoryInput] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [addingCategory, setAddingCategory] = useState(false);

  // Task
  const [taskFormCategory, setTaskFormCategory] = useState(null);
  const [taskTitle, setTaskTitle] = useState("");
  const [selectedStaff, setSelectedStaff] = useState("");
  const [taskTime, setTaskTime] = useState("");
  const [taskReminderType, setTaskReminderType] = useState("before");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [taskError, setTaskError] = useState("");
  const [addingTask, setAddingTask] = useState(false);

  // Staff
  const [staffList, setStaffList] = useState([]);

  /*
   * Fetch template
   */
  useEffect(() => {
    fetchTemplate();
  }, [id]);

  const fetchTemplate = async () => {
    try {
      setLoading(true);

      const result = await getEventTemplate(id);

      console.log("Event Template:", result.data);

      setTemplate(result.data.data || result.data);
    } catch (error) {
      console.error("Failed to fetch event template:", error);
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

      setStaffList(result.data.data || result.data || []);
    } catch (error) {
      console.error("Failed to fetch staff:", error);
    }
  };

  /*
   * Add Category Template
   */
  const handleAddCategory = async () => {
    if (!categoryName.trim()) {
      return;
    }

    try {
      setAddingCategory(true);

      const data = {
        name: categoryName.trim(),
      };

      const result = await createCategoryTemplate(id, data);

      const newCategory = result.data.data || result.data;

      setTemplate((prev) => ({
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
      console.error("Failed to create category template:", error);
    } finally {
      setAddingCategory(false);
    }
  };

  /*
   * Task form helpers
   */
  const resetTaskForm = () => {
    setTaskFormCategory(null);
    setEditingTaskId(null);
    setTaskTitle("");
    setSelectedStaff("");
    setTaskTime("");
    setTaskReminderType("before");
    setTaskError("");
  };

  const openAddTaskForm = (categoryTemplateId) => {
    resetTaskForm();
    setTaskFormCategory(categoryTemplateId);
  };

  const openEditTaskForm = (categoryTemplateId, task) => {
    resetTaskForm();
    setTaskFormCategory(categoryTemplateId);
    setEditingTaskId(task.id);
    setTaskTitle(task.title || "");
    setSelectedStaff(task.staffId ? String(task.staffId) : "");
    setTaskTime(task.time || "");
    setTaskReminderType(task.name || "before");
  };

  const handleTaskTimeChange = (value) => {
    setTaskTime(sanitizeReminderTime(value));
    setTaskError("");
  };

  const isTaskTimeValid = REMINDER_TIME_REGEX.test(taskTime);

  const isTaskFormValid =
    taskTitle.trim() &&
    selectedStaff &&
    isTaskTimeValid &&
    isValidReminderType(taskReminderType);

  /*
   * Add / Edit Task Template
   */
  const handleSaveTask = async (categoryTemplateId) => {
    if (!isTaskFormValid) {
      return;
    }

    try {
      setAddingTask(true);
      setTaskError("");

      const data = {
        title: taskTitle.trim(),
        staffId: Number(selectedStaff),
        time: taskTime,
        name: taskReminderType,
      };

      const result = editingTaskId
        ? await updateTaskTemplate(editingTaskId, data)
        : await createTaskTemplate(categoryTemplateId, data);

      const savedTask = result.data.data || result.data;

      const assignedStaff =
        staffList.find(
          (staff) =>
            Number(staff.id) === Number(selectedStaff)
        ) || null;

      const taskForState = {
        ...savedTask,
        categoryTemplateId: Number(categoryTemplateId),
        staffId: Number(selectedStaff),
        staff: assignedStaff,
      };

      setTemplate((prev) => ({
        ...prev,

        categories: (prev.categories || []).map((category) => {
          if (
            Number(category.id) !==
            Number(categoryTemplateId)
          ) {
            return category;
          }

          const tasks = category.tasks || [];

          return {
            ...category,

            tasks: editingTaskId
              ? tasks.map((task) =>
                  Number(task.id) === Number(editingTaskId)
                    ? taskForState
                    : task
                )
              : [...tasks, taskForState],
          };
        }),
      }));

      resetTaskForm();
    } catch (error) {
      console.error("Failed to save task template:", error);

      setTaskError(
        error.response?.data?.message ||
          "Failed to save task template"
      );
    } finally {
      setAddingTask(false);
    }
  };

  /*
   * Loading
   */
  if (loading) {
    return (
      <div className="event-template-page">
        <div className="loading-state">
          Loading event template...
        </div>
      </div>
    );
  }

  /*
   * Not found
   */
  if (!template) {
    return (
      <div className="event-template-page">
        <div className="empty-state">
          <div className="empty-icon">!</div>

          <h2>Event template not found</h2>

          <p>
            The event template you're looking for doesn't
            exist.
          </p>

          <button
            onClick={() =>
              navigate("/template")
            }
          >
            Back to Event Templates
          </button>
        </div>
      </div>
    );
  }

  const categories = template.categories || [];

  const tasks = categories.flatMap(
    (category) => category.tasks || []
  );

  const totalCategories = categories.length;
  const totalTasks = tasks.length;

  return (
    <div className="event-template-page">

      {/* =========================
          Header
      ========================== */}

      <header className="event-template-header">

        <button
          className="back-button"
          onClick={() =>
            navigate("/template")
          }
        >
          ←
        </button>

        <div className="header-content">

          <div className="breadcrumb">
            Event Templates
            <span>/</span>
            Template Details
          </div>

          <div className="title-row">

            <div>
              <h1>{template.name}</h1>

              <div className="template-meta">
                <span>
                  Template #{template.id}
                </span>

                <span className="meta-divider">
                  •
                </span>

                <span>
                  {totalCategories}{" "}
                  {totalCategories === 1
                    ? "category"
                    : "categories"}
                </span>

                <span className="meta-divider">
                  •
                </span>

                <span>
                  {totalTasks}{" "}
                  {totalTasks === 1
                    ? "task"
                    : "tasks"}
                </span>
              </div>
            </div>

          </div>

        </div>
      </header>


      {/* =========================
          Template Information
      ========================== */}

      <section className="template-info-card">

        <div className="info-item">

          <span className="info-icon">
            ▦
          </span>

          <div>
            <span className="info-label">
              Template Name
            </span>

            <strong>
              {template.name}
            </strong>
          </div>

        </div>


        <div className="info-item">

          <span className="info-icon">
            #
          </span>

          <div>
            <span className="info-label">
              Template ID
            </span>

            <strong>
              #{template.id}
            </strong>
          </div>

        </div>


        <div className="info-item">

          <span className="info-icon">
            ✓
          </span>

          <div>
            <span className="info-label">
              Tasks
            </span>

            <strong>
              {totalTasks}
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
            <span>Template Tasks</span>
            <h2>{totalTasks}</h2>
          </div>

        </div>


        <div className="stat-card">

          <div className="stat-icon">
            👥
          </div>

          <div>
            <span>Assigned Staff</span>

            <h2>
              {
                new Set(
                  tasks
                    .filter((task) => task.staffId)
                    .map((task) => task.staffId)
                ).size
              }
            </h2>

          </div>

        </div>

      </section>


      {/* =========================
          Categories & Tasks
      ========================== */}

      <section className="categories-section">

        <div className="section-header">

          <div>

            <h2>
              Template Categories & Tasks
            </h2>

            <p>
              Define the categories and tasks that
              should be created whenever this template
              is used for an event.
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
                    setCategoryName(e.target.value)
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


        {/* Categories */}

        <div className="categories-list">

          {categories.length === 0 ? (

            <div className="no-categories">

              <p>
                No categories added yet.
              </p>

              <span>
                Add categories to start building
                this event template.
              </span>

            </div>

          ) : (

            categories.map((category) => {

              const categoryTasks =
                category.tasks || [];

              return (

                <div
                  className="category-card"
                  key={category.id}
                >

                  {/* Category Header */}

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


                    {/* Add Task */}

                    <button
                      className="add-task-button"
                      onClick={() => {

                        if (
                          taskFormCategory ===
                          category.id
                        ) {
                          resetTaskForm();
                        } else {
                          openAddTaskForm(category.id);
                        }

                      }}
                    >
                      {taskFormCategory === category.id
                        ? "Cancel"
                        : "+ Add Task"}
                    </button>

                  </div>


                  {/* Add Task Form */}

                  {taskFormCategory === category.id && (

                    <div className="add-task-form">

                      <input
                        type="text"
                        placeholder="Task title"
                        value={taskTitle}
                        onChange={(e) =>
                          setTaskTitle(e.target.value)
                        }
                        autoFocus
                      />


                      <select
                        value={selectedStaff}
                        onChange={(e) =>
                          setSelectedStaff(e.target.value)
                        }
                      >

                        <option value="">
                          Select Staff
                        </option>

                        {staffList.map((staff) => (

                          <option
                            key={staff.id}
                            value={staff.id}
                          >
                            {staff.name}
                          </option>

                        ))}

                      </select>


                      <input
                        type="text"
                        inputMode="numeric"
                        placeholder={`Time (${REMINDER_TIME_PLACEHOLDER})`}
                        title="Reminder offset from the event start in days:hours:minutes, e.g. 01:02:30"
                        maxLength={8}
                        pattern="[0-9]{2}:([01][0-9]|2[0-3]):[0-5][0-9]"
                        value={taskTime}
                        onChange={(e) =>
                          handleTaskTimeChange(e.target.value)
                        }
                      />


                      <select
                        value={taskReminderType}
                        onChange={(e) =>
                          setTaskReminderType(e.target.value)
                        }
                      >

                        {REMINDER_TYPE_OPTIONS.map((option) => (

                          <option
                            key={option.value}
                            value={option.value}
                          >
                            {option.label}
                          </option>

                        ))}

                      </select>


                      <button
                        onClick={() =>
                          handleSaveTask(category.id)
                        }
                        disabled={
                          addingTask ||
                          !isTaskFormValid
                        }
                      >
                        {addingTask
                          ? "Saving..."
                          : editingTaskId
                            ? "Save Task"
                            : "Add Task"}
                      </button>


                      <button
                        className="cancel-button"
                        onClick={resetTaskForm}
                      >
                        Cancel
                      </button>


                      {taskTime && !isTaskTimeValid && (
                        <span className="task-form-error">
                          {REMINDER_TIME_ERROR}
                        </span>
                      )}

                      {taskError && (
                        <span className="task-form-error">
                          {taskError}
                        </span>
                      )}

                    </div>

                  )}


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

                            <div className="task-check">
                              ✓
                            </div>

                            <div>

                              <h4>
                                {task.title}
                              </h4>

                              <span className="task-id">
                                Template Task #{task.id}
                                {" • "}
                                ⏰ {formatReminder(task)}
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
                            <span className="template-task-status">
                              Template
                            </span>
                          </div>


                          <button
                            className="task-action"
                            title="Edit task"
                            onClick={() =>
                              openEditTaskForm(category.id, task)
                            }
                          >
                            Edit
                          </button>

                        </div>

                      ))}

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