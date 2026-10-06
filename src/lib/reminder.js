// Reminder offset from the event start, DD:HH:mm
// (days 00-99, hours 00-23, minutes 00-59)
export const REMINDER_TIME_REGEX = /^\d{2}:([01]\d|2[0-3]):[0-5]\d$/;

export const REMINDER_TIME_PLACEHOLDER = "DD:HH:mm";

export const REMINDER_TIME_ERROR =
  "Time must be in DD:HH:mm format (e.g. 01:02:30 = 1 day 2 hours 30 minutes)";

export const REMINDER_TYPE_OPTIONS = [
  { value: "before", label: "Before" },
  { value: "after", label: "After" },
];

export const isValidReminderType = (value) =>
  REMINDER_TYPE_OPTIONS.some((option) => option.value === value);

// Keeps digits only and inserts the colons, so typing "010230" gives "01:02:30"
export const sanitizeReminderTime = (value) => {
  const digits = value.replace(/\D/g, "").slice(0, 6);

  return digits.match(/.{1,2}/g)?.join(":") ?? "";
};

export const formatReminder = (task) => {
  if (!task.time || !task.name) {
    return "No reminder";
  }

  const match = String(task.time).match(/^(\d{2}):(\d{2}):(\d{2})$/);

  if (!match) {
    return `${task.time} ${task.name} start`;
  }

  const [days, hours, minutes] = match.slice(1).map(Number);

  const parts = [
    days && `${days}d`,
    hours && `${hours}h`,
    minutes && `${minutes}m`,
  ].filter(Boolean);

  const offset = parts.length ? parts.join(" ") : "0m";

  return `${offset} ${task.name} start`;
};
