import axios from "axios";

const API = "http://localhost:5000/api/tasks";

// ✅ Get today's tasks
export async function getTodayTasks(getToken) {
  const token = await getToken();
  const res = await axios.get(`${API}/today`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

// ✅ Add task
export async function addTask(getToken, task) {
  const token = await getToken();
  const res = await axios.post(
    `${API}/today`,
    { task },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
}

// ✅ Update task status
export async function updateTaskStatus(getToken, taskId, completed) {
  const token = await getToken();
  const res = await axios.patch(
    `${API}/${taskId}/status`,
    { completed },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
}
// ✅ Delete single task
export async function deleteSingleTask(getToken, taskId) {
  const token = await getToken();
  await axios.delete(`${API}/${taskId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return { success: true, id: taskId };
}


// ✅ Delete all today's tasks
export async function deleteAllTodayTasks(getToken) {
  const token = await getToken();
  await axios.delete(`${API}/today`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}
