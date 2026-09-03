import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getAllStaff } from "../api/staff";

import {
  getEventTemplate,
  createCategoryTemplate,
  createTaskTemplate,
} from "../api/template";

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
   * Add Task Template
   */
  const handleAddTask = async (categoryTemplateId) => {
    if (!taskTitle.trim()) {
      return;
    }

    if (!selectedStaff) {
      return;
    }

    try {
      setAddingTask(true);

      const data = {
        title: taskTitle.trim(),
        staffId: Number(selectedStaff),
      };

      const result = await createTaskTemplate(
        categoryTemplateId,
        data
      );

      const newTask = result.data.data || result.data;

      const assignedStaff =
        staffList.find(
          (staff) =>
            Number(staff.id) === Number(selectedStaff)
        ) || null;

      setTemplate((prev) => ({
        ...prev,

        categories: (prev.categories || []).map((category) => {
          if (
            Number(category.id) !==
            Number(categoryTemplateId)
          ) {
            return category;
          }

          return {
            ...category,

            tasks: [
              ...(category.tasks || []),

              {
                ...newTask,
                categoryTemplateId:
                  Number(categoryTemplateId),
                staffId: Number(selectedStaff),
                staff: assignedStaff,
              },
            ],
          };
        }),
      }));

      setTaskTitle("");
      setSelectedStaff("");
      setTaskFormCategory(null);
    } catch (error) {
      console.error("Failed to create task template:", error);
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


                      <button
                        onClick={() =>
                          handleAddTask(category.id)
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


                          <button className="task-action">
                            ⋮
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