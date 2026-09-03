import api from "../api";

export const createEventTemplate = (data) => {
  return api.post("/template", data);
};

export const getEventTemplates = () => {
  return api.get("/template");
};



export const getEventTemplate = (id) => {
  return api.get(`/template/${id}`);
};



export const updateEventTemplate = (id, data) => {
  return api.put(`/event-templates/${id}`, data);
};

export const deleteEventTemplate = (id) => {
  return api.delete(`/event-templates/${id}`);
};

export const createCategoryTemplate = (eventTemplateId, data) => {
  return api.post(
    `/template/${eventTemplateId}/categories`,
    data
  );
};

export const updateCategoryTemplate = (id, data) => {
  return api.put(`/category-templates/${id}`, data);
};

export const deleteCategoryTemplate = (id) => {
  return api.delete(`/category-templates/${id}`);
};

export const createTaskTemplate = (categoryTemplateId, data) => {
  return api.post(
    `/template/categories/${categoryTemplateId}/tasks`,
    data
  );
};

export const updateTaskTemplate = (id, data) => {
  return api.put(`/task-templates/${id}`, data);
};

export const deleteTaskTemplate = (id) => {
  return api.delete(`/task-templates/${id}`);
};