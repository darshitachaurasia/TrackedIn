const API_URL = "http://localhost:5000/api/tasks";

export const taskService = {
  getToday: async (userId) => {
    const res = await fetch(`${API_URL}/${userId}/today`);
    return res.json();
  },

  getNext: async (userId) => {
    const res = await fetch(`${API_URL}/${userId}/next`);
    return res.json();
  },

  createToday: async (userId, task) => {
    const res = await fetch(`${API_URL}/${userId}/today`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    return res.json();
  },

  createNext: async (userId, task) => {
    const res = await fetch(`${API_URL}/${userId}/next`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    return res.json();
  },

  updateTodayStatus: async (userId, status) => {
    const res = await fetch(`${API_URL}/${userId}/today/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    return res.json();
  },

  deleteTask: async (taskId) => {
    const res = await fetch(`${API_URL}/${taskId}`, { method: "DELETE" });
    return res.json();
  },
};
