// Reminder offset from the event start, HH:mm
export const REMINDER_TIME_REGEX = /^([01]\d|2[0-3]):[0-5]\d$/;

export const REMINDER_TYPE_OPTIONS = [
  { value: "before", label: "Before" },
  { value: "after", label: "After" },
];

export const isValidReminderType = (value) =>
  REMINDER_TYPE_OPTIONS.some((option) => option.value === value);

// Only digits and a colon, max "HH:mm"
export const sanitizeReminderTime = (value) =>
  value.replace(/[^\d:]/g, "").slice(0, 5);

export const formatReminder = (task) => {
  if (!task.time || !task.name) {
    return "No reminder";
  }

  return `${task.time} ${task.name} start`;
};
