const API_BASE = "http://localhost:5000/api/tasks";

// --- Helper with Clerk token ---
async function fetchWithAuth(getToken, url, options = {}) {
  const token = await getToken();

  const res = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || res.statusText);
  }

  return res.json();
}

// --- API Functions ---
export async function getTodayTasks(getToken) {
  return fetchWithAuth(getToken, `${API_BASE}/today`);
}

export async function addTask(getToken, task) {
  return fetchWithAuth(getToken, `${API_BASE}/today`, {
    method: "POST",
    body: JSON.stringify({ task }),
  });
}

export async function updateTaskStatus(getToken, taskId, completed) {
  return fetchWithAuth(getToken, `${API_BASE}/${taskId}/status`, {
    method: "PATCH",
    body: JSON.stringify({ completed }),
  });
}

export async function deleteAllTodayTasks(getToken) {
  return fetchWithAuth(getToken, `${API_BASE}/today/delete`, {
    method: "DELETE",
  });
}

export async function getTasksByDate(getToken, dateString) {
  return fetchWithAuth(getToken, `${API_BASE}/date/${dateString}`);
}

export async function getAllTasks(getToken) {
  return fetchWithAuth(getToken, `${API_BASE}/today/all`);
}
